import { BlobServiceClient } from '@azure/storage-blob';
import type { AzureBlobConfig } from '../types';

export async function isPrivate(
	config: AzureBlobConfig,
	blobSvcClient: BlobServiceClient
): Promise<boolean> {
	const container = blobSvcClient.getContainerClient(config.containerName);
	if (await container.exists()) {
		const properties = await container.getProperties();
		return properties.blobPublicAccess === undefined;
	}
	if (config.createContainerIfNotExists) {
		await container.createIfNotExists();
		return isPrivate(config, blobSvcClient);
	}
	throw new Error(
		`upload provider error : container ${config.containerName} does not exist. Either use createContainerIfNotExists or create the container manually in ${config.account} storage account.`
	);
}
