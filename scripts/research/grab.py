import json,sys,re
lines=open(sys.argv[1]).read().splitlines()
txt=None
for l in lines:
    try: o=json.loads(l)
    except: continue
    m=o.get('message',{})
    if m.get('role')=='assistant':
        for c in m.get('content',[]) if isinstance(m.get('content'),list) else []:
            if c.get('type')=='text' and '[' in c['text']: txt=c['text']
s=txt[txt.index('['):txt.rindex(']')+1]
data=json.loads(s); json.dump(data,open(sys.argv[2],'w'),indent=1,ensure_ascii=False); print(len(data),'records',sum(len(r['facts']) for r in data),'facts')
