"""Run Threshold maintenance and gate production releases on this Mac."""
import argparse
import fcntl
import json
import os
from datetime import datetime
from pathlib import Path
import shutil
import hashlib
import signal
import traceback
import subprocess
import tempfile
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

STATE = Path.home() / "Library/Application Support/Threshold Updates"
REPO = Path.home() / "Projects/threshold"
TEAM = "team_yOWQprx8RcKDA1MIac4lwC34"
SCOPE = "brad-eilermans-projects"
PROJECT = "prj_l3DJp4T2eZrCA6W9bjl3HDc1M8FB"
CLI = ("npx", "--yes", "vercel@65.14.0")
ET = ZoneInfo("America/New_York")
BRANCH = "feat/threshold-public-catalog"
AUTOMATION = REPO / "scripts/automation"
os.environ["PATH"] = f"{Path.home()}/.local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
os.environ["TZ"] = "America/New_York"
os.umask(0o077)


def run(*args, cwd=REPO, timeout=90):
    return subprocess.run(
        args, cwd=cwd, check=True, text=True, stdout=subprocess.PIPE, timeout=timeout
    ).stdout.rstrip("\n")


def api(endpoint, query=""):
    return json.loads(run(*CLI, "api", f"{endpoint}?teamId={TEAM}{query}", "--method", "GET"))


def project():
    result = api(f"/v9/projects/{PROJECT}")
    if result.get("id") != PROJECT or result.get("name") != "accessibility" or result.get("link"):
        raise RuntimeError("Vercel project identity or Git deployment configuration changed")
    return result


def commit_of(deployment):
    meta = deployment.get("meta", {})
    return meta.get("thresholdCommit") or meta.get("githubCommitSha")


def release(check):
    now = datetime.now(ET)
    date = now.date().isoformat()
    slot = f"{date}-{now.hour:02}"
    if not check and now.hour not in (9, 17):
        print("Outside the 9 a.m. and 5 p.m. Eastern release hours.")
        return

    head = remote_base()
    run("git", "fetch", "--quiet", "origin")
    production = project()["targets"]["production"]
    print(f"{now.isoformat()} HEAD {head[:12]}, production {(commit_of(production) or 'unknown')[:12]}")
    if production.get("readyState") == "READY" and commit_of(production) == head:
        print("This commit is already live.")
        return

    since = int(now.replace(hour=0, minute=0, second=0, microsecond=0).timestamp() * 1000)
    result = api("/v6/deployments", f"&projectId={PROJECT}&since={since}&limit=10")
    count = len(result["deployments"])
    if count >= 2 or result["pagination"].get("next"):
        print(f"Daily Vercel limit reached ({count} deployments visible).")
        return
    if any(item["state"] in {"QUEUED", "INITIALIZING", "BUILDING"} for item in result["deployments"]):
        print("A deployment is in progress.")
        return

    reservation = STATE / f"attempt-{slot}"
    if reservation.exists():
        print("This release slot has already been used.")
        return
    with tempfile.TemporaryDirectory(prefix="threshold-release-") as temporary:
        snapshot = Path(temporary) / "checkout"
        run("git", "worktree", "add", "--detach", str(snapshot), head)
        try:
            (snapshot / ".vercel").mkdir()
            link = REPO / ".vercel/project.json"
            settings = json.loads(link.read_text())
            if (settings.get("projectId"), settings.get("orgId")) != (PROJECT, TEAM):
                raise RuntimeError("Local Vercel link does not match the verified project")
            shutil.copyfile(link, snapshot / ".vercel/project.json")
            deploy_log = REPO / ".vercel/deploys.log"
            if deploy_log.exists():
                shutil.copyfile(deploy_log, snapshot / ".vercel/deploys.log")
            python = pipeline_python(snapshot)
            print(run("env", f"THRESHOLD_PIPELINE_PYTHON={python}", "sh", "scripts/release-check.sh", cwd=snapshot))
            tips = run("git", "rev-parse", "HEAD", "origin/master", f"origin/{BRANCH}", cwd=snapshot)
            if tips.splitlines() != [head] * 3:
                raise RuntimeError("Both publication branches must match the checked release")
            if check:
                print("Release checks passed for the isolated commit. Check mode ends here.")
                return
            current = datetime.now(ET)
            if (current.date(), current.hour) != (now.date(), now.hour):
                print("The release hour ended during checks.")
                return
            reservation.write_text(f"{current.isoformat()} {head}\n")
            url = run(*CLI, "--cwd", str(snapshot), "--scope", SCOPE, "deploy", "--prod", "--yes",
                      "--meta", f"thresholdCommit={head}", timeout=1200)
            print(url)
            with deploy_log.open("a") as log:
                log.write(f"{date} {head}\n")
            live = project()["targets"]["production"]
            if live.get("readyState") != "READY" or commit_of(live) != head:
                raise RuntimeError("Vercel did not report the scheduled commit READY in production")
            for route in ("/", "/venues/the-carnegie"):
                request = Request(f"https://thresholdaccessibility.com{route}",
                                  headers={"Cache-Control": "no-cache", "User-Agent": "Threshold release check"})
                with urlopen(request, timeout=30) as response:
                    body = response.read()
                    if response.status != 200 or (route != "/" and b"Report a problem with this page" not in body):
                        raise RuntimeError(f"Production smoke check failed for {route}")
            print(f"Verified production {head[:12]} on thresholdaccessibility.com.")
        finally:
            run("git", "worktree", "remove", "--force", str(snapshot))


