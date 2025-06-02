import type { Html } from '$lib/types/core';
import type { PostKey } from '$lib/types/juno';

// TODO: PostMetadataSchema => required fields
// TODO: union with key
export interface PublishData {
	key: PostKey;
	title: string;
	description: string;
	slug: string;
	html: Html;
}
