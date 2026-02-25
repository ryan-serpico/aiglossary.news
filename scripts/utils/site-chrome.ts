function getGithubProjectPrefix() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  if (!window.location.hostname.endsWith('.github.io') || pathParts.length === 0) {
    return '';
  }
  return `/${pathParts[0]}`;
}

function rewriteRootRelativeLinks(prefix: string, root: ParentNode = document) {
  if (!prefix) return;

  const links = root.querySelectorAll<HTMLAnchorElement>('a[href^="/"]');
  for (const link of links) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('//') || href.startsWith(prefix + '/')) {
      continue;
    }
    link.setAttribute('href', `${prefix}${href}`);
  }
}

export function syncSiteChromeOffset() {
  const root = document.documentElement;
  const chrome = document.querySelector<HTMLElement>('.site-chrome');
  const githubProjectPrefix = getGithubProjectPrefix();

  rewriteRootRelativeLinks(githubProjectPrefix);
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof Element) {
          rewriteRootRelativeLinks(githubProjectPrefix, node);
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  if (!chrome) {
    root.style.removeProperty('--site-chrome-offset');
    return;
  }

  const updateChromeOffset = () => {
    const chromeHeight = Math.ceil(chrome.getBoundingClientRect().height);
    root.style.setProperty('--site-chrome-offset', `${chromeHeight}px`);
  };

  updateChromeOffset();
  window.addEventListener('resize', updateChromeOffset);
}
