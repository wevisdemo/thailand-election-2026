import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	output: 'export',
	basePath: '/promisedeconstructed',
	images: {
		unoptimized: true,
		remotePatterns: [
			new URL(
				'https://politigraph.wevis.info/assets/organizations/political-parties/**',
			),
		],
	},
};

export default nextConfig;
