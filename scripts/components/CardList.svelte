<script>
  import { writable, derived } from 'svelte/store';
  import LetterGroup from './LetterGroup.svelte';
  import DictionaryEntry from './DictionaryEntry.svelte';
  import AboutInline from './AboutInline.svelte';
  import RequestCard from './RequestCard.svelte';

  /**
   * @type {Array<any>}
   */
  export let dictionary;
  export let displayAll = true;

  // Sort alphabetically
  const sortByName = (a, b) => {
    const aName = a.word.toLowerCase();
    const bName = b.word.toLowerCase();
    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  };
  dictionary.sort(sortByName);

  const term = writable('');
  const items = writable(dictionary);

  const filtered = derived(
    [term, items],
    ([$term, $items]) =>
      $items.filter((x) =>
        x.word.toLowerCase().includes($term.toLowerCase())
      )
  );

  // Group filtered items by first letter
  const grouped = derived(filtered, ($filtered) => {
    const groups = [];
    let currentLetter = '';
    for (const item of $filtered) {
      const firstLetter = item.word[0].toUpperCase();
      if (firstLetter !== currentLetter) {
        currentLetter = firstLetter;
        groups.push({ letter: currentLetter, items: [] });
      }
      groups[groups.length - 1].items.push(item);
    }
    return groups;
  });

  const detailElements = Array.from(document.getElementsByClassName('card--detail'));

  let val = '';
  $: term.set(val);
  $: hide =
    ($filtered.length == 0 || $filtered.length == $items.length) &&
    !displayAll;
  $: {
    if ($term) {
      detailElements.forEach((e) => e.classList.add('display-none'));
    } else {
      detailElements.forEach((e) => e.classList.remove('display-none'));
    }
  }
</script>

<div class="search">
  <input bind:value={val} type="text" placeholder="Search for a term..." />
</div>

<div class="dictionary-list {hide ? 'display-none' : ''}">
  {#each $grouped as group, groupIdx}
    <LetterGroup letter={group.letter} />
    {#each group.items as obj}
      <DictionaryEntry
        word={obj.word}
        type={obj.type}
        definitionList={obj.definition_list}
      />
    {/each}
    {#if groupIdx === 0 && !$term && $grouped.length > 1}
      <AboutInline />
    {/if}
  {/each}
  {#if $term && $filtered.length == 0}
    <RequestCard word={$term} />
  {/if}
</div>
