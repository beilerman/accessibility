"""Regression coverage for the hosted runner's local Python environment."""
import importlib.util
import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location(
    "threshold_updates", ROOT / "scripts/automation/threshold_updates.py"
)
updates = importlib.util.module_from_spec(spec)
with patch.dict(os.environ):
    spec.loader.exec_module(updates)


class PipelineEnvironmentTests(unittest.TestCase):
    def test_external_environment_works_with_a_legacy_self_link(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            workspace = root / "workspace"
            pipeline = workspace / "pipeline"
            pipeline.mkdir(parents=True)
            (pipeline / "requirements.txt").write_text("duckdb==1.4.5\n")
            legacy = pipeline / ".venv"
            legacy.symlink_to(legacy, target_is_directory=True)
            commands = []

            def command(*args, **kwargs):
                commands.append(args)
                if args[:2] == ("uv", "venv"):
                    environment = Path(args[-1])
                    (environment / "bin").mkdir(parents=True)
                    (environment / "bin/python").touch()
                return ""

            with patch.object(updates, "STATE", root / "state"), patch.object(updates, "run", side_effect=command):
                python = updates.pipeline_python(workspace)
                self.assertTrue(Path(python).is_relative_to(root / "state/pipeline-envs"))
                self.assertEqual(updates.pipeline_python(workspace), python)
            self.assertEqual([args[:2] for args in commands], [("uv", "venv"), ("uv", "pip")])
            self.assertTrue(legacy.is_symlink())

    def test_generated_environment_links_cannot_be_staged(self):
        with tempfile.TemporaryDirectory() as temporary:
            repo = Path(temporary)
            subprocess.run(("git", "init", "-q", str(repo)), check=True)
            (repo / ".gitignore").write_text((ROOT / ".gitignore").read_text())
            (repo / "pipeline").mkdir()
            link = repo / "pipeline/.venv"
            link.symlink_to(link, target_is_directory=True)
            subprocess.run(("git", "add", "-A"), cwd=repo, check=True)
            staged = subprocess.check_output(("git", "ls-files"), cwd=repo, text=True)
            self.assertNotIn("pipeline/.venv", staged.splitlines())


if __name__ == "__main__":
    unittest.main()
