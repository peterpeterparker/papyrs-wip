import type { OnSetDocContext } from '@junobuild/functions';
import { decodeDocData } from '@junobuild/functions/sdk';
import type { PostMetadata } from '../lib/types/juno';

export const createOrUpdatePost = async (context: OnSetDocContext) => {
	const data = decodeDocData<PostMetadata>(context.data.data.after.data);

	console.log("----> Post data:", data);
}