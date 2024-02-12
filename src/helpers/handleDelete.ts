import { BlobServiceClient } from '@azure/storage-blob';
import type { BlobDeleteIfExistsResponse } from '@azure/storage-blob';
import type { AzureBlobConfig, StrapiFile } from '../types';
import { getFileName } from '../utils';

export async function handleDelete(
	config: AzureBlobConfig,
	blobSvcClient: BlobServiceClient,
	file: StrapiFile
): Promise<BlobDeleteIfExistsResponse> {
	const containerClient = blobSvcClient.getContainerClient(config.containerName);
	const client = containerClient.getBlobClient(getFileName(config, file));
	return await client.deleteIfExists();
}
