import { BlobServiceClient } from '@azure/storage-blob';
import type { BlobUploadCommonResponse } from '@azure/storage-blob';
import type { AzureBlobConfig, StrapiFile } from '../types';
import { getFileName } from '../utils';

export async function handleUpload(
	config: AzureBlobConfig,
	blobSvcClient: BlobServiceClient,
	file: StrapiFile
): Promise<BlobUploadCommonResponse> {
	try {
		const containerClient = blobSvcClient.getContainerClient(config.containerName);
		const filename = getFileName(config, file);
		const client = containerClient.getBlockBlobClient(filename);
		const options = {
			blobHTTPHeaders: { blobContentType: file.mime }
		};

		file.url = config.cdnBaseURL
			? client.url.replace(config?.serviceBaseURL, config?.cdnBaseURL)
			: client.url;
		const bufferSize = config.uploadOptions?.bufferSize; // 4MB
		const maxConcurrency = config.uploadOptions?.maxConcurrency;
		const blobResponse = await client.uploadStream(
			file.stream,
			bufferSize,
			maxConcurrency,
			options
		);
		return blobResponse;
	} catch (err) {
		console.error(err);
		throw err;
	}
}
