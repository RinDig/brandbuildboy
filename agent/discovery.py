from __future__ import annotations

import re
import xml.etree.ElementTree as ET
from collections import defaultdict
from typing import Dict, Iterable, List
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

CATEGORIES: Dict[str, List[str]] = {
    "about": ["about", "company", "who-we-are", "our-story", "mission", "team"],
    "blog": ["blog", "insights", "stories", "articles", "newsroom"],
    "press": ["press", "news", "media", "announcements"],
    "careers": ["careers", "jobs", "join", "work-with", "people"],
}

COMMON_PATHS: Dict[str, List[str]] = {
    "about": ["/about", "/company", "/about-us"],
    "blog": ["/blog", "/insights", "/news"],
    "press": ["/press", "/news", "/media"],
    "careers": ["/careers", "/jobs", "/join-us"],
}


def is_same_domain(base_url: str, url: str) -> bool:
    base = urlparse(base_url)
    candidate = urlparse(url)
    if not candidate.netloc:
        return True
    return candidate.netloc.endswith(base.netloc)


def normalize_url(url: str) -> str:
    parsed = urlparse(url)
    cleaned = parsed._replace(fragment="").geturl()
    return cleaned.rstrip("/")


def fetch_sitemap_urls(base_url: str) -> List[str]:
    sitemap_url = urljoin(base_url, "/sitemap.xml")
    try:
        response = requests.get(sitemap_url, timeout=10)
        if not response.ok:
            return []
        content = response.text
    except requests.RequestException:
        return []

    urls: List[str] = []

    try:
        root = ET.fromstring(content)
    except ET.ParseError:
        return []

    namespace = re.match(r"\{.*\}", root.tag)
    ns = namespace.group(0) if namespace else ""

    if root.tag.endswith("sitemapindex"):
        sitemap_nodes = root.findall(f"{ns}sitemap/{ns}loc")
        for node in sitemap_nodes[:5]:
            loc = node.text or ""
            urls.extend(fetch_sitemap_urls(loc))
        return urls

    for loc in root.findall(f"{ns}url/{ns}loc"):
        if loc.text:
            urls.append(loc.text.strip())
    return urls


def fetch_homepage_links(base_url: str) -> List[str]:
    try:
        response = requests.get(base_url, timeout=10)
        response.raise_for_status()
    except requests.RequestException:
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    links = []
    for anchor in soup.find_all("a", href=True):
        href = anchor.get("href")
        if not href:
            continue
        full = urljoin(base_url, href)
        links.append(full)
    return links


def categorize_urls(base_url: str, urls: Iterable[str]) -> Dict[str, List[str]]:
    buckets: Dict[str, List[str]] = defaultdict(list)
    for url in urls:
        if not is_same_domain(base_url, url):
            continue
        cleaned = normalize_url(url)
        path = urlparse(cleaned).path.lower()
        for category, keywords in CATEGORIES.items():
            if any(keyword in path for keyword in keywords):
                if cleaned not in buckets[category]:
                    buckets[category].append(cleaned)
    return buckets


def discover_category_urls(base_url: str) -> Dict[str, List[str]]:
    urls: List[str] = []
    urls.extend(fetch_sitemap_urls(base_url))
    urls.extend(fetch_homepage_links(base_url))

    buckets = categorize_urls(base_url, urls)

    # # add common paths if missing [bad idea]
    # for category, paths in COMMON_PATHS.items():
    #     for rel in paths:
    #         candidate = normalize_url(urljoin(base_url, rel))
    #         if candidate not in buckets.get(category, []):
    #             buckets.setdefault(category, []).append(candidate)

    return buckets


def filter_urls(urls: Iterable[str], excludes: Iterable[str]) -> List[str]:
    cleaned: List[str] = []
    patterns = [e.lower() for e in excludes if e]
    for url in urls:
        lowered = url.lower()
        if any(pattern in lowered for pattern in patterns):
            continue
        cleaned.append(url)
    return cleaned
