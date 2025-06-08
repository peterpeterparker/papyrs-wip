import { syncStore } from '$lib/stores/sync.store';
import type {
	PostMessage,
	PostMessageDataRequest,
	PostMessageDataResponse
} from '$lib/types/post-message';

export interface ProposalWorker {
	start: (data: PostMessageDataRequest) => void;
	stop: () => void;
}

export const initWorker = async (): Promise<ProposalWorker> => {
	const ProposalsWorker = await import('$lib/workers/worker?worker');
	const worker: Worker = new ProposalsWorker.default();

	worker.onmessage = ({ data }: MessageEvent<PostMessage<PostMessageDataResponse>>) => {
		const { msg } = data;

		switch (msg) {
			case 'busy':
				syncStore.busy((data.data as PostMessageDataResponse).workerId);
				return;
			case 'idle':
				syncStore.idle((data.data as PostMessageDataResponse).workerId);
				return;
			case 'error':
				syncStore.error((data.data as PostMessageDataResponse).workerId);
				return;
		}
	};

	return {
		start: ({ user, ...rest }: PostMessageDataRequest) => {
			worker.postMessage({
				msg: 'start',
				data: {
					user,
					...rest
				}
			});
		},
		stop: () =>
			worker.postMessage({
				msg: 'stop'
			})
	};
};
