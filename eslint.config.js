import { default as svelteConfig } from '@dfinity/eslint-config-oisy-wallet/svelte';
import { default as vitestConfig } from '@dfinity/eslint-config-oisy-wallet/vitest';

export default [
	...vitestConfig,
	...svelteConfig,
	{
		rules: {
			'local-rules/use-option-type-wrapper': ['off']
		}
	},
	{
		rules: {
			// TODO: re-enable this rule when it includes `expect` statements nested in callable functions.
			'vitest/expect-expect': ['off']
		}
	},
	{
		ignores: [
			'**/.DS_Store',
			'**/node_modules',
			'build',
			'.svelte-kit',
			'package',
			'**/.env',
			'**/.env.*',
			'!**/.env.example',
			'**/pnpm-lock.yaml',
			'**/package-lock.json',
			'**/yarn.lock',
			'**/playwright-report',
			'**/coverage',
			'target/**/*',
			'tmp/**/*'
		]
	}
];
