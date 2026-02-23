<script>
  import { writable, derived } from 'svelte/store';
  import { onMount, onDestroy } from 'svelte';
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
    ([$term, $items]) => {
      if (!$term) return $items;
      const q = $term.toLowerCase();
      return $items.filter((x) =>
        x.word.toLowerCase().includes(q) ||
        x.definition_list.some((d) => d.text.toLowerCase().includes(q))
      );
    }
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
  let inputEl;

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

  function handleKeydown(e) {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      inputEl?.focus();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    document.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="intro">
  <p>
    A free, open-source glossary of AI terms and concepts for journalists. Built as supplementary material for the <strong>"AI concepts you should know"</strong> session at <a href="https://www.ire.org/training/conferences/nicar-2026/">NICAR 2026</a> in Indianapolis.
  </p>
  <p>
    This project is a fork of <a href="https://moneyinpolitics.wtf/">moneyinpolitics.wtf</a> by <a href="https://www.icij.org/journalists/agustin-armendariz/">Agustin Armendariz</a>, <a href="https://www.washingtonpost.com/people/anu-narayanswamy/">Anu Narayanswamy</a>, <a href="https://palewi.re/who-is-ben-welsh/">Ben Welsh</a> and <a href="https://thescoop.org/">Derek Willis</a>. Their dictionary of campaign finance jargon provided both the inspiration and the foundation for this site. In the spirit of their <a href="https://www.niemanlab.org/2026/02/journalism-lost-its-culture-of-sharing-heres-how-we-rebuild-it/">recent call</a> to revive open-source culture in journalism, we're keeping the tradition alive.
  </p>
  <div class="intro--actions">
    <a class="intro--btn intro--btn-primary" href="https://github.com/ryan-serpico/abcsofai.news/issues/new?template=add-a-word.yaml" target="_blank" rel="noopener noreferrer">Add a term</a>
    <a class="intro--btn intro--btn-secondary" href="https://github.com/ryan-serpico/abcsofai.news/issues/new?template=request-a-word.yaml" target="_blank" rel="noopener noreferrer">Request a term</a>
  </div>
</div>

<div class="search">
  <div class="search--wrapper">
    <svg class="search--icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
    <input bind:this={inputEl} bind:value={val} type="text" placeholder="Search for a term..." />
    <kbd class="search--shortcut">/</kbd>
  </div>
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
