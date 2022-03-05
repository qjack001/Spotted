# Spotted

A personal project, [originally developed over the summer over 2018](#historical), for spotting cool
greenery and cataloging houseplants. The website consists of watercolor illustrations hand-made by
[Ella](https://github.com/Ella-Minicola) that accompany descriptions of plants and guides to caring
for them. You can visit the site at [guinane.xyz/Spotted](https://guinane.xyz/Spotted).

### Operational Notes

This project is written using [Astro](https://astro.build) and deployed by [Github Pages](https://pages.github.com)
to the [`compiled-site`](https://github.com/qjack001/Spotted/tree/compiled-site) branch. The deployment process
follows the same pattern as [my personal site](https://github.com/qjack001/qjack001.github.io/), and more information
can  be found in [its _Deployment_ section](https://github.com/qjack001/qjack001.github.io/#deployment).

#### Local Development

Clone the repository, and install the dependencies:

```bash
pnpm install
```

To build and run the site locally:

```bash
pnpm run dev
```

#### Project Structure

```bash
├─ .github/       # workflow scripts for build & deploy
├┬ public/
│└─ images/       # images, obviously
└┬ src/
 ├─ components/   # a few simple components
 ├─ layouts/      # the template for each plant page
 └┬ pages/
  ├─ index.astro  # the homepage
  └─ *.md         # all the plant pages
```

#### Adding a New Plant

Start by creating a new Markdown file, or coping an existing one, in the [`src/pages/`](./src/pages)
directory. Name the file after the plant — in all lowercase — and replacing any spaces with hyphens.
For example, the page for _"Golden Pothos"_ would be named `golden-pothos.md`.

Fill out the following fields according to the plant you are adding:

```bash
---
name: # The Common Name of the Plant
image: # The name of the image file (without the ".png" extension)
layout: ../layouts/default.astro
last-updated: # The date in YYYY-MM-DD format

latin-name: # The Latin Name
type: # Whether its perennial or annual
native-to: # Where it is from
ideal-climate: # The biome it lives in
height-range: # The size of the plant
sun: # Sun preference
water: # Water preference
---

# Enter a little blurb here (about one paragraph).
```

Make sure the image of the plant has a transparent background and is named the same as you wrote it
in the template above. The `image:` field should only have the file name (i.e. `pothos`) while your
image should be named the same thing plus the file type (i.e. `pothos.png`). Only use PNG images.

Drop the image file into the [`public/images`](./public/images) folder. If you are running the site
locally, you will need to stop and restart the development server.

### Historical

Spotted was first developed over the summer of 2018. It was the first multi-paged website I had ever
built, and that came through in almost every aspect of the finished product. The site was ugly, slow
to load, and very inaccessible.

As I improved over the years I became increasingly (and painfully) aware of these shortcomings. But
as it turned out, the project's code was just as riddled with problems. It was disorganized, hard
to run locally, and tangled up on itself. For example, all of the site's styling was shoe-horned
into [one big 750-lined CSS file](https://github.com/qjack001/Spotted/blob/2018-version/style.css).

In late 2021, the domain name for the original iteration of the site — `spotted.site` — expired, and
I chose not to renew it. The site was relocated to [guinane.xyz/Spotted](https://guinane.xyz/Spotted),
where it still lives today. This change broke a bunch of things on the site (of course it did), and
it seemed like if I was going to fix it, I might as well fix everything.

The original site still holds a place in my heart, and you can visit it in all its glory at
[guinane.xyz/Archive/Spotted/2018](https://guinane.xyz/Archive/Spotted/2018). The source code has
also been preserved on the [`2018-version`](https://github.com/qjack001/Spotted/tree/2018-version)
branch.
