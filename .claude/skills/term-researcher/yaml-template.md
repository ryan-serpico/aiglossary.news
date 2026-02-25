# YAML Format for Dictionary Terms

Each term is a single YAML file in `_data/dictionary/`. The filename should be lowercase with hyphens (e.g., `machine-learning.yaml`).

## Template

```yaml
word: Term Name
type: noun
definition_list:
  - text: >-
      Plain language definition accessible to journalists. One to two sentences explaining what the term means.


      A second paragraph contextualizing the term for data reporters. Use concrete examples: how could a journalist at a local newspaper use this? How does it connect to tasks like scraping websites, analyzing documents, or building datasets? Ground abstract concepts in newsroom scenarios.


      An optional third paragraph with additional context — history, adoption, or cross-references to related glossary terms using relative links like [related term](/related-term/).
    in_use:
      - text: 'Quoted excerpt showing the term used in reporting context. The _term_ should be italicized with underscores.'
        source: Publication Name
        url: https://full-url-to-article.com
      - text: 'A second example quote from a different article, again with the _term_ italicized.'
        source: Another Publication
        url: https://another-url.com
```

## Multi-Paragraph Definitions

Use the YAML folded block scalar (`>-`) for definitions with multiple paragraphs. Separate paragraphs with **two blank lines** (which produce `\n\n` in the output). The site's markdown filter renders these as separate `<p>` tags.

```yaml
- text: >-
    First paragraph here.


    Second paragraph here.


    Third paragraph here.
```

**Important:** The double blank lines between paragraphs are required. A single blank line will not produce a paragraph break.

## Field Reference

- **word**: Display name, title-cased (e.g., "Machine Learning", "Prompt Injection")
- **type**: Lowercase part of speech — noun, verb, adjective, phrase, or acronym
- **definition_list**: Array of definition objects (usually just one)
- **text** (in definition): Plain-language definition. Keep it accessible to a non-technical audience. Use multiple paragraphs to break up long definitions. Contextualize for data reporters.
- **in_use**: Array of real-world usage examples from news reporting
- **text** (in in*use): Direct quote from an article. Italicize the term with `\_underscores*`.
- **source**: Publication name (e.g., "TIME", "TechCrunch", "The Washington Post")
- **url**: Full URL to the source article

## Cross-Referencing

Link to other glossary entries using relative URLs:

- `[Model Context Protocol](/model-context-protocol/)`
- `[agent skills](/agent-skills/)`

Check `_data/dictionary/` for existing terms you can link to.
