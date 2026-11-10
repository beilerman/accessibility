"""verify.py <agent.json> : re-fetch every cited URL and check each quote is an exact substring.
Accepts either new-place records (facts + address_quote) or depth records ({slug, facts})."""
import json,sys,urllib.request,html,re,time
UA={"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"}
cache={}
# One normalization for verifying quotes and for the weekly source monitor.
sys.path.insert(0,str(__import__('pathlib').Path(__file__).resolve().parents[2]/'pipeline'))
from check_sources import quote_text as norm
def text(u):
    if u not in cache:
        try:
            raw=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=40).read().decode('utf8','ignore')
            cache[u]=norm(raw)  # keep script contents too (some sites embed copy in JSON)
        except Exception as e:
            import subprocess
            try: cache[u]=norm(subprocess.check_output(['curl','-sL','-m','40','-A',UA['User-Agent'],u]).decode('utf8','ignore'))
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
