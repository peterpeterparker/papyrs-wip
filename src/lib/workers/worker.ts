import type { PostMessage, PostMessageDataRequest } from '$lib/types/post-message';

onmessage = async ({ data: { msg, data } }: MessageEvent<PostMessage<PostMessageDataRequest>>) => {
	console.log(msg, data);

	// TODO:
};
