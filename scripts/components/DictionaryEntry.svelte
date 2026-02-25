<script>
  import MarkdownIt from 'markdown-it';

  const md = new MarkdownIt();

  const slugify = (str) => str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  /** @type {string} */
  export let word;
  /** @type {string} */
  export let type;
  /** @type {Array<any>} */
  export let definitionList;

  const getPrimaryDefinitionHtml = (arr) => {
    if (arr.length > 0) {
      return md.renderInline(arr[0].text);
    } else {
      return '';
    }
  };

  $: primaryDefinitionHtml = getPrimaryDefinitionHtml(definitionList);
</script>

<a href="/{slugify(word)}/" class="dictionary-entry">
  <div class="entry--headline">
    <span class="entry--word">{word}</span>
    <span class="entry--type">{type}</span>
  </div>
  <div class="entry--definition">
    {#if definitionList.length > 1}<sup>1</sup>{/if}
    {@html primaryDefinitionHtml}
  </div>
</a>
