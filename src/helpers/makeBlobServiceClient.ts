import { BlobServiceClient, StorageSharedKeyCredential, newPipeline } from '@azure/storage-blob';
import type { AzureBlobConfig } from '../types';

export function makeBlobServiceClient(config: AzureBlobConfig) {
	const credential = new StorageSharedKeyCredential(config.account, config.accountKey);
	const pipeline = newPipeline(credential);
	const blobServiceClient = new BlobServiceClient(config.serviceBaseURL, pipeline);
	if (config.createContainerIfNotExists) {
		const containerClient = blobServiceClient.getContainerClient(config.containerName);
		containerClient
			.createIfNotExists()
			.then((response) =>
				console.log(
					`container ${config.containerName} ${
						response.succeeded ? 'created successfully' : 'already existed'
					}`
				)
			);
	}
	return blobServiceClient;
}
