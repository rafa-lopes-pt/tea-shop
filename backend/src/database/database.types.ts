import { Filter, OptionalId, WithId } from "mongodb";

export type DatabaseFilters<dto> = Filter<WithId<dto>>;

export type DatabaseData<dto> = OptionalId<dto>;

export type DatabaseResponse<dto> = Promise<{
	data?: OptionalId<dto> | null;
	error?: unknown;
	message?: string;
}>;
