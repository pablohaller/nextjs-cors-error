/** @type {import('next').NextConfig} */
module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/(.*)", // TODO: check if still working with /api/:path* option (previous version)
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:5173", // TODO: load from env
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Same-Site",
            value: "none",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Origin, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};
