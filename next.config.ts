import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '164.90.174.87',
                port: '',
                pathname: '/images/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
