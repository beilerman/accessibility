"""verify.py <agent.json> : re-fetch every cited URL and check each quote is an exact substring.
Accepts either new-place records (facts + address_quote) or depth records ({slug, facts})."""
import json,sys,urllib.request,html,re,time
UA={"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"}
cache={}
# One normalization for verifying quotes and for the weekly source monitor.
sys.path.insert(0,str(__import__('pathlib').Path(__file__).resolve().parents[2]/'pipeline'))
from check_sources import quote_text as norm
from check_sources import response_result

def document_text(data, url, content_type=""):
    if "application/pdf" in content_type.lower() or data.lstrip().startswith(b"%PDF-"):
        result = response_result(data, content_type, 200, url)
        return result.get("_text") or "ERR " + result.get("text_extraction_error", result.get("error", "PDF needs manual review"))
    return norm(data.decode('utf8', 'ignore'))

def text(u):
    if u not in cache:
        try:
            with urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=40) as response:
                cache[u]=document_text(response.read(),u,response.headers.get('Content-Type',''))
        except Exception as e:
            import subprocess
            try: cache[u]=document_text(subprocess.check_output(['curl','-sL','-m','40','-A',UA['User-Agent'],u]),u)
            except Exception as e2: cache[u]='ERR '+str(e2)
        time.sleep(0.8)
    return cache[u]
data=json.load(open(sys.argv[1]))
bad=0;n=0
for rec in data:
    name=rec.get('name') or rec.get('slug')
    items=list(rec.get('facts',[]))
    if rec.get('address_quote'): items.append(dict(quote=rec['address_quote'],url=rec['address_url'],claim='ADDRESS'))
    for f in items:
        n+=1;t=text(f['url']);q=norm(f['quote'])
        ok=q in t
        if not ok: bad+=1
        f['verified']=ok
        print(('OK  ' if ok else ('ERR ' if t.startswith('ERR') else 'MISS')),name[:34].ljust(34),'|',q[:70])
json.dump(data,open(sys.argv[1].replace('.json','.verified.json'),'w'),indent=1,ensure_ascii=False)
print(f'{n} checked, {bad} failed')
