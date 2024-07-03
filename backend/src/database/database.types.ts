import { OptionalId, WithId } from "mongodb";

export type DatabaseFilters<dto> = Partial<WithId<dto>>;

export type DatabaseData<dto> = OptionalId<dto>;

export type DatabaseResponse<dto> = Promise<{
	data?: dto;
	error?: unknown;
	message?: string;
}>;
