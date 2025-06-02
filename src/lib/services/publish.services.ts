import { i18n } from '$lib/stores/i18n.store';
import { toasts } from '$lib/stores/toasts.store';
import type { PublishData } from '$lib/types/publish';
import { get } from 'svelte/store';

export const publish = async (
	data: PublishData
): Promise<{ result: 'success' } | { result: 'error'; err: unknown }> => {
	try {
		await Promise.all([updateMetadata(), uploadHtml()]);

		return { result: 'success' };
	} catch (err: unknown) {
		toasts.error({
			msg: { text: get(i18n).publish_edit.errors.publish_failed },
			err
		});

		return { result: 'error', err };
	}
};

const updateMetadata = async () => {};

const uploadHtml = async () => {};
