import type { AzureBlobConfig, StrapiConfigInput } from '../types';
import { trimParam } from './trimParam';

const BUFFER_SIZE = 4 * 1024 * 1024; // 4MB
const MAX_BUFFERS = 20;

export function makeAzureSetupConfig(strapiInputConfig: StrapiConfigInput): AzureBlobConfig {
	return {
		...strapiInputConfig,
		containerName: trimParam(strapiInputConfig.containerName),
		account: trimParam(strapiInputConfig.account),
		accountKey: trimParam(strapiInputConfig.accountKey),
		createContainerIfNotExists:
			strapiInputConfig.createContainerIfNotExists === undefined
				? true
				: strapiInputConfig.createContainerIfNotExists,
		defaultPath: trimParam(strapiInputConfig.defaultPath),
		cdnBaseURL:
			trimParam(strapiInputConfig.cdnBaseURL) ||
			`https://${trimParam(strapiInputConfig.account)}.blob.core.windows.net`,
		serviceBaseURL:
			trimParam(strapiInputConfig.serviceBaseURL) ||
			`https://${trimParam(strapiInputConfig.account)}.blob.core.windows.net`,
		uploadOptions: {
			bufferSize: strapiInputConfig.uploadOptions?.bufferSize || BUFFER_SIZE,
			maxConcurrency: strapiInputConfig.uploadOptions?.maxConcurrency || MAX_BUFFERS
		},
		blobLinkExpirationTime: 3
	};
}
