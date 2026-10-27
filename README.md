# hugo-yuzumone-theme

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
