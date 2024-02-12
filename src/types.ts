import internal from 'stream';

export type AzureBlobConfig = {
	account: string;
	accountKey: string;
	serviceBaseURL: string;
	containerName: string;
	defaultPath: string;
	cdnBaseURL: string;
	createContainerIfNotExists: boolean;
	blobLinkExpirationTime: number;
	uploadOptions: {
		bufferSize: number;
		maxConcurrency: number;
	};
};

export type StrapiConfigInput = Partial<AzureBlobConfig>;

export type StrapiFile = File & {
	stream: internal.Readable;
	hash: string;
	url: string;
	ext: string;
	mime: string;
	path: string;
};
