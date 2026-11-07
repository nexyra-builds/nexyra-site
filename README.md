# NEXYRA — One-page Jekyll site for GitHub Pages

A responsive, single-page landing site for custom AI applications, workflow automation and LLM efficiency consulting. Includes: hero intake form, sticky conversion header, three solution cards, animated workflow illustration, token-cost optimization positioning, a consultant capabilities section, real-testimonial support, FAQs and a final CTA.

**Important:** GitHub Pages is static hosting. It cannot independently send contact-form email. This project uses a real Formspree POST integration so submissions reach your Formspree inbox and, once email notifications are enabled, your chosen email address. **Form delivery will not work until you add your own endpoint** (see below). No API key is exposed, and the form does not fake a successful submission.

## 1. Connect the contact form (required)

1. Create an account at https://formspree.io/, verify the receiving email address, and create a **New Form** for NEXYRA.
2. In your form's **Integration** view, copy the endpoint in this format: `https://formspree.io/f/xxxxxxxx`.
3. Edit **`_config.yml`** and set:

   ```yaml
   formspree_endpoint: "https://formspree.io/f/YOUR_REAL_FORM_ID"
   ```

4. In your Formspree settings, enable/confirm email notifications to the inbox that should receive leads. You can also view submissions in Formspree's dashboard.
5. Deploy, then fill out the live form with a real test inquiry. Confirm the submission appears in your Formspree dashboard **and** the receiving inbox (check spam if needed).

**How it works:** The page validates name, email, and a 15-character minimum description, submits via `fetch()` to Formspree and shows a success message only after the provider accepts it. If JavaScript is disabled, the standard HTML form POST works when an endpoint has been configured. A hidden `_gotcha` field helps with spam protection.

**Not configured?** Clicking submit shows a clear configuration error instead of pretending a request was sent. This is deliberate: there is no legitimate way for a GitHub Pages form to deliver emails without specifying a destination or using a form backend.

Formspree docs: https://help.formspree.io/articles/building-your-form/building-an-html-form

## 2. Publish to GitHub Pages

1. Create a GitHub repository, for example `nexyra-site`.
2. Extract the contents of this ZIP to the **root** of that repository. The `.github/workflows/pages.yml` file must be included. Commit to the `main` branch.
3. Set these values in `_config.yml`:

   **For a custom domain** (`nexyra.example`):
   ```yaml
   url: "https://nexyra.example"
   baseurl: ""
   ```

   **For a project repository** (`username.github.io/nexyra-site`):
   ```yaml
   url: "https://username.github.io"
   baseurl: "/nexyra-site"
   ```

   **For a user/org Pages repository** (`username.github.io`):
   ```yaml
   url: "https://username.github.io"
   baseurl: ""
   ```

4. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. Push your changes. The included workflow builds with Ruby/Jekyll and deploys automatically. Watch the **Actions** tab for green status. Open the URL in your Pages settings.
6. Repeat the live form test after each form configuration change.

The `url` and `baseurl` settings affect generated image, script, stylesheet, and social preview links. Set them correctly before deploying to a subdirectory.

## 3. Preview locally

You need Ruby, Bundler, and Jekyll available on your system:

```bash
bundle install
bundle exec jekyll serve --livereload
```

Open `http://127.0.0.1:4000`. The form works locally, too, once the Formspree endpoint is configured (subject to Formspree provider settings).

## 4. Update branding, positioning and content

| What to change | Where |
| --- | --- |
| Brand assets (light/dark PNG and icons) | `assets/images/` |
| Visual typography and color system | `assets/css/style.scss` |
| Headlines, sections, CTAs, form labels | `index.html` |
| Destination for form inquiries | `formspree_endpoint` in `_config.yml` |
| Consultant specialties | `_data/consultants.yml` |
| Real customer testimonials | `_data/testimonials.yml` |
| Meta/social preview text | `index.html` front matter and `_layouts/default.html` |
| Social share image | `assets/images/nexyra-social.png` |

### NEXYRA typography

