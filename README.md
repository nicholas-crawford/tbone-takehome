# T-Bone Take home project

Live site: https://nicholas-crawford.github.io/tbone-takehome/

## Contents

- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Overview](#overview)
- [Approach](#approach)
- [Component decisions](#component-decisions)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Assumptions](#assumptions)
- [Trade-offs and next steps](#trade-offs-and-next-steps)

## Quick start

Requires Node 24 (the version CI uses).

```bash
npm install
npm run dev
```

Vite serves the app at [https://nicholas-crawford.github.io/tbone-takehome/](https://nicholas-crawford.github.io/tbone-takehome/). The `/tbone-takehome/` path comes from `base` in `vite.config.ts` and matches the GitHub Pages URL.

To run Storybook:

```bash
npm run storybook
```

It opens at http://localhost:6006.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check with `tsc -b`, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run Vitest in watch mode (unit tests and Storybook stories) |
| `npx vitest run --project=!storybook` | Run the unit tests once, without a browser |
| `npm run lint` | Lint with Oxlint |
| `npm run storybook` | Start Storybook |
| `npm run build-storybook` | Build a static Storybook to `storybook-static/` |

The Storybook test project runs stories in headless Chromium through Playwright. Run `npx playwright install chromium` once before running it.

## Project structure

```
src/
  components/    Small reusable UI (Button, FootnoteText, Swatch)
  features/      Page-specific composites (ModelCard)
  pages/         LandingPage
  content/       bz4x.json content and its Zod schema
  stories/       Storybook stories
  utils/         Formatting helpers
  test/          Vitest setup
public/images/   Static images referenced by the content JSON
```

Page content lives in `src/content/bz4x.json`. `pageContentSchema` in `src/content/schema.ts` validates it before rendering.

## Overview


This project is a take home test for the bz4x offer. It's a single landing page featuring a hero image, financing section and model selection with a footer and sticky button on mobile. It has data that comes from a Zod validated JSON file.

## Approach

My approach was to write the colour tokens, set up tailwind, vitest and storybook with the idea of building the required components with tests and coverage as I went along. The idea being that it would be easier to maintain the future rather than just being a throwaway.  

I usually would use a CSS reset and then roll my own classes with CSS/SCSS with a BEM methodology, but I wanted to use Tailwind to save time in building things out. It also has a lot of the scaling figured out so I can get my design close with the sizes provided in the figma design quicker. I also used oxlint. I was curious about it's speed in comparison to ESLint even if there isn't a larger plugin support. I would like to experiment more with it and see how it runs in a larger codebase. 

Then I wrote up the Zod schema and generated a JSON file to act as an external source. My original approach was to just mock loading that in from a fake request, but I ran out of time and decided to just build it with the app. I've used Zod in another project and I've found it's great for validating schemas and having single source of truth in TS.

Started out with the swatch, then a button, FootnoteText and ModelCard then built out a landing page with the pieces.

## Component decisions

I used `components/` for small reusable pieces (Button, FootnoteText, Swatch), `features/` for page-specific composites (ModelCard). I like to separate smaller pieces that I can use over and over that are intended to be pure with features that contain many components and still have a single purpose but have many moving parts. I find it sets intentions better and can be used to reduce the bloat in the component as much as possible. If I had more time, I would try and break more parts into some smaller pieces where I can. 

Button functions seemed like a link with a button look, so I designed it that way. Added some variants so they can be used in many places. 

Footnote text handles markers mid-text. The might be a better way to handle that rather than managing it in the component but this works for now.

I used the schema and mapped to tailwind classes for the swtach colours. Makes things a lot easier, and it's quick to add or remove in the future. 
- `wrapTerm` keeps "bZ4X" in its own case/colour inside uppercase CTAs and headings

Created `Intl.DateTimeFormat` and `Intl.NumberFormat` (en-AU, Australia/Sydney) for the offer end date and prices

## Accessibility

Some dot points on accessibility achievements:

- One `h1`, then `h2` per section and `h3` per model card, so screen reader users can jump between headings and get an outline of the page
- Model cards are `<article>`s named by their heading, so each card is announced with its model name when reached
- Swatch dots are `aria-hidden`, with the colour name as `sr-only` text, because a coloured dot means nothing to someone who can't see it. The list is labelled by "Available in:" so the colours are read with context
- Swatch dots use `forced-color-adjust-none` so they keep their colour in forced-colours mode (e.g. Windows High Contrast), where they would otherwise all turn the same system colour
- Hero gradient overlay is `aria-hidden`, since it's purely visual
- Decorative dots image in the model card has empty `alt`, so screen readers skip it instead of reading out a file name
- Model images have `alt` text describing the colour and body style, which the card heading doesn't cover
- Was able to hit 90+ on Lighthouse accessibility

## Assumptions

Toyota Type font wasn't supplied, but it's first in the font stack with Mulish as the fallback. I tried to find something a close a possible to the text.

I also added some active/hover states that were assumed.
## Trade-offs and next steps

Content is bundled at build time rather than fetched. I just ran out of time with this one.

Storybook tests don't run in CI (no Playwright browsers installed there) and didn't have time to fix it. 

There's some spacing that's off and with more time, I would focus on that to make it more pixel perfect. 

The images could be compressed more. Just ran out of time. Would do properly in the future. 

The tailwind classes can make the class names very bloated. I went for a "get it working" approach and would try to trim that down later. 

I would like the sticky menu to come later rather than just loading in on page load. 

I didn't have the other images for the swatch but if I did, would have made the colours selectable on the model view.

React/TS with Vite is pretty great, but it would have been better to make go with some SSR or something more static. It's just way better for SEO and all the content comes in one go for the browser rather than being built on load. 

I would like one of the helpers to be more text focused and not return JSX. It was more of a run out of time thing and would like to fix that. 

I wanted to fix up the button stories. They have a bit of bloat.
