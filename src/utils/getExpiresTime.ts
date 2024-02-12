import { AzureBlobConfig } from '../types';

export function getExpiresTime(config: AzureBlobConfig): Date {
	const expiresTimes = config.blobLinkExpirationTime;
	const expiresOn = new Date();
	expiresOn.setHours(expiresOn.getHours() + expiresTimes);
	return expiresOn;
}
