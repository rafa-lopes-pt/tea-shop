import { Document, Filter, ObjectId, OptionalId, WithId } from "mongodb";

export type DatabaseFilters<dto> = Filter<WithId<dto>>;

export type DatabaseData<dto> = OptionalId<dto>;

export type DatabaseResponse<dto> = Promise<{
	data?: dto | null;
	error?: unknown;
	message?: string;
}>;
