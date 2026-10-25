"""Verify rendered discovery surfaces; never submits a form or sends email."""
import argparse
import concurrent.futures
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser


class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}
        self.canonicals = []
        self.schemas = []
        self.schema = None
        self.h1 = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'meta': self.meta[a.get('name', a.get('property'))] = a.get('content')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonicals.append(a.get('href'))
        if tag == 'h1': self.h1 += 1
        if tag == 'script' and a.get('type') == 'application/ld+json': self.schema = ''
    def handle_data(self, data):
        if self.schema is not None: self.schema += data
    def handle_endtag(self, tag):
        if tag == 'script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None


def fetch(url):
    try: r = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; Lucci SEO verification)"}), timeout=30)
    except urllib.error.HTTPError as e: r = e
    return r.status, r.headers, r.read().decode()


def main():
    p = argparse.ArgumentParser()
    p.add_argument('origin', help='Live site or isolated local production build')
    p.add_argument('--site', choices=['hq', 'labs'], required=True)
    args = p.parse_args()
    origin = args.origin.rstrip('/')
    canonical = 'https://luccihq.com' if args.site == 'hq' else 'https://luccilabs.xyz'
    errors = []
    checks = 0
    def check(ok, message):
        nonlocal checks
        checks += 1
        if not ok: errors.append(message)
    status, headers, body = fetch(origin+'/robots.txt')
    check(status == 200 and 'text/plain' in headers.get('Content-Type', ''), 'robots must be plain text HTTP 200')
    check(canonical+'/sitemap.xml' in body, 'robots must advertise canonical sitemap')
    status, headers, body = fetch(origin+'/sitemap.xml')
    check(status == 200, 'sitemap must return HTTP 200')
    try:
        urls = [x.text for x in ET.fromstring(body).findall('{*}url/{*}loc')]
    except ET.ParseError:
        urls = []
        check(False, 'sitemap must be valid XML')
    check(len(urls) >= (9 if args.site == 'hq' else 9), 'sitemap must include all public canonical pages')
    check(len(urls) == len(set(urls)), 'sitemap must not contain duplicate URLs')
    paths = [urllib.parse.urlsplit(u).path or '/' for u in urls]
    check(not any('/subscribe' in x or '/api' in x for x in paths), 'private/action URLs must stay out of sitemap')
    def page(path):
        status, headers, body = fetch(origin+path)
        head = Head(); head.feed(body)
        return path, status, head, body
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        pages = list(pool.map(page, paths or ['/']))
    for path, status, head, body in pages:
        expected = canonical + ('' if path == '/' else path)
        check(status == 200, path+' must return HTTP 200')
        check(head.canonicals == [expected], path+' must have exactly one correct canonical URL')
        check(head.meta.get('og:url') == expected, path+' must have its own Open Graph URL')
        check(bool(head.meta.get('og:title')) and bool(head.meta.get('og:description')), path+' must have social metadata')
        check(bool(head.meta.get('description')), path+' must have a description')
        check(head.h1 == 1, path+' must have one primary heading')
        check('noindex' not in head.meta.get('robots', ''), path+' must be indexable')
        check(bool(head.schemas), path+' must include valid entity JSON-LD')
        if '/writing/' in path:
            check(head.meta.get('og:type') == 'article', path+' must declare an article')
            check(bool(head.meta.get('citation_title')), path+' must expose citation metadata')
    status, headers, body = fetch(origin+'/llms.txt')
    check(status == 200 and 'text/plain' in headers.get('Content-Type', ''), 'llms.txt must return plain text HTTP 200')
    check('##' in body and canonical in body, 'llms.txt must identify canonical sources')
    status, headers, body = fetch(origin+'/index.md')
    check(status == 200 and 'text/markdown' in headers.get('Content-Type', ''), 'index.md must return Markdown HTTP 200')
    check('canonical' in body.lower() and canonical in body, 'Markdown must identify its canonical HTML page')
    status, _, _ = fetch(origin+'/this-page-does-not-exist-seo-check')
    check(status == 404, 'missing pages must return a real HTTP 404')
    if args.site == 'labs':
        status, headers, body = fetch(origin+'/feed.xml')
        check(status == 200, 'feed must return HTTP 200')
        try:
            items = ET.fromstring(body).findall('channel/item')
            check(len(items) >= 4, 'feed must contain published notes')
            for item in items: check(item.findtext('link') in urls, 'feed entries must be in the canonical sitemap')
        except ET.ParseError: check(False, 'feed must be valid XML')
        status, _, body = fetch(origin+'/subscribe/confirmed')
        head = Head(); head.feed(body)
        check('noindex' in head.meta.get('robots', ''), 'subscription status must not be indexed')
        for path in ['/research', '/projects', '/work', '/products']:
            class NoRedirect(urllib.request.HTTPRedirectHandler):
                def redirect_request(self, *a, **kw): return None
            try: r = urllib.request.build_opener(NoRedirect).open(origin+path, timeout=20)
            except urllib.error.HTTPError as e: r = e
            check(r.status in [301, 308], path+' must redirect permanently')
    print(json.dumps({'site': args.site, 'origin': origin, 'checks': checks, 'failures': len(errors), 'errors': errors}, indent=2))
    return bool(errors)


if __name__ == '__main__': sys.exit(main())
