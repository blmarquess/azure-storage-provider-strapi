import { BlobSASPermissions, BlobServiceClient } from "@azure/storage-blob";
import type { AzureBlobConfig, StrapiFile } from "../types";
import { getFileName } from "../utils";

export async function getSignedUrl(
  config: AzureBlobConfig,
  blobSvcClient: BlobServiceClient,
  file: StrapiFile
): Promise<{ url: string }> {
  const containerClient = blobSvcClient.getContainerClient(
    config.containerName
  );
  const client = containerClient.getBlobClient(
    getFileName(config.defaultPath, file)
  );
  const expiresOn = new Date();
  expiresOn.setTime(expiresOn.getTime() + 1000 * 60 * 60);

  // we can generate the sas url directly here because this getSignedUrl function won't be called by strapi if the container is not private.
  // see isPrivate() implementation and https://github.com/strapi/strapi/blob/4f63cb517f3c24b670a94c37d4fbe3ed2d2cb89b/packages/core/upload/server/services/file.js#L29
  const url = await client.generateSasUrl({
    permissions: BlobSASPermissions.from({
      read: true,
      write: false,
      delete: false,
      add: false,
      create: false,
      execute: false,
      deleteVersion: false,
      move: false,
      tag: false,
      permanentDelete: false,
      setImmutabilityPolicy: false,
    }),
    expiresOn,
  });
  return { url };
}
