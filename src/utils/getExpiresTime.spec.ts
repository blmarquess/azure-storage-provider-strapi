import assert from 'node:assert';
import { describe, it } from 'node:test';
import { AzureBlobConfig } from '../types';
import { getExpiresTime } from './getExpiresTime';

describe('test getExpiresTime', () => {
	it('should is possible to generate a time with an hour difference', () => {
		const [getHour, getHourMin] = getExpiresTime({
			blobLinkExpirationTime: 1
		} as AzureBlobConfig)
			.toLocaleTimeString()
			.split(':');
		const nextHour = new Date(Date.now() + 1 * 60 * 60 * 1000);
		const [afterOneHour, afterOneHourMin] = nextHour.toLocaleTimeString().split(':');

		assert.strictEqual(getHour, afterOneHour);
		assert.strictEqual(getHourMin, afterOneHourMin);
	});
});
