import { FindCursor, ObjectId, WithId } from "mongodb";
import MongoClientWrapper from "../database/MongoClientWrapper";
import { DatabaseResponse } from "../database/database.response.type";

export default abstract class Repository<dto> {
	protected client: MongoClientWrapper;

	constructor(client: MongoClientWrapper) {
		this.client = client;
	}
	abstract insert(data: dto): DatabaseResponse<ObjectId>;
	abstract find(
		filters: Partial<dto>
	): DatabaseResponse<FindCursor<WithId<dto>>>;
	abstract findOne(filters: Partial<dto>): DatabaseResponse<dto | null>;
	abstract has(filters: Partial<dto>): DatabaseResponse<boolean>;
	abstract update(filters: Partial<dto>, data: dto): DatabaseResponse<dto>;
	abstract delete(filters: Partial<dto>): DatabaseResponse<boolean>;
}
