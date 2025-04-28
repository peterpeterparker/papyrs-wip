import { Theme } from '$lib/types/theme';
import { get } from '$lib/utils/storage.utils';
import { applyTheme } from '$lib/utils/theme.utils';
import { type Readable, writable } from 'svelte/store';

const initialTheme = get<Theme>({ key: 'theme' }) ?? Theme.PAPAYA_WHIP;
applyTheme(initialTheme);

export interface ThemeStore extends Readable<Theme> {
	select: (theme: Theme) => void;
}

export const initTheme = (): ThemeStore => {
	const { subscribe, set } = writable<Theme>(initialTheme);

	return {
		subscribe,

		select: (theme: Theme) => {
			applyTheme(theme);
			set(theme);
		}
	};
};

export const theme = initTheme();
