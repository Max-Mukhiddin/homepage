"""Static checks for the migrated portfolio. Run: python3 tools/verify.py."""
from pathlib import Path
from html.parser import HTMLParser
import re
ROOT = Path(__file__).resolve().parents[1]
class Audit(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.links=[]; self.sections=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag=='section': self.sections.append(a.get('data-section'))
        if tag=='a': self.links.append(a.get('href',''))
text=(ROOT/'index.html').read_text(); audit=Audit(); audit.feed(text)
assert len(audit.ids)==len(set(audit.ids)), 'Duplicate IDs'
assert audit.sections==['home','about','skills','project','saw','career','education','blog','contact']
for href in audit.links:
    if href.startswith('#'): assert href[1:] in audit.ids, href
assert 'tel:+821099086622' in audit.links
assert 'mailto:mukhiddinsolijonov101@gmail.com' in audit.links
assert text.count('class="project"')==3
assert text.count('role="progressbar"')==10
assert 'academic study' in text
assert text.count('class="row skill-row"') == 5
assert '공학석사(AI비즈니스전공)' in text
assert '서울미디어대학원대학교' in text
assert 'https://max-mukhiddin.github.io/homepage/' not in audit.links
assert 'assets/portfolio/Max-portfolio-kr.pdf' in audit.links
assert 'assets/portfolio/Max-portfolio-eng.pdf' in audit.links
assert 'Employment visa/status change required upon hire.' in text
assert 'Master of Science in Engineering (AI Business)' in text
education = re.search(r'<section id="education".*?</section>', text, re.S).group()
assert not re.search(r'graduat|completed|completion', education, re.I)
assert not re.search(r'AI Business and Engineering|AI Business Engineering', text)
assert [int(v) for v in re.findall(r'aria-valuenow="(\d+)"', text)] == [90,90,85,85,80,80,75,80,60,80]
for value, width, label in re.findall(r'aria-valuenow="(\d+)"[^>]*style="width:(\d+)%"><span>(\d+)%', text):
    assert value==width==label
assert 'onclick="sendMail()"' not in text
for path in [ROOT/'index.html',*ROOT.joinpath('css').glob('*.css')]:
    for match in re.findall(r'(?:src|href)=[\"\']([^\"\']+)|url\([\"\']?([^\)\"\']+)',path.read_text()):
        url=next(s for s in match if s).split('?')[0].split('#')[0]
        if not url or url.startswith(('http:','https:','data:','mailto:','tel:')): continue
        assert not url.startswith('/'), f'Root-relative asset: {url}'
        assert (path.parent/url).exists(), f'Missing {url} in {path}'
for path in [ROOT/'index.html',ROOT/'README.md',*ROOT.joinpath('css').glob('*.css'),*ROOT.joinpath('js').glob('*.js')]:
    assert not re.search(r'www90kr|woosy|우서윤|Woo SeoYoon',path.read_text(),re.I), path
print('PASS: section order, unique IDs, navigation, contact links, project count, approved matching scores, local assets, subpath-safe paths, and identity audit.')
