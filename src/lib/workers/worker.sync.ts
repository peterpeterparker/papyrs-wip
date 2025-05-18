import type { PostMessageDataRequest } from '$lib/types/post-message';
import { isNullish, nonNullish } from '@dfinity/utils';
import { unsafeIdentity, type SatelliteOptions } from '@junobuild/core';

export interface WorkerSyncParams {
	satellite: SatelliteOptions;
}

export class WorkerSync {
	#inProgress = false;
	#lastChangeProcessed: number | undefined = undefined;

	readonly #workerId: string;

	private readonly getLastChange: () => Promise<number | undefined>;
	private readonly getLastJob: () => Promise<number | undefined>;
	private readonly syncData: (params: WorkerSyncParams) => Promise<void>;

	#timer: NodeJS.Timeout | undefined = undefined;

	constructor({
		workerId,
		getLastChange,
		getLastJob,
		syncData
	}: {
		workerId: string;
		getLastChange: () => Promise<number | undefined>;
		getLastJob: () => Promise<number | undefined>;
		syncData: (params: WorkerSyncParams) => Promise<void>;
	}) {
		this.#workerId = workerId;

		this.getLastChange = getLastChange;
		this.getLastJob = getLastJob;
		this.syncData = syncData;
	}

	// eslint-disable-next-line require-await
	async stopTimer() {
		if (isNullish(this.#timer)) {
			return;
		}

		clearInterval(this.#timer);
		this.#timer = undefined;
	}

	async startTimer(data: PostMessageDataRequest | undefined) {
		// Avoid re-starting the timer
		if (nonNullish(this.#timer)) {
			return;
		}

		if (isNullish(data)) {
			// We do nothing if no user
			console.error('Attempted to initiate a worker without a user and satellite information.');
			return;
		}

		const execute = async () => await this.sync(data);

		// We starts now but also schedule the update after wards
		await execute();

		this.#timer = setInterval(execute, 1000);
	}

	private async sync(data: PostMessageDataRequest) {
		if (this.#inProgress) {
			// Already in progress
			return;
		}

		const lastChange = await this.getLastChange();

		if (isNullish(lastChange)) {
			// There weren't any changes
			return;
		}

		if (isNullish(this.#lastChangeProcessed)) {
			// Avoid unnecessary save if user reload screen and last changes were already processed
			this.#lastChangeProcessed = await this.getLastJob();
		}

		if (nonNullish(this.#lastChangeProcessed) && lastChange <= this.#lastChangeProcessed) {
			// No new changes
			return;
		}

		this.#inProgress = true;

		postMessage({
			msg: 'busy',
			data: {
				workerId: this.#workerId
			}
		});

		try {
			const { container, ...rest } = data;

			const satellite = {
				identity: await unsafeIdentity(),
				...rest,
				...(nonNullish(container) && { container })
			};

			await this.syncData({
				satellite
			});

			// Save timestamp to skip further changes if no changes
			this.#lastChangeProcessed = lastChange;

			postMessage({
				msg: 'idle',
				data: {
					workerId: this.#workerId
				}
			});
		} catch (err: unknown) {
			console.error(err);

			// In case of error we stop the sync
			await this.stopTimer();

			postMessage({
				msg: 'error',
				data: {
					workerId: this.#workerId
				}
			});
		}

		this.#inProgress = false;
	}
}
