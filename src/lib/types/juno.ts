import type { Markdown } from '$lib/types/core';
import type { Asset } from '@junobuild/core';
import { z } from 'zod';

export const PostKeySchema = z.string();

export type PostKey = z.infer<typeof PostKeySchema>;

export const PostMetadataSchema = z.object({
	title: z.string().optional()
});

export type PostMetadata = z.infer<typeof PostMetadataSchema>;

export type PostContent = Markdown;

export type PostAsset = Pick<Asset, 'fullPath' | 'token'> & {
	file: Blob;
};
