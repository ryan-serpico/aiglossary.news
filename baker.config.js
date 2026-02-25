var md = require('markdown-it')();

const entrypoints = ['index', 'detail', 'about'];

const slugifyFunc = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const stripMarkdownFunc = (s) => {
  return s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const escapeHtml = (str) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const siteUrl = (process.env.SITE_URL || 'https://abcsofai.news').replace(
  /\/+$/,
  ''
);

const siteDomain = (() => {
  try {
    return `${new URL(siteUrl).origin}/`;
  } catch {
    return `${siteUrl}/`;
  }
})();

export default {
  domain: siteDomain,
  entrypoints: `scripts/${
    entrypoints.length > 1 ? `{${entrypoints.join(',')}}` : entrypoints[0]
  }.ts`,
  pathPrefix:
    process.env.BAKER_PATH_PREFIX || process.env.DELIVERY_BASE_PATH || '/',
  nunjucksFilters: {
    slugify(value) {
      return slugifyFunc(value);
    },
    urlescape(value) {
      return encodeURIComponent(value);
    },
    json(value) {
      return JSON.stringify(value, null, 2);
    },
    markdown(value) {
      return md.render(value);
    },
    markdownInline(value) {
      return md.renderInline(value);
    },
    italicize(value, term) {
      return value.replace(new RegExp(`(${escapeRegExp(term)})`, 'i'), '_$1_');
    },
    stripMarkdown(s) {
      return stripMarkdownFunc(s);
    },
    escapeHtml(s) {
      return escapeHtml(s);
    },
  },
  createPages(createPage, data) {
    const wordList = Object.values(data.dictionary);
    // Sort alphabetically for prev/next navigation
    wordList.sort((a, b) =>
      a.word.toLowerCase().localeCompare(b.word.toLowerCase())
    );
    createPage('dictionary.json.njk', '/api/dictionary.json', {
      object_list: JSON.stringify(wordList, null, 2),
    });
    let urlList = ['/', '/about/'];
    for (let i = 0; i < wordList.length; i++) {
      const obj = wordList[i];
      const prevTerm = i > 0 ? wordList[i - 1] : null;
      const nextTerm = i < wordList.length - 1 ? wordList[i + 1] : null;
      const template = 'word-detail.html';
      const url = `/${slugifyFunc(obj.word)}/`;
      const meta = {
        site_name: data.meta.site_name,
        locale: data.meta.site_name,
        byline: data.meta.byline,
        pub_date: data.meta.pub_date,
        update_date: data.meta.update_date,
        social_image: data.meta.social_image,
        headline: data.meta.headline,
        description: data.meta.description,
        seo_headline: obj.word,
        seo_description: escapeHtml(
          stripMarkdownFunc(obj.definition_list[0].text)
        ),
      };
      createPage(template, url, { obj, meta, prevTerm, nextTerm });
      urlList.push(url);
    }
    // Make sitemap
    createPage('sitemap.xml.njk', 'sitemap.xml', {
      urlList,
      siteUrl,
    });
    // Make robots.txt
    createPage('robots.txt.njk', 'robots.txt', { siteUrl });
  },
};
