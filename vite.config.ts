import juno from '@junobuild/vite-plugin';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { defineViteReplacements } from './vite.utils';

export default defineConfig({
	plugins: [sveltekit(), juno()],
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			},
			plugins: [
				{
					name: 'fix-node-globals-polyfill',
					// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
					setup(build) {
						build.onResolve({ filter: /_virtual-process-polyfill_\.js/ }, ({ path }) => ({ path }));
					}
				}
			]
		}
	},
	define: {
		...defineViteReplacements()
	},
	worker: {
		plugins: () => [sveltekit()],
		format: 'es'
	},
});
