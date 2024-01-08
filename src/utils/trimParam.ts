export function trimParam(input?: string) {
	return typeof input === 'string' ? input.trim() : '';
}
