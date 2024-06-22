import { Document, FindCursor, WithId } from "mongodb";
import MongoClientWrapper from "../database/MongoClientWrapper";
import { DatabaseResponse } from "../database/database.response.type";

export default abstract class Repository<dto> {
	protected client: MongoClientWrapper;

	constructor(client: MongoClientWrapper) {
		this.client = client;
	}

	abstract insert(data: dto): Promise<DatabaseResponse>;
	abstract find(filters: Partial<dto>): FindCursor<WithId<Document>>;
	abstract findOne(filters: Partial<dto>): Promise<WithId<Document> | null>;
	abstract has(filters: Partial<dto>): Promise<boolean>;
	abstract update(
		filters: Partial<dto>,
		data: dto
	): Promise<DatabaseResponse>;
	abstract delete(filters: Partial<dto>): Promise<DatabaseResponse>;
}
