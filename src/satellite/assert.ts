import type { AssertSetDocContext } from '@junobuild/functions';
import { decodeDocData } from '@junobuild/functions/sdk';
import { PostMetadataSchema, type PostMetadata } from '../lib/types/post';

export const assertPost = (context: AssertSetDocContext) => {
	const data = decodeDocData<PostMetadata>(context.data.data.proposed.data);
	PostMetadataSchema.parse(data);
};
