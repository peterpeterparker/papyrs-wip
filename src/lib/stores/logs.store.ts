import { writable } from 'svelte/store';

export interface Log {
	msg: string;
	level: 'info' | 'error';
	duration?: number;
}

export const logs = writable<Log[]>([]);
