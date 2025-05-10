import type { ToastLevel, ToastMsg } from '$lib/types/toast';
import { errorDetailToString } from '$lib/utils/error.utils';
import { nonNullish } from '@dfinity/utils';
import { type Readable, writable } from 'svelte/store';

export interface ToastsStore extends Readable<ToastMsg[]> {
	error: (params: { text: string; detail?: unknown }) => void;
	show: (msg: ToastMsg) => void;
	warn: (text: string) => void;
	success: (params: { text: string; color?: 'primary' | 'secondary' | 'tertiary' }) => void;
	hide: () => void;
	reset: (levels?: ToastLevel[]) => void;
	clean: () => void;
}

const initToastsStore = (): ToastsStore => {
	const { subscribe, update, set } = writable<ToastMsg[]>([]);

	return {
		subscribe,

		error({ text, detail }) {
			console.error(text, detail);
			update((messages: ToastMsg[]) => [
				...messages,
				{ text, level: 'error', detail: errorDetailToString(detail) }
			]);
		},

		show(msg) {
			update((messages: ToastMsg[]) => [...messages, msg]);
		},

		warn(text) {
			this.show({
				text,
				level: 'warn',
				duration: 2000
			});
		},

		success(toast) {
			this.show({
				...toast,
				level: 'info',
				duration: 2000
			});
		},

		hide() {
			update((messages: ToastMsg[]) => messages.slice(1));
		},

		reset(levels) {
			if (nonNullish(levels) && levels.length > 0) {
				update((messages: ToastMsg[]) => messages.filter(({ level }) => !levels.includes(level)));
				return;
			}

			set([]);
		},

		clean() {
			this.reset(['info', 'warn', 'info']);
		}
	};
};

export const toasts = initToastsStore();
