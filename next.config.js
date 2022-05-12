/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['os.alipayobjects.com'],
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/',
        permanent: true,
      },
      {
        source: '/dashboard/manager',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
