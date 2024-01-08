import { BlobServiceClient } from '@azure/storage-blob';
import type { AzureBlobConfig, StrapiFile } from '../types';
import { getFileName } from '../utils';

export async function handleDelete(
	config: AzureBlobConfig,
	blobSvcClient: BlobServiceClient,
	file: StrapiFile
): Promise<void> {
	const containerClient = blobSvcClient.getContainerClient(config.containerName);

	const client = containerClient.getBlobClient(getFileName(config.defaultPath, file));
	await client.deleteIfExists();
	file.url = client.url;
}
