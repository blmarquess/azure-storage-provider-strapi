import assert from 'node:assert';
import { describe, it } from 'node:test';
import { StrapiConfigInput } from '../types';
import { makeAzureSetupConfig } from './makeAzureSetupConfig';

describe('Test of MakeAzureSetUpConfig', () => {
	it('Should create a valid configuration with valid inputs', () => {
		const strapiInputConfig: StrapiConfigInput = {
			containerName: 'container',
			account: 'account',
			accountKey: 'accountKey',
			createContainerIfNotExists: true,
			defaultPath: 'defaultPath',
			cdnBaseURL: 'cdnBaseURL',
			serviceBaseURL: 'serviceBaseURL',
			uploadOptions: { bufferSize: 8192, maxConcurrency: 10 },
			blobLinkExpirationTime: 2
		};

		const result = makeAzureSetupConfig(strapiInputConfig);

		assert.deepEqual(result, {
			containerName: 'container',
			account: 'account',
			accountKey: 'accountKey',
			createContainerIfNotExists: true,
			defaultPath: 'defaultPath',
			cdnBaseURL: 'cdnBaseURL',
			serviceBaseURL: 'serviceBaseURL',
			uploadOptions: { bufferSize: 8192, maxConcurrency: 10 },
			blobLinkExpirationTime: 2
		});
	});

	it('Should throw an error for invalid inputs', () => {
		const inputWithoutContainerName: StrapiConfigInput = {
			containerName: '',
			account: 'account',
			accountKey: 'accountKey',
			createContainerIfNotExists: true,
			defaultPath: 'defaultPath',
			cdnBaseURL: 'cdnBaseURL',
			serviceBaseURL: 'serviceBaseURL',
			uploadOptions: { bufferSize: 4096, maxConcurrency: 10 },
			blobLinkExpirationTime: 2
		};
		assert.throws(() => makeAzureSetupConfig(inputWithoutContainerName), {
			name: 'ZodError'
		});
	});
});
