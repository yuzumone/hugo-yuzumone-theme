# hugo-yuzumone-theme

## Content language and date formatting

The HTML `lang` attribute uses the site's language code. Dates use `locale`.
For Japanese content with dates formatted in US English, set the following in
`hugo.toml`:

```toml
defaultContentLanguage = 'ja'
locale = 'en-US'
```

For multilingual sites, each language's code and locale apply to its own pages.

## Home page

Limit the home page to selected top-level content sections:

```toml
[params]
mainSections = ['articles']
```

The home page shows the latest 10 visible pages from those sections. With one
section, **See all posts** links to its section listing. With multiple sections,
it links to Archives. When `mainSections` is empty or omitted, all visible regular
pages are included and the link points to Archives.

A missing section falls back to Archives. If no destination page exists, the link
is omitted. Sites overriding `layouts/_default/home.html` must remove that
override to use this setting.

## Search

Archives searches article titles, body text, and tags using case-insensitive
substring matching. Body matches show an excerpt starting at the match; title
and tag matches use the beginning of the body. An empty query shows all entries.
HTML entities are decoded in the generated search index, and results are rendered
as plain text.

Run the search regression tests with `node --test tests/search.test.cjs`.

## Custom head elements

Create `layouts/partials/head/custom.html` in your site to append meta tags,
scripts, or other elements to every page's `<head>`. The theme includes an empty
default partial, so no site override is required. The current page is available
as `.` inside the partial.

For example, to add a site verification tag:

```html
<meta name="google-site-verification" content="your-verification-token">
```

This lets you extend the head without copying the theme's `head.html`.

## Canonical URLs and social sharing

Each page emits a canonical link using its permalink. Set `baseURL` to the public
site URL, including any deployment subpath. Open Graph and Twitter Card metadata
use Hugo's [embedded templates](https://gohugo.io/templates/embedded/).

Configure a site description and optional X/Twitter account:

```toml
[params]
description = 'A short description of your site.'

[params.social]
twitter = 'your_account'
```

Set an article's `description` in front matter to customize its sharing text.
Article `images`, singular `image`, and page-bundle images are never used for
Open Graph or Twitter Cards. Singular `image` remains the article-list thumbnail.

Twitter Cards use `summary_large_image` when a sharing image is available and
`summary` otherwise.

### Generated title images

Place a background image in your site's `assets/images/`, optionally add a logo,
and enable generation. Paths are relative to `assets/`:

```toml
[params.ogImage]
enabled = true
background = 'images/og-background.png'
logo = 'images/og-logo.png'
```

Backgrounds and logos belong to the site; the theme itself does not bundle them.
To try the example design, copy the generic demo assets from
`exampleSite/assets/images/` into your site's `assets/images/`.

Hugo generates 1200x630 PNGs at `/og/index.<hash>.png` for the home page and at paths
such as `/og/articles/my-article.<hash>.png` for articles. The content hash changes
when the image changes, so rebuilds and cached pages can reference the updated
image. Translated sites use their language
prefix under `/og/`. Deployment subpaths are preserved in the generated URLs.

Each page gets a title card using the shared background, logo, and font settings.
Japanese and Latin titles wrap across up to four lines; longer titles are
truncated. Emoji are omitted from image titles because the default font has no
emoji glyphs. Page titles are unchanged.

No Node.js image service is needed. By default, Hugo downloads IBM Plex Sans JP
SemiBold from Google Fonts during the build and caches it as a remote resource.
No font files are distributed with the theme.

To customize the font source and text color:

```toml
[params.ogImage]
enabled = true
background = 'images/og-background.png'
logo = 'images/og-logo.png'
font = 'https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexsansjp/IBMPlexSansJP-SemiBold.ttf'
color = '#fafafa'
```

The same `font` setting accepts a local asset path instead:

```toml
[params.ogImage]
enabled = true
background = 'images/og-background.png'
logo = 'images/og-logo.png'
font = 'fonts/my-font.ttf' # Place the file in your site's assets/fonts/.
```

Use a direct **TTF or OTF file URL**, not a CSS stylesheet or directory URL.
Fontsource's web-font CDN normally provides WOFF/WOFF2 files, which Hugo's image
text renderer cannot read. Choose a font containing Japanese glyphs for Japanese
titles.

With a local font, image generation works without network access. A failed font
download stops the build with the URL in the error. If no pages require image
generation, no font is fetched.

Set `generateOGImage: true` or `generateOGImage: false` in page front matter to
override the site-wide generation setting for that page.

Only generated title cards are used as sharing images. Site-wide `params.images`
and article image settings are ignored. When generation is disabled for a page,
no `og:image` or `twitter:image` is emitted and its Twitter Card uses `summary`.

Hugo's embedded templates render the tags, while the theme's image provider
supplies generated cards.

Sites overriding `layouts/partials/head.html` must remove the override or call
`{{ partial "head/social.html" . }}` from their head template.

## Google Analytics and AdSense

Configure these optional services in your site's `hugo.toml`:

```toml
[services.googleAnalytics]
id = 'G-XXXXXXXXXX'

[params.googleAdSense]
client = 'ca-pub-XXXXXXXXXXXXXXXX'
```

Each service is disabled when its ID is empty or omitted. Scripts are included
only in production builds (`hugo` or `hugo --environment production`) and excluded
from the default `hugo server` development environment.

Google Analytics uses Hugo's [embedded template](https://gohugo.io/templates/embedded/#google-analytics)
and respects `[privacy.googleAnalytics]`, including `disable`.
AdSense loads the site script; configure Auto ads or ad units in AdSense.

Sites overriding `layouts/partials/head.html` must remove the override or add
`{{ partial "head/services.html" . }}` to that template. Remove existing hardcoded
Analytics and AdSense scripts to avoid duplicate loading.
