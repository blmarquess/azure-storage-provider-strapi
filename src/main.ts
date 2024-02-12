import {
	getSignedUrl,
	handleDelete,
	handleUpload,
	isPrivate,
	makeBlobServiceClient
} from './helpers';
import type { AzureBlobConfig, StrapiFile } from './types';
import { makeAzureSetupConfig } from './utils';

module.exports = {
	provider: 'azure',
	auth: {
		account: {
			label: 'Account name (required)',
			type: 'text'
		},
		accountKey: {
			label: 'Secret access key (required)',
			type: 'text'
		},
		serviceBaseURL: {
			label:
				'Base service URL to be used, optional. Defaults to https://${account}.blob.core.windows.net (optional)',
			type: 'text'
		},
		containerName: {
			label: 'Container name (required)',
			type: 'text'
		},
		defaultPath: {
			label: 'The path to use when there is none being specified (required)',
			type: 'text'
		},
		cdnBaseURL: {
			label: 'CDN base url (optional)',
			type: 'text'
		},
		createContainerIfNotExists: {
			label:
				"An option to create the container automatically if it doesn't exist. If this is false, the container must be created manually.",
			type: 'bool'
		},
		containerAccessType: {
			label:
				"One of 'private', 'container', or 'blob'. The container access type that will be used upon container creation. Not used if 'createContainerIfNotExists' is false. Defaults to private.",
			type: 'text'
		}
	},
	init: (config: AzureBlobConfig) => {
		const azureConfig = makeAzureSetupConfig(config);
		const blobSvcClient = makeBlobServiceClient(azureConfig);
		return {
			async upload(file: StrapiFile) {
				return await handleUpload(config, blobSvcClient, file);
			},
			async uploadStream(file: StrapiFile) {
				return await handleUpload(config, blobSvcClient, file);
			},
			async delete(file: StrapiFile) {
				return await handleDelete(config, blobSvcClient, file);
			},
			async getSignedUrl(file: StrapiFile) {
				return await getSignedUrl(config, blobSvcClient, file);
			},
			async isPrivate() {
				return await isPrivate(config, blobSvcClient);
			}
		};
	}
};
