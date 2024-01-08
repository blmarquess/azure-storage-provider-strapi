import { BlobServiceClient } from '@azure/storage-blob';
import type { AzureBlobConfig, StrapiFile } from '../types';
import { getFileName } from '../utils';

export async function handleUpload(
	config: AzureBlobConfig,
	blobSvcClient: BlobServiceClient,
	file: StrapiFile
): Promise<void> {
	const containerClient = blobSvcClient.getContainerClient(config.containerName);
	const filename = getFileName(config.defaultPath, file);
	const client = containerClient.getBlockBlobClient(filename);
	const options = {
		blobHTTPHeaders: { blobContentType: file.mime }
	};

	file.url = config.cdnBaseURL
		? client.url.replace(config?.serviceBaseURL, config?.cdnBaseURL)
		: client.url;
	const bufferSize = config.uploadOptions?.bufferSize; // 4MB
	const maxConcurrency = config.uploadOptions?.maxConcurrency;
	await client.uploadStream(file.stream, bufferSize, maxConcurrency, options);
}
