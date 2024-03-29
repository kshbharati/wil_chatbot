/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    images: {
        domains: [
          "thumbs.dreamstime.com",
          "cdn.pixabay.com"
        ],
    },
    // api:{
    //   bodyParser:false
    // }
};

module.exports = nextConfig