def remote_base():
    tips = run("git", "ls-remote", "origin", "refs/heads/master", f"refs/heads/{BRANCH}").splitlines()
    shas = {line.split()[0] for line in tips}
    if len(tips) != 2 or len(shas) != 1:
        raise RuntimeError("Both Threshold publication branches must exist and agree")
    return shas.pop()


WORKSPACE = STATE / "workspace"


def pipeline_python(workspace):
    requirements = workspace / "pipeline/requirements.txt"
    digest = hashlib.sha256(requirements.read_bytes()).hexdigest()[:16]
    environments = STATE / "pipeline-envs"
    environments.mkdir(parents=True, exist_ok=True)
    environment = environments / digest
    python = environment / "bin/python"
    ready = environment / ".ready"
    with (environments / f"{digest}.lock").open("a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        if not python.exists():
            run("uv", "venv", "--allow-existing", "--python", "3.11", str(environment), timeout=120)
        if not ready.exists():
            run("uv", "pip", "install", "--python", str(python), "-r", str(requirements), timeout=180)
            ready.write_text(digest)
    return str(python)


def checkpoint(**fields):
    path = STATE / "latest.json"
    current = json.loads(path.read_text()) if path.exists() else {}
    current.update(fields)
    current["updated_at"] = datetime.now(ET).isoformat()
    temporary = STATE / "latest.json.tmp"
    temporary.write_text(json.dumps(current, indent=2) + "\n")
    temporary.replace(path)


def has_changes(workspace):
    output = subprocess.check_output(
        ("git", "status", "--porcelain", "-z", "--untracked-files=all"), cwd=workspace
    )
    return bool(output)


def managed_command(command, workspace, log, timeout):
    process = subprocess.Popen(
        command, cwd=workspace, stdout=log, stderr=subprocess.STDOUT,
        start_new_session=True, env={**os.environ, "CI": "true"},
    )
    try:
        code = process.wait(timeout=timeout)
    except subprocess.TimeoutExpired:
        os.killpg(process.pid, signal.SIGTERM)
        try:
            process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            os.killpg(process.pid, signal.SIGKILL)
            process.wait()
        raise
    if code:
        raise subprocess.CalledProcessError(code, command)


def prepare_workspace(base):
    if not WORKSPACE.exists():
        run("git", "worktree", "add", "--detach", str(WORKSPACE), base)
    if Path(run("git", "rev-parse", "--show-toplevel", cwd=WORKSPACE)).resolve() != WORKSPACE.resolve():
        raise RuntimeError("The maintenance workspace is not the expected Git checkout")
    head = run("git", "rev-parse", "HEAD", cwd=WORKSPACE)
    if head != base:
        # Preserve this process's entire unfinished batch before moving to
        # newer public work. The patch includes new files and binary images.
        if has_changes(WORKSPACE):
            run("git", "add", "-A", "--", ".", cwd=WORKSPACE)
        common = run("git", "merge-base", head, base, cwd=WORKSPACE)
        patch = subprocess.check_output(
            ("git", "diff", "--cached", "--binary", "--full-index", common),
            cwd=WORKSPACE,
        )
        recovery = STATE / "runs" / ("recovery-" + datetime.now(ET).strftime("%Y%m%d-%H%M%S") + ".patch")
        recovery.write_bytes(patch)
        checkpoint(phase="reconciling", recovery_patch=str(recovery))
        # This is the dedicated automation checkout. Its edits are now safely
        # recorded in the recovery patch, including any committed local work.
        run("git", "reset", "--hard", base, cwd=WORKSPACE)
        if patch:
            applied = subprocess.run(
                ("git", "apply", "--3way", "--index", str(recovery)),
                cwd=WORKSPACE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                text=True,
            )
            print(applied.stdout)
            # A three-way conflict stays in this workspace for the next
            # research pass to resolve and validate.
            checkpoint(reconciliation_conflicts=applied.returncode != 0)
    return WORKSPACE


def sync_primary(commit):
    if (run("git", "branch", "--show-current") == BRANCH
            and not run("git", "status", "--porcelain")):
        result = subprocess.run(("git", "merge", "--ff-only", commit), cwd=REPO)
        if result.returncode:
            print("The verified update is pushed. Primary checkout needs reconciliation.")
    else:
        print("The verified update is pushed. Primary checkout has independent work.")


def maintain():
    status_file = STATE / "latest.json"
    previous = json.loads(status_file.read_text()) if status_file.exists() else {}
    previous_log = Path(previous["log"]) if previous.get("log") else None
    recovery_diagnostics = ""
    if previous.get("phase") == "retry_pending" and previous_log and previous_log.exists():
        recovery_diagnostics = (
            "\nThe previous host run failed. Diagnose the actual host error below and "
            "repair the prepared batch before expanding it. The agent's browser sandbox "
            "limitations and host validation results are recorded separately.\n"
            "<previous_host_log>\n" + previous_log.read_text()[-16000:] + "\n</previous_host_log>\n"
        )
    stamp = datetime.now(ET).strftime("%Y%m%d-%H%M%S")
    run_dir = STATE / "runs"
    run_dir.mkdir(exist_ok=True)
    result = run_dir / (stamp + ".json")
    log_path = run_dir / (stamp + ".log")
    checkpoint(phase="preparing", run_id=stamp, log=str(log_path), error=None)
    base = remote_base()
    run("git", "fetch", "--quiet", "origin")
    if run("git", "rev-parse", "origin/master") != base:
        raise RuntimeError("Publication branches changed during fetch; retry next cycle")
    workspace = prepare_workspace(base)
    checkpoint(base_commit=base)

    with log_path.open("a") as log:
        lockfile = workspace / "package-lock.json"
        dependency_hash = hashlib.sha256(lockfile.read_bytes()).hexdigest()
        marker = STATE / "dependencies.sha256"
        if (not (workspace / "node_modules/.bin/next").exists()
                or not marker.exists() or marker.read_text() != dependency_hash):
            checkpoint(phase="installing")
            managed_command(("npm", "ci"), workspace, log, 360)
            marker.write_text(dependency_hash)
        python = pipeline_python(workspace)

        checkpoint(phase="researching")
        instructions = (AUTOMATION / "maintenance.md").read_text()
        instructions += "\nCurrent workspace: " + str(workspace)
        instructions += "\nResume and review every unfinished edit already here, including any conflict markers."
        instructions += "\nPrimary publication base: " + base + "\n"
        instructions += recovery_diagnostics
        prompt = run_dir / (stamp + ".prompt.md")
        prompt.write_text(instructions)
        with prompt.open() as source:
            command = (
                "codex", "-a", "never", "-c", "sandbox_workspace_write.network_access=true",
                "exec", "--sandbox", "workspace-write", "-C", str(workspace),
                "--output-schema", str(AUTOMATION / "result.schema.json"),
                "--output-last-message", str(result), "-",
            )
            process = subprocess.Popen(
                command, cwd=workspace, stdin=source, stdout=log, stderr=subprocess.STDOUT,
                start_new_session=True,
            )
            try:
                code = process.wait(timeout=2700)
            except subprocess.TimeoutExpired:
                os.killpg(process.pid, signal.SIGTERM)
                try:
                    process.wait(timeout=10)
                except subprocess.TimeoutExpired:
                    os.killpg(process.pid, signal.SIGKILL)
                    process.wait()
                raise
            if code:
                raise subprocess.CalledProcessError(code, command)
        report = json.loads(result.read_text())
        checkpoint(summary=report["summary"], report=str(result))
        print(report["summary"], flush=True)
        if not report["publish_ready"]:
            checkpoint(phase="unfinished", pending_changes=has_changes(workspace))
            return
        if not has_changes(workspace):
            checkpoint(phase="idle", pending_changes=False)
            return
        if run("git", "rev-parse", "HEAD", cwd=workspace) != base:
            raise RuntimeError("Maintenance changed Git history unexpectedly")
        unresolved = run("git", "diff", "--name-only", "--diff-filter=U", cwd=workspace)
        if unresolved:
            # The agent edits conflict markers but Git index updates are
            # handled here, inside the dedicated automation workspace.
            run("git", "add", "-A", "--", ".", cwd=workspace)
        checkpoint(phase="validating")
        commands = [
            ("npx", "tsc", "--noEmit"), ("npm", "run", "lint"), ("npm", "test"),
            ("npm", "run", "build"), ("npm", "run", "test:e2e"),
        ]
        for command in commands:
            managed_command(command, workspace, log, 360)
        managed_command(
            (python, "-m", "unittest", "discover", "-p", "test_*.py"),
            workspace / "pipeline", log, 180,
        )
    if remote_base() != base:
        checkpoint(phase="unfinished", pending_changes=True,
                   summary="Public branches advanced. Preserve and reconcile this batch next cycle.")
        return
    run("git", "diff", "--check", cwd=workspace)
    run("git", "add", "-A", "--", ".", cwd=workspace)
    run("git", "diff", "--cached", "--check", cwd=workspace)
    print(run(
        "git", "commit", "-m", "Expand and recheck Threshold access information",
        "-m", "Co-Authored-By: GPT-6.1 Sol <noreply@openai.com>", cwd=workspace,
    ))
    commit = run("git", "rev-parse", "HEAD", cwd=workspace)
    checkpoint(phase="pushing", commit=commit, pending_changes=False)
    print(run(
        "git", "push", "--atomic", "origin", f"HEAD:refs/heads/{BRANCH}",
        "HEAD:refs/heads/master", cwd=workspace,
    ))
    sync_primary(commit)
    checkpoint(phase="complete", published_commit=commit, pending_changes=False)
    print("Verified batch pushed. Vercel publication uses the two daily release slots.")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=("check", "release", "maintain"))
    mode = parser.parse_args().mode
    lock_name = "maintenance.lock" if mode == "maintain" else "release.lock"
    with (STATE / lock_name).open("a") as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            print("Threshold already has an update run in progress.")
            return
        if mode == "maintain":
            try:
                maintain()
            except Exception as error:
                checkpoint(phase="retry_pending", error=str(error),
                           pending_changes=WORKSPACE.exists() and has_changes(WORKSPACE))
                traceback.print_exc()
                raise
        else:
            release(mode == "check")


if __name__ == "__main__":
    main()
