import assert from 'node:assert';
import { describe, it } from 'node:test';
import type { AzureBlobConfig, StrapiFile } from '../types';
import { getFileName } from './getFileName';

describe('Tests for GetFileName', () => {
	it('Should possible getting name of file from file without database', () => {
		const config = {
			serviceBaseURL: 'https://example.blob.core.windows.net/container',
			containerName: 'container',
			account: 'example'
		} as AzureBlobConfig;

		const file = {
			hash: 'hash123',
			ext: '.jpg'
		} as StrapiFile;
		assert.strictEqual(getFileName(config, file), 'example/hash123.jpg');
	});

	it('Should possible getting name of file from database params', () => {
		const config = {
			serviceBaseURL: 'https://example.blob.core.windows.net/container',
			containerName: 'container',
			account: 'example'
		} as AzureBlobConfig;

		const file = {
			url: 'https://example.blob.core.windows.net/container/path/to/file.jpg',
			hash: 'hash123',
			ext: '.jpg'
		} as StrapiFile;
		assert.strictEqual(
			getFileName(config, file),
			'https://example.blob.core.windows.net/container/path/to/file.jpg'
		);
	});
});
