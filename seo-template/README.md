# Ginger Huff Interiors — Programmatic SEO Location Page Template

## Template File
`location-page-template.html`

---

## Variable Injection Reference

| Placeholder | Description | Example |
|---|---|---|
| `{{City}}` | Target city name | `Edwardsville` |
| `{{State}}` | State abbreviation | `IL` |
| `{{URL_Slug}}` | URL-safe slug for canonical + breadcrumb | `edwardsville-il` |
| `{{H1_Tag}}` | Hero headline (SEO-optimized H1) | `Luxury Interior Design in Edwardsville, IL` |
| `{{Meta_Title}}` | `<title>` tag content | `Interior Designer in Edwardsville, IL \| Ginger Huff Interiors` |
| `{{Meta_Description}}` | Meta description (max 160 chars) | `Family-owned luxury interior design firm serving Edwardsville, IL. Kitchen & bath, residential & commercial design. 30+ years legacy. Call (618) 971-9113.` |

---

## Hardcoded NAP Data (Do NOT Alter)
These values are locked to match the primary GBP (Google Business Profile) footprint:

- **Name:** Ginger Huff Interiors
- **Phone:** +1-618-971-9113
- **Email:** ghi@gingerhuffinteriors.com
- **Price Range:** $$$
- **Address:** Edwardsville, IL 62025

---

## Before Deploying

1. **Replace `YOUR_API_KEY`** in the Google Maps embed URL with your Maps Embed API key:
   ```
   src="https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=Ginger+Huff+Interiors+{{City}}+{{State}}"
   ```

2. **Ensure image paths resolve** — hero + gallery images point to production URLs:
   - `https://www.gingerhuffinteriors.com/src/assets/images/modern_living_room_...`
   - `https://www.gingerhuffinteriors.com/logos/Ginger%20Huff%20Interiors%20Logo.webp`

3. **Unique gallery content (anti-doorway):** For best results, replace the 4 portfolio tiles with city-specific project names/images per generated page. The gallery section is designed for this.

---

## Schema Structure

The `<head>` contains a `@graph` JSON-LD block with two nodes:

1. **`LocalBusiness` + `HomeGoodsStore` + `InteriorDesigner`** — hardcoded NAP, `areaServed` maps to `{{City}}, {{State}}`
2. **`WebPage`** — canonical URL, breadcrumb list, and meta referencing the slug and city variables

---

## Performance Optimizations Applied

- Hero image: `fetchpriority="high" loading="eager"` for optimal LCP
- Logo: `fetchpriority="high" loading="eager"`
- All below-fold images: `loading="lazy" decoding="async"`
- Sections below the fold use `content-visibility: auto` + `contain-intrinsic-size` to defer rendering (per [modern web guidance](https://web.dev))
- Fonts loaded via `preconnect` + Google Fonts with `display=swap`

---

## Page Structure

```
<nav>          — sticky glassmorphic nav, phone CTA
<header>       — hero (H1, CTA, trust badges, breadcrumb)
<main>
  <section id="intro">       — brand story + stats
  <section id="services">    — 4-service grid ({{City}}-localized)
  <section id="process">     — 4-step process (EEAT)
  <section id="portfolio">   — gallery / anti-doorway section
  <section id="map">         — GBP co-citation map + NAP address block
  <section id="testimonials">— 3 client reviews
  <section id="cta-band">    — final CTA band
</main>
<footer>       — links, service areas, NAP, social, hours
```
