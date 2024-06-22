
export type DatabaseResponse<dto> = Promise<{
	data?: dto;
	error?: unknown;
	message?: string;
}>;
