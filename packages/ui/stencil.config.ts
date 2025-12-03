import { Config } from '@stencil/core';
import { vueOutputTarget } from '@stencil/vue-output-target';
import tailwind, { tailwindHMR } from 'stencil-tailwind-plugin';

const tailwindConfig = {
	tailwindCssPath: 'src/styles/tailwind.css',
};

export const config: Config = {
	namespace: 'election',
	plugins: [tailwind(tailwindConfig), tailwindHMR(tailwindConfig)],
	devServer: {
		reloadStrategy: 'pageReload',
	},
	outputTargets: [
		{
			type: 'dist',
			esmLoaderPath: '../loader',
		},
		{
			type: 'dist-custom-elements',
			customElementsExportBehavior: 'auto-define-custom-elements',
			externalRuntime: false,
		},
		{
			type: 'www',
			serviceWorker: null,
		},
		vueOutputTarget({
			componentCorePackage: '../../',
			proxiesFile: '.tmp/vue/components.ts',
		}),
	],
};
