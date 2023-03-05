/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = {
  target: "serverless",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // loader: 'imgix',
    // path: 'https://cloudflare-ipfs.com/ipfs/',
    domains: [
      "https://cloudflare-ipfs.com/ipfs/",
      "https://cloudflare-ipfs.com/",
      "https://cloudflare-ipfs.com",
      "cloudflare-ipfs.com",
    ],
  },
  async rewrites() {
    return [
      // Rewrite everything to `pages/index`
      {
        source: "/",
        destination: "/",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};
