import { z } from 'zod';
import type { AzureBlobConfig, StrapiConfigInput } from '../types';
import { trimParam } from './trimParam';

const DEFAULT_BUFFER_SIZE = 4 * 1024 * 1024; // 4MB
const DEFAULT_MAX_CONCURRENCY = 20; //
const DEFAULT_EXPIRATION_TIME = 1; // 1 hour

const AzureBlobConfigSchema = z.object({
	containerName: z.string().min(1),
	account: z.string().min(1),
	accountKey: z.string().min(1),
	createContainerIfNotExists: z.boolean(),
	defaultPath: z.string(),
	cdnBaseURL: z.string().optional(),
	serviceBaseURL: z.string().optional(),
	uploadOptions: z
		.object({
			bufferSize: z.number().optional(),
			maxConcurrency: z.number().optional()
		})
		.optional(),
	blobLinkExpirationTime: z.number().min(1).optional()
});

function validateInputs(inputs: StrapiConfigInput) {
	const validate = AzureBlobConfigSchema.safeParse(inputs);
	if (validate.success) {
		return validate.data;
	}
	throw validate.error;
}

export function makeAzureSetupConfig(strapiInputConfig: StrapiConfigInput): AzureBlobConfig {
	const validatedInputs = validateInputs(strapiInputConfig);
	return {
		...validatedInputs,
		containerName: trimParam(validatedInputs.containerName),
		account: trimParam(validatedInputs.account),
		accountKey: trimParam(validatedInputs.accountKey),
		createContainerIfNotExists: Boolean(validatedInputs.createContainerIfNotExists),
		defaultPath: trimParam(validatedInputs.defaultPath),
		cdnBaseURL:
			trimParam(validatedInputs.cdnBaseURL) ||
			`https://${trimParam(validatedInputs.account)}.blob.core.windows.net`,
		serviceBaseURL:
			trimParam(validatedInputs.serviceBaseURL) ||
			`https://${trimParam(validatedInputs.account)}.blob.core.windows.net`,
		uploadOptions: {
			bufferSize: validatedInputs.uploadOptions?.bufferSize || DEFAULT_BUFFER_SIZE,
			maxConcurrency: validatedInputs.uploadOptions?.maxConcurrency || DEFAULT_MAX_CONCURRENCY
		},
		blobLinkExpirationTime:
			Number(validatedInputs.blobLinkExpirationTime) || DEFAULT_EXPIRATION_TIME
	};
}
