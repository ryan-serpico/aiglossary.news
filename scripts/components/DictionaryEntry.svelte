<script>
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

  const truncate = (inputString, maximumLength = 160) => {
    let outputString = "";
    let outputLength = 0;
    const tokenList = inputString.trim().split(' ');
    tokenList.forEach((token) => {
      outputLength += token.length;
      if (outputLength < maximumLength) {
        outputString += ` ${token}`;
      }
    });
    return outputString.trim() + " ...";
  };

  const stripMarkdown = (s) => {
    return s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
  };

  const getShortDefinition = (arr) => {
    if (arr.length > 0) {
      return truncate(stripMarkdown(arr[0].text));
    } else {
      return '';
    }
  };

  $: shortDefinition = getShortDefinition(definitionList);
</script>

<a href="/{slugify(word)}/" class="dictionary-entry">
  <div class="entry--headline">
    <span class="entry--word">{word}</span>
    <span class="entry--type">{type}</span>
  </div>
  <div class="entry--definition">
    {#if definitionList.length > 1}<sup>1</sup>{/if}
    {shortDefinition}
  </div>
</a>
