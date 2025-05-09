import { browser } from '$app/environment';
import type { Theme } from '$lib/types/theme';
import { set } from '$lib/utils/storage.utils';

export const applyTheme = (theme: Theme) => {
	if (!browser) {
		return;
	}

	const { documentElement, head } = document;

	documentElement.setAttribute('theme', theme);

	const color: string = getComputedStyle(documentElement).getPropertyValue('--color-theme');
	head.children.namedItem('theme-color')?.setAttribute('content', color.trim());

	set({ key: 'theme', value: theme });
};

export const themeColor = (): string => {
	const { documentElement } = document;
	return getComputedStyle(documentElement).getPropertyValue('--color-theme');
};
