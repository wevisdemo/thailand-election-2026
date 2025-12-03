# @election/tailwind

Shared tailwind theme and utilities

## Usage

1. Add link to the font-face CSS files

```html
<link
	href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@400;700&family=Sriracha&display=swap"
	rel="stylesheet"
/>
<link
	href="https://design-systems.wevis.info/typography.css"
	rel="stylesheet"
/>
```

2. Add this package in your project's `package.json`

```json
"dependencies": {
	"@election/tailwind": "workspace:*",
}
```

3.  Import the CSS file in your project following `tailwindcss`

```postcss
@import 'tailwindcss';
@import '@election/tailwind/index.css';

/* Your custom Tailwind config / CSS */
```
