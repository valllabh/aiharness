module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/css");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    pathPrefix: "/aiharness/"
  };
};
