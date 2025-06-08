import { HtmlSchema } from '$lib/types/core';
import { PostKeySchema, PostMetadataSchema } from '$lib/types/juno';
import type { z } from 'zod';

export const PublishDataSchema = PostMetadataSchema.required().extend({
	key: PostKeySchema,
	html: HtmlSchema
});

export type PublishData = z.infer<typeof PublishDataSchema>;
