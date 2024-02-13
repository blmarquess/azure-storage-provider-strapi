[![Publish to NPM](https://github.com/blmarquess/azure-storage-provider-strapi/actions/workflows/publish.yml/badge.svg?branch=main&event=push)](https://github.com/blmarquess/azure-storage-provider-strapi/actions/workflows/publish.yml)
[![Application Tests](https://github.com/blmarquess/azure-storage-provider-strapi/actions/workflows/tests.yml/badge.svg?branch=main&event=push)](https://github.com/blmarquess/azure-storage-provider-strapi/actions/workflows/tests.yml)

# Azure Storage Provider for Strapi

This is a Strapi provider for Azure Storage, allowing you to utilize Azure Blob Storage for your Strapi media uploads.

In this library, we leverage the `@azure/storage-blob` package to interact with Azure Blob Storage and implement the `strapi-provider-upload` interface. With this provider, you can seamlessly upload, delete, and retrieve the URL of files from Azure Blob Storage, whether stored publicly or privately.

## Features

- **Provider Instance**: Obtain the provider instance for Azure Blob Storage.
- **Upload**: Easily upload files to Azure Blob Storage.
- **Delete**: Effortlessly delete files from Azure Blob Storage.
- **Get URL**: Retrieve the URL of files stored in Azure Blob Storage.
- **Get Signed URLs**: Access signed URLs for files stored in Azure Blob Storage, particularly useful for private storage scenarios.

## Installation

```bash
# using yarn
yarn add azure-storage-provider-strapi

# using npm
npm install azure-storage-provider-strapi --save
```

## Configuration

> /config/plugin.ts

```js
module.exports = ({ env }) => ({
// ...
  upload: {
    config: {
      provider: "azure-storage-provider-strapi",
      providerOptions: {
        account: env("STORAGE_ACCOUNT"),
        accountKey: env("STORAGE_ACCOUNT_KEY"),
        sasToken: env("STORAGE_ACCOUNT_SAS_TOKEN"),
        serviceBaseURL: env("STORAGE_URL"),
        cdnBaseURL: env("STORAGE_CDN_URL"),
        containerName: env("STORAGE_CONTAINER_NAME", "myPrivateContainer"),
        defaultPath: env("STORAGE_DEFAULT_PATH","assets"),
        createContainerIfNotExists: ('STORAGE_CREATE_CONTAINER_NOT_EXISTES' ,false),
        blobLinkExpirationTime: env("STORAGE_SIGNED_URL_EXPIRES_TIME", 24),
        uploadOptions: {
          bufferSize: env("STORAGE_BUFFER_SIZE"),
          maxConcurrency: env("STORAGE_MAX_CONCURRENCY", 10),
        },
      },
    },
  },
  // ...
});
```

> /config/middlewares.ts

```js
export default [
  // ...,
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://market-assets.strapi.io",
            /**
             * Note: If using a STORAGE_URL replace `https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net` w/ process.env.STORAGE_URL
             * If using a CDN URL make sure to include that url in the CSP headers process.env.STORAGE_CDN_URL
             */
            `https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net`,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            `https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
// ...
];
```

## Environments
  
  ```bash
  STORAGE_ACCOUNT=your_storage_account <"without .blob.core.windows.net">
  STORAGE_ACCOUNT_KEY=your_storage_account_key
  STORAGE_ACCOUNT_SAS_TOKEN=your_storage_account_sas_token
  STORAGE_URL=your_storage_url <"without .blob.core.windows.net">
  STORAGE_CDN_URL=your_cdn_url <"optional">
  STORAGE_CONTAINER_NAME=your_container_name
  STORAGE_DEFAULT_PATH=your_default_path <"default assets">
  STORAGE_SIGNED_URL_EXPIRES_TIME=your_signed_url_expires_time  <"default 1">
  STORAGE_BUFFER_SIZE=your_buffer_size <"default (4*1024*1024)4mb">
  STORAGE_MAX_CONCURRENCY=your_max_concurrency <"default 20">
  STORAGE_CREATE_CONTAINER_NOT_EXISTES=boolean_if_create_container_not_exists <"default false">
  ```
