export type OnImgToUploadResult =
	| {
			result: 'ok';
			url: string;
	  }
	| { result: 'error' };
