---
name: term-researcher
description: Research AI terms and create glossary entries for the ABCs of AI. Searches news articles from quality publications, extracts quotes showing the term in context, and generates YAML dictionary files.
argument-hint: '[ai-term]'
---

# Term Researcher

Research an AI term and create a dictionary entry for the ABCs of AI glossary.

## Your Task

For the AI term provided: **$ARGUMENTS**

1. **Search for recent news articles** that use this term

   - Search for news reporting only — no opinion columns, no academic papers
   - Target publications: NYT, Washington Post, Wired, WSJ, ProPublica, TIME, TechCrunch, CNBC, NBC News, MIT Technology Review, IEEE Spectrum
   - Use WebSearch with allowed_domains filters when possible
   - Note: many major outlets block Anthropic's crawler — try multiple sources and be persistent
   - Look for 2-3 high-quality recent articles that use the term naturally in reporting

2. **Fetch and analyze articles**

   - Use WebFetch on promising URLs to find good quotes that use the term in context
   - If a site doesn't return article body text, try the /amp/ version or move on to another source
   - Look for quotes that help a journalist understand what the term means in practice
   - Prioritize quotes that are informative and from reporting, not just passing mentions

3. **Generate the YAML entry**

   - Write a clear, plain-language definition accessible to journalists (1-2 sentences for the opening paragraph)
   - **Contextualize for data reporters.** This glossary is built for the NICAR conference — an audience of data journalists and newsroom developers. After the core definition, add 1-2 paragraphs that help a data reporter understand why this term matters to them. Use concrete examples: How could a reporter at a local newspaper use this? How does it connect to tasks like scraping websites, analyzing documents, building datasets, or fact-checking? Ground abstract concepts in newsroom scenarios.
   - **Use multiple paragraphs.** Break definitions into digestible chunks using the YAML `>-` block scalar with double blank lines between paragraphs (see [yaml-template.md](yaml-template.md) for the format). Avoid walls of text.
   - **Cross-reference related terms.** If the term relates to other entries in `_data/dictionary/`, link to them using relative URLs (e.g., `[Model Context Protocol](/model-context-protocol/)`). Help readers build a mental map of how concepts connect.
   - Include 2-3 quotes from the articles found
   - Italicize the term in each quote using `_term_` syntax
   - Use the exact YAML format from [yaml-template.md](yaml-template.md)
   - Save to: `_data/dictionary/{term-name}.yaml` (lowercase, hyphens for spaces)

4. **Present the result**
   - Show the user the generated YAML content
   - List the sources used with links
   - Ask if they want adjustments before committing

## Important Rules

- **No opinion columns.** Only news reporting.
- **No academic sources.** No arxiv, no journals, no university papers.
- **Italicize the term** in each "in*use" quote using `\_underscores*`.
- **Keep definitions plain-language.** Write for journalists, not engineers.
- Check `_data/dictionary/` first to make sure the term doesn't already exist.

## Tools to Use

- **WebSearch**: Search for news articles (use allowed_domains to target quality outlets)
- **WebFetch**: Fetch article content to extract quotes
- **Read**: Check existing terms in `_data/dictionary/` for style reference
- **Glob**: Check if the term already has an entry

See [yaml-template.md](yaml-template.md) for the exact YAML structure.
