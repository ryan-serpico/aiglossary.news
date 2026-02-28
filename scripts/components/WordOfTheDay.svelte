<script>
  const slugify = (str) => str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  /** @type {Array<any>} */
  export let dictionary;

  const getWordOfTheDay = (dict) => {
    const now = new Date();
    const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    return dict[seed % dict.length];
  };

  $: entry = getWordOfTheDay(dictionary);
  $: slug = entry ? slugify(entry.word) : '';
</script>

{#if entry}
  <a href="/{slug}/" class="word-of-the-day">
    <span class="wotd--label">Word of the day</span>
    <div class="entry--headline">
      <span class="entry--word">{entry.word}</span>
      <span class="entry--type">{entry.type}</span>
    </div>
  </a>
{/if}
