import { json } from 'd3-fetch';

import CardList from './components/CardList.svelte';
import { syncSiteChromeOffset } from './utils/site-chrome';

syncSiteChromeOffset();

if (navigator.share) {
  const btn = document.getElementById('card--share')!;
  btn.classList.remove('display-none');
  const a = btn.getElementsByTagName('a')[0];
  a.addEventListener('click', function (e) {
    const url = window.location.href;
    navigator.share({ url });
  });
}

const pathParts = window.location.pathname.split('/').filter(Boolean);
const githubProjectPrefix =
  window.location.hostname.endsWith('.github.io') && pathParts.length > 0
    ? `/${pathParts[0]}`
    : '';
const url = `${githubProjectPrefix}/api/dictionary.json`;
const target = document.getElementById('card-container')!;
json(url).then(function (dictionary) {
  new CardList({
    target,
    props: {
      dictionary,
      displayAll: false,
    },
  });
});
