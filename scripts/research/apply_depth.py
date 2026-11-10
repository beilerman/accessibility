"""apply_depth.py <spec.json> [date]: append notes to existing places. spec = {slug: [[domain,text,url,source_type?]]}"""
import json,sys
import datetime,pathlib
P=pathlib.Path(__file__).resolve().parents[2]/'src/data/places.json'
date=sys.argv[2] if len(sys.argv)>2 else datetime.date.today().isoformat()
NOTE="Added from the linked official public source; no field observation or private visitor report is implied."
d=json.load(open(P));by={p['slug']:p for p in d}
for slug,notes in json.load(open(sys.argv[1])).items():
    p=by[slug]
    for n in notes:
        dom,text,url=n[:3];st=n[3] if len(n)>3 else "venue_official"
        k=1+max([int(f['id'].rsplit('.',1)[1]) for f in p['facts'] if f['domain']==dom] or [0])
        p['facts'].append(dict(domain=dom,text=text,source_url=url,id=f"{slug}.{dom}.{k}",source_type=st,retrieved_at=date,published_at=None,observed_at=None,review_status="source_checked",history=[dict(date=date,action="added",note=NOTE)]))
    p['checked_at']=date
    print(slug,'+',len(notes))
json.dump(d,open(P,'w'),indent=2,ensure_ascii=False);open(P,'a').write('\n')
