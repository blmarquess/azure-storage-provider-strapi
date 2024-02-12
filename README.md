[![.github/workflows/publish.yml](https://github.com/blmarquess/azure-storage-provider-strapi/actions/workflows/publish.yml/badge.svg)](https://github.com/blmarquess/azure-storage-provider-strapi/actions/workflows/publish.yml)

[![Application Tests](https://github.com/blmarquess/azure-storage-provider-strapi/actions/workflows/tests.yml/badge.svg)](https://github.com/blmarquess/azure-storage-provider-strapi/actions/workflows/tests.yml)

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
        containerName: env("STORAGE_CONTAINER_NAME", "myPrivateContainer"),
        defaultPath: "assets",
        createContainerIfNotExists: false,
        blobLinkExpirationTime: env("STORAGE_SIGNED_URL_EXPIRES_TIME", 24), // time of expiration sign urls in hours
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
