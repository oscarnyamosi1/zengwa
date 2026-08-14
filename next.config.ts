import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
    ],
  },
};

module.exports = nextConfig;