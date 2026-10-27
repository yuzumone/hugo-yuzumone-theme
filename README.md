# hugo-yuzumone-theme

## Content language and date formatting

The HTML `lang` attribute uses the site's language code. Dates use `locale`.
For Japanese content with dates formatted in US English:

```toml
defaultContentLanguage = 'ja'
locale = 'en-US'
```

For multilingual sites, each language's language code and locale apply to its
pages independently.

## Search

Archives searches article titles, body text, and tags using case-insensitive
substring matching. Body matches show an excerpt starting at the match; title
and tag matches use the beginning of the body. An empty query shows all entries.
HTML entities are decoded in the generated search index and results are rendered
as plain text.

Run the search regression tests with `node --test tests/search.test.cjs`.

## Home page

Limit the home page to selected top-level content sections in `hugo.toml`:

```toml
[params]
mainSections = ['articles']
```

The home page shows the latest 10 visible pages from those sections. With a
single section, **See all posts** links to its section listing. With multiple
sections, it links to Archives. When `mainSections` is empty or omitted, the home
page shows all visible regular pages and links to Archives, as before.

A missing section falls back to Archives. The link is omitted if no destination
page exists. Sites overriding `layouts/_default/home.html` must remove that
override after updating the theme to use this setting.

## Google Analytics and AdSense

Configure these optional services in your site's `hugo.toml`:

```toml
[services.googleAnalytics]
id = 'G-XXXXXXXXXX'

[params.googleAdSense]
client = 'ca-pub-XXXXXXXXXXXXXXXX'
```

Each service is disabled when its ID is empty or omitted. Scripts are included
only in production builds (`hugo` or `hugo --environment production`), and are
excluded from the default `hugo server` development environment.

Google Analytics uses Hugo's [embedded template](https://gohugo.io/templates/embedded/#google-analytics)
and respects `[privacy.googleAnalytics]`, including `disable`.
AdSense loads the site script; configure Auto ads or ad units in AdSense.

If your site overrides `layouts/partials/head.html`, remove the override after
updating the theme, or add `{{ partial "head/services.html" . }}` to that template.
Remove any existing hardcoded Analytics and AdSense scripts to avoid duplicates.
