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
  return `background-image:image-set(url(${avif}) type("image/avif") 1x,url(${webp}) type("image/webp") 1x,url(${jpeg}) type("image/jpeg") 1x)`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/videos": "videos" });
  eleventyConfig.addPassthroughCopy({ "src/preview.png": "preview.png" });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("imageUrl", imageUrlShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("imageSet", imageSetShortcode);

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
