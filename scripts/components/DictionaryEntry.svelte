<script>
  import Share from "svelte-material-icons/Share.svelte";
  import Flag from "svelte-material-icons/Flag.svelte";

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

  const truncate = (inputString, maximumLength = 120) => {
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

  const handleShare = function () {
    if (navigator.share) {
      navigator.share({
        url: `https://abcsofai.news/${slugify(word)}/`,
      });
    }
  };
</script>

<div class="dictionary-entry">
  <div class="entry--headline">
    <span class="entry--word">
      <a href="/{slugify(word)}/">{word}</a>
    </span>
    <span class="entry--type">{type}</span>
  </div>
  <div class="entry--definition">
    {#if definitionList.length > 1}<sup>1</sup>{/if}
    {shortDefinition}
  </div>
  <div class="entry--actions">
    <a href="/{slugify(word)}/">Read more</a>
    <a
      aria-label="Flag"
      href="https://github.com/ryan-serpico/abcsofai.news/issues/new?assignees=palewire&labels=bug&template=flag-an-error.yaml&title=Error%20with%20{encodeURIComponent(word)}&word={encodeURIComponent(word)}"
    >
      <Flag size={13} /> Flag
    </a>
    {#if typeof navigator !== 'undefined' && navigator.share}
      <a aria-label="Share" on:click={handleShare} style="cursor: pointer;">
        <Share size={13} /> Share
      </a>
    {/if}
  </div>
</div>
