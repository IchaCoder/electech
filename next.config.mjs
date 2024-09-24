/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
          {
            key: "Allow-Control-Access-Credentials",
            value: "true",
          },
          {
            key: "Allow-Control-Access-Origin",
            value: "*",
          },
          // {
          //   key: "Content-Security-Policy",
          //   value: "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          // },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, Date, X-Api-Key",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