The **actual approved NEXYRA wordmark is used as a transparent PNG asset** so it remains visually faithful to your chosen logo. The rest of the site uses locally hosted `.woff2` fonts: **Nexyra Sans** (CSS alias for OFL-licensed Montserrat) for headings and **Nexyra UI** (CSS alias for OFL-licensed Inter) for body/UI text. All font files are in `assets/fonts` and are referenced with `@font-face` in the stylesheet. They were subsetted and converted for web distribution. They are **not a newly drawn exclusive font** and not an exact glyph-for-glyph duplicate of the AI-rendered wordmark. The selected wordmark is preserved in the transparent PNGs; complementary SVG reconstructions are included. Keep the bundled font notices when redistributing.

### Testimonials without invented quotes

Only publish testimonials that are real, verified, and approved by the customer. The site uses a strong "See the prototype" proof section by default instead of fictional endorsements. To show genuine quotes, edit `_data/testimonials.yml`:

```yaml
- quote: "A genuine, approved client comment goes here."
  name: "Real Person"
  position: "Real Role"
  company: "Actual Company"
  result: "Optional verified result"
```

The site automatically switches to customer quote cards when the list contains one or more items.

### Consultants section

The initial cards in `_data/consultants.yml` describe **consulting capabilities**, not fictional employees or made-up staff biographies. Replace or expand them with real named consultants when those details are available and approved.

### The 40–90% claim

The wording intentionally calls 40–90% a **token-cost reduction target**, not a measured NEXYRA outcome or guaranteed result. The on-page disclosure explains that actual savings depend on the baseline workload, latency/quality requirements, caching opportunities, and measurement. Don't present it as a proven general result without supporting benchmarks.

## 5. Accessibility and performance

- Responsive layouts including narrow phones; keyboard-visible focus and a skip link.
- Native labels, required fields and validation; AJAX submission status announced with `aria-live`.
- Respects `prefers-reduced-motion`.
- Most visual artwork is made with lightweight HTML/CSS, with brand PNGs used for authenticity.
- Fonts are self-hosted, so the design does not rely on external font requests; system fallbacks are provided.
- Static Jekyll output; no client framework or server to maintain.

## Source layout

```text
nexyra-jekyll/
├── .github/workflows/pages.yml
├── _config.yml
├── Gemfile
├── _data/
│   ├── consultants.yml
│   └── testimonials.yml
├── _layouts/default.html
├── index.html
├── assets/
│   ├── fonts/*.woff2 (self-hosted + license notices)
│   ├── css/style.scss
│   ├── js/main.js
│   └── images/
│       ├── nexyra_logo_light_transparent.png
│       ├── nexyra-logo-light.svg / nexyra-logo-dark.svg
│       ├── nexyra-favicon.svg
│       ├── nexyra_logo_dark_transparent.png
│       ├── nexyra_icon_light_transparent.png
│       ├── nexyra_icon_dark_transparent.png
│       ├── nexyra-icon.png
│       └── nexyra-social.png
└── README.md
```

## Brand kit and CSS example

The approved NEXYRA brand (electric blue → aqua N + geometric NEXYRA wordmark) is packaged as transparent PNGs and production SVG approximations in `assets/images/`. The transparent PNGs preserve the generated lettering; SVG reconstructions are infinitely scalable but may differ in tiny typographic details.

```css
@font-face {
  font-family: 'Nexyra Sans';
  src: url('../fonts/nexyra-sans-medium.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}
.brand-heading { font-family: 'Nexyra Sans', sans-serif; letter-spacing: .08em; }
```

For a GitHub Pages project-site subpath, use Jekyll `relative_url` in templates; the stylesheet's relative font URLs work automatically.

**Preview mode:** A separately provided `nexyra-browser-preview.zip` contains static compiled-equivalent HTML/CSS, so you can open `index.html` locally without Ruby. The form requires the same Formspree endpoint and cannot deliver while it is blank.

## Local test notes

A browser smoke test was run at 1440, 1024, 768, 390, and 320 CSS pixels, with no horizontal overflow or JavaScript exceptions; the sticky CTA, consultant cards, FAQ sections and local webfonts were checked. Form submission tests simulated both provider success and failure responses. An actual Formspree delivery requires the receiving endpoint in `_config.yml`; no live delivery was possible without an inbox connection. The Jekyll build is configured for GitHub Actions but should be verified in the actual repository after publishing.
