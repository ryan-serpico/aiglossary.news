# YAML Format for Dictionary Terms

Each term is a single YAML file in `_data/dictionary/`. The filename should be lowercase with hyphens (e.g., `machine-learning.yaml`).

## Template

```yaml
word: Term Name
type: noun
definition_list:
  - text: Plain language definition accessible to journalists. Can include [markdown links](https://example.com).
    in_use:
      - text: 'Quoted excerpt showing the term used in reporting context. The _term_ should be italicized with underscores.'
        source: Publication Name
        url: https://full-url-to-article.com
      - text: 'A second example quote from a different article, again with the _term_ italicized.'
        source: Another Publication
        url: https://another-url.com
```

## Field Reference

- **word**: Display name, title-cased (e.g., "Machine Learning", "Prompt Injection")
- **type**: Lowercase part of speech — noun, verb, adjective, phrase, or acronym
- **definition_list**: Array of definition objects (usually just one)
- **text** (in definition): Plain-language definition. Keep it accessible to a non-technical audience.
- **in_use**: Array of real-world usage examples from news reporting
- **text** (in in*use): Direct quote from an article. Italicize the term with `\_underscores*`.
- **source**: Publication name (e.g., "TIME", "TechCrunch", "The Washington Post")
- **url**: Full URL to the source article
