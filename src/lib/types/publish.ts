import type { Html } from '$lib/types/core';

export interface PublishData {
	title: string;
	description: string;
	slug: string;
	html: Html;
}
