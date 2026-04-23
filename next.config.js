/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  experimental: {
    mdxRs: false,
  },
};

module.exports = nextConfig;
