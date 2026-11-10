"""add_places.py <spec.json> [date]: append new places (hand-written notes) to places.json."""
import json,re,sys
import datetime,pathlib
P=pathlib.Path(__file__).resolve().parents[2]/'src/data/places.json'
d=json.load(open(P));have={p['slug'] for p in d}
DATE=sys.argv[2] if len(sys.argv)>2 else datetime.date.today().isoformat()
NOTE="Added from the linked official public source; no field observation or private visitor report is implied."
for p in json.load(open(sys.argv[1])):
    s=p.pop('slug');assert s not in have,s
    facts=[];cnt={}
    for dom,text,url,st,pub in p.pop('facts'):
        cnt[dom]=cnt.get(dom,0)+1
        facts.append(dict(domain=dom,text=text,source_url=url,id=f"{s}.{dom}.{cnt[dom]}",source_type=st,retrieved_at=DATE,published_at=pub,observed_at=None,review_status="source_checked",history=[dict(date=DATE,action="added",note=NOTE)]))
    d.append(dict(**p,checked_at=DATE,slug=s,evidence_type="public_website",observed_at=None,facts=facts));have.add(s);print('added',s,len(facts))
json.dump(d,open(P,'w'),indent=2,ensure_ascii=False);open(P,'a').write('\n')
