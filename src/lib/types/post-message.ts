import type { SyncStoreData } from '$lib/stores/sync.store';
import type { SyncState } from '$lib/types/sync';
import type { UserOption } from '$lib/types/user';
import type { Environment } from '@junobuild/core';

export type PostMessageDataRequest = {
	user: UserOption;
	container: string | null | undefined;
} & Pick<Environment, 'satelliteId'>;

export interface PostMessageDataResponse {
	workerId: keyof SyncStoreData;
}

export type PostMessageRequest = 'start' | 'stop';
export type PostMessageResponse = SyncState;

export interface PostMessage<T extends PostMessageDataRequest | PostMessageDataResponse> {
	msg: PostMessageRequest | PostMessageResponse;
	data?: T;
}
