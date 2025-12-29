import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
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
	extras: {
		enableImportInjection: true,
	},
	outputTargets: [
		{
			type: 'dist',
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
		reactOutputTarget({
			outDir: '.tmp/react',
			stencilPackageName: '../..',
		}),
		vueOutputTarget({
			componentCorePackage: '../..',
			proxiesFile: '.tmp/vue/components.ts',
		}),
	],
};
