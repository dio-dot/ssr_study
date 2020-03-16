const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
module.exports = withBundleAnalyzer({
  distDir: ".next",
  webpack(config) {
    console.log(config);
    const prod = process.env.NODE_ENV === "production";
    return {
      ...config,
      devtool: prod ? "hidden-source-map" : "eval",
      mode: prod ? "production" : "development"
    };
  }
});
