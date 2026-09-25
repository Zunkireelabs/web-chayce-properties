const Image = require("@11ty/eleventy-img");
const path = require("path");

function resolveInput(src) {
  return path.join("./src/images/", src.replace(/^\/?images\//, ""));
}

// Renders a responsive <picture> (avif/webp/jpeg + srcset) for <img> usage.
async function imageShortcode(src, alt, sizes = "100vw", cls = "") {
  if (!alt) {
    throw new Error(`Missing alt text for image: ${src}`);
  }
  const metadata = await Image(resolveInput(src), {
    widths: [400, 800, 1200, 1600, null],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/images/optimized/",
    urlPath: "/images/optimized/",
    sharpJpegOptions: { quality: 78 },
    sharpWebpOptions: { quality: 75 },
    sharpAvifOptions: { quality: 55 },
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  if (cls) {
    imageAttributes.class = cls;
  }

  return Image.generateHTML(metadata, imageAttributes);
}

async function bgMetadata(src, width) {
  return Image(resolveInput(src), {
    widths: [width],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/images/optimized/",
    urlPath: "/images/optimized/",
    sharpJpegOptions: { quality: 72 },
    sharpWebpOptions: { quality: 68 },
    sharpAvifOptions: { quality: 48 },
  });
}

// Plain optimized jpeg url, for dropping into an existing url(...) reference
// (background shorthand, plain background-image, etc).
async function imageUrlShortcode(src, width = 1920) {
  const metadata = await bgMetadata(src, width);
  return metadata.jpeg[0].url;
}

// A trailing `background-image:image-set(...)` declaration with webp/avif,
// meant to be appended after an existing background/background-image
// declaration that already points at the plain jpeg fallback. Browsers that
// don't understand image-set() drop this declaration and keep the jpeg one,
// so no @supports block is needed.
async function imageSetShortcode(src, width = 1920) {
  const metadata = await bgMetadata(src, width);
  const jpeg = metadata.jpeg[0].url;
  const webp = metadata.webp[0].url;
  const avif = metadata.avif[0].url;
  // type() takes single OR double quotes — every real call site embeds this
  // string inside a double-quoted style="..." HTML attribute
  // (page-hero's style on index.njk/news.njk/blog/index.njk), so double
  // quotes here close that attribute early. The browser then silently
  // drops everything after the first "image/avif" — including the
  // background-size:cover/background-position:center declarations that
  // follow it in every one of those templates — and falls back to the
  // browser default (background-size:auto + background-repeat:repeat),
  // visibly TILING the hero image instead of covering it. Single quotes
  // avoid the collision without changing anything CSS actually reads
  // differently.
  return `background-image:image-set(url(${avif}) type('image/avif') 1x,url(${webp}) type('image/webp') 1x,url(${jpeg}) type('image/jpeg') 1x)`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/videos": "videos" });
  eleventyConfig.addPassthroughCopy({ "src/preview.png": "preview.png" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/llms.txt": "llms.txt" });
  eleventyConfig.addPassthroughCopy({ "src/llms-full.txt": "llms-full.txt" });

  // Nunjucks' selectattr only supports its own built-in tests (no "equalto",
  // unlike Jinja2) — this is a plain, reliable lookup for site.json's
  // packages array from a page's own front-matter key.
  eleventyConfig.addNunjucksFilter("findByKey", (arr, key) =>
    (arr || []).find((item) => item.key === key)
  );

  // Picks `count` related posts for a "More from Chayce" widget using a
  // circular rotation from the current post's position in the (newest-first)
  // collection, rather than always the N oldest posts excluding self — that
  // naive approach meant the newest 1-2 posts almost never got featured on
  // anyone else's page, leaving them weakly internally linked.
  eleventyConfig.addNunjucksFilter("relatedPosts", (arr, currentUrl, count) => {
    const list = arr || [];
    const idx = list.findIndex((item) => item.url === currentUrl);
    if (idx === -1) return [];
    const related = [];
    for (let i = 1; related.length < count && i < list.length; i++) {
      related.push(list[(idx + i) % list.length]);
    }
    return related;
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("imageUrl", imageUrlShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("imageSet", imageSetShortcode);

  // This site had no date-formatting filter before the blog — every other
  // page's dates are hand-written strings ("June 2026" on /news/), never
  // computed from real front matter. Blog posts DO have a real ISO date
  // (renderBlogOutlineBody's `date: new Date().toISOString().slice(0,10)`),
  // so this exists to print that human-readably rather than as raw
  // "2026-09-17" text.
  // yyyy-MM-dd for sitemap.xml <lastmod> — Eleventy's page.date is a real JS
  // Date (front-matter `date` when set, otherwise the file's own mtime/ctime
  // fallback), never a fabricated value.
  eleventyConfig.addNunjucksFilter("isoDate", (date) => {
    const d = date instanceof Date ? date : new Date(date);
    return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
  });

  eleventyConfig.addNunjucksFilter("readableDate", (dateStr) => {
    const d = new Date(dateStr);
    return Number.isNaN(d.getTime())
      ? dateStr
      : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  // A real, computed number from the post's own rendered body — never a
  // fabricated/guessed figure — same ~200wpm estimate most publishing
  // platforms use.
  eleventyConfig.addNunjucksFilter("readTime", (html) => {
    const words = String(html || "").replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  // Newest-first, same convention every other Eleventy blog collection on
  // this platform uses (see zunkireelabs-web's own addCollection) — the
  // "blog" tag comes from src/blog/blog.json's directory data, not from any
  // individual post's own front matter, so a generated post never needs to
  // remember to add it itself.
  eleventyConfig.addCollection("blog", (collectionApi) =>
    collectionApi.getFilteredByTag("blog").sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
