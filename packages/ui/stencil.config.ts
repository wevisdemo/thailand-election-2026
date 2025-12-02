import { Config } from '@stencil/core';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
	namespace: 'election',
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
			type: 'docs-readme',
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
