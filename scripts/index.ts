import { json } from 'd3-fetch';

import CardList from './components/CardList.svelte';
import { syncSiteChromeOffset } from './utils/site-chrome';

syncSiteChromeOffset();

const pathParts = window.location.pathname.split('/').filter(Boolean);
const githubProjectPrefix =
  window.location.hostname.endsWith('.github.io') && pathParts.length > 0
    ? `/${pathParts[0]}`
    : '';
const url = `${githubProjectPrefix}/api/dictionary.json`;

json(url).then(function (dictionary) {
  new CardList({
    target: document.getElementById('card-container')!,
    props: {
      dictionary,
    },
  });
});
