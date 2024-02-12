import assert from 'node:assert';
import { describe, it } from 'node:test';
import { trimParam } from './trimParam';

describe('Test of TrimFunction', () => {
	it('Should clean string to without blank spaces', () => {
		assert.strictEqual(trimParam('  example  '), 'example');
		assert.strictEqual(trimParam('  example  Exemplo'), 'example  Exemplo');
		assert.strictEqual(trimParam(''), '');
	});
});
