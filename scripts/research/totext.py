import sys,re,html
s=open(sys.argv[1],errors='ignore').read()
s=re.sub(r'(?is)<(script|style|noscript)[^>]*>.*?</\1>',' ',s)
s=re.sub(r'(?i)<br\s*/?>|</(p|div|li|h\d|tr|section)>','\n',s)
s=re.sub(r'<[^>]+>',' ',s); s=html.unescape(s)
s=re.sub(r'[ \t\xa0]+',' ',s); s=re.sub(r'\n\s*\n+','\n',s)
print(s)
