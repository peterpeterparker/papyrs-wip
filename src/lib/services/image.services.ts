import { busy } from '$lib/stores/busy.store';
import { i18n } from '$lib/stores/i18n.store';
import { toasts } from '$lib/stores/toasts.store';
import type { OnImgToUploadResult } from '$lib/types/editor';
import { uploadFile } from '@junobuild/core';
import { get } from 'svelte/store';

export const onImgToUpload = async (file: File): Promise<OnImgToUploadResult> => {
	try {
		busy.start();

		const { downloadUrl: url } = await uploadFile({
			data: file,
			collection: 'images',
			token: window.crypto.randomUUID()
		});

		return { result: 'ok', url };
	} catch (err: unknown) {
		toasts.error({
			msg: { text: get(i18n).editor.errors.upload_image },
			err
		});

		return { result: 'error' };
	} finally {
		busy.stop();
	}
};
