// A particular busy state used in wizards

import { type Readable, writable } from 'svelte/store';

export interface WizardBusyData {
	metadata: boolean;
	content: boolean;
}

export interface BusyWizardStore extends Readable<WizardBusyData> {
	start: (id: keyof WizardBusyData) => void;
	stop: (id: keyof WizardBusyData) => void;
}

const initWizardBusyStore = (): BusyWizardStore => {
	const { subscribe, update } = writable<WizardBusyData>({
		metadata: false,
		content: false
	});

	return {
		subscribe,

		start(id: keyof WizardBusyData) {
			update((state) => ({ ...state, [id]: true }));
		},

		stop(id: keyof WizardBusyData) {
			update((state) => ({ ...state, [id]: false }));
		}
	};
};

export const wizardBusy = initWizardBusyStore();
