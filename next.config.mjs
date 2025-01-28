/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.squarespace-cdn.com",
          pathname: "/content/v1/**",
        },
      ],
    },
  };
  
  export default nextConfig;