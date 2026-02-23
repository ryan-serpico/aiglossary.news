<script>
  /** @type {string} */
  export let word;
  $: url = `https://github.com/ryan-serpico/abcsofai.news/issues/new?assignees=palewire&labels=enhancement&template=request-a-word.yaml&title=Request definition for ${word}`;
</script>

<div class="no-results">
  <div class="no-results--headline">No results found</div>
  <div class="no-results--body">
    Can't find what you're looking for? <a href="{url}">Request a definition</a> from our experts.
  </div>
</div>
