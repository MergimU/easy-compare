/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [
      // Specify the url from which next should call external urls to prevent calling insecure ones.
      {
        protocol: 'https',
        hostname: 'daisyui.com',
        port: '',
        pathname: '/images/stock/**',
      },
    ],
  },
};

export default nextConfig;
