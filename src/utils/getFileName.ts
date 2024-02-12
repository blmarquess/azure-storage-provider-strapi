import type { AzureBlobConfig, StrapiFile } from '../types';
import { trimParam } from './trimParam';

export function getFileName(config: AzureBlobConfig, file: StrapiFile) {
	const { url } = file;
	if (url) {
		const fileName = url.replace(`${config.serviceBaseURL}/${config.containerName}/`, '');
		return `${trimParam(fileName)}`;
	}
	return `${trimParam(config.account)}/${file.hash}${file.ext}`;
}
