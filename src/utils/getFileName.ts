import type { StrapiFile } from '../types';
import { trimParam } from './trimParam';

export function getFileName(path: string, file: StrapiFile) {
	return `${trimParam(path)}/${file.hash}${file.ext}`;
}
