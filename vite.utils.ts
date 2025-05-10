import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { UserConfig } from 'vite';

export const defineViteReplacements = (): {
	VITE_APP_VERSION: string;
} => {
	const file = fileURLToPath(new URL('package.json', import.meta.url));
	const json = readFileSync(file, 'utf8');
	const { version } = JSON.parse(json);

	return {
		VITE_APP_VERSION: JSON.stringify(version)
	};
};

export const CSS_CONFIG_OPTIONS: Pick<UserConfig, 'css'> = {
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler'
			}
		}
	}
};
