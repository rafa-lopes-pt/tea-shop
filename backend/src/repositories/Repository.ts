import { ObjectId, WithoutId } from "mongodb";
import MongoClientWrapper from "../database/MongoClientWrapper";
import {
	DatabaseData,
	DatabaseFilters,
	DatabaseResponse,
} from "../database/database.types";

export default class Repository<dto> {
	protected client: MongoClientWrapper;
	protected database: string;
	protected collection: string;

	constructor(
		client: MongoClientWrapper,
		database: string,
		collection: string
	) {
		this.client = client;
		this.database = database;
		this.collection = collection;
	}
	insert(data: DatabaseData<dto>): DatabaseResponse<string | ObjectId> {
		return this.client.insertOne(this.database, this.collection, data);
	}
	find(filters: DatabaseFilters<dto>) {
		return this.client.find(this.database, this.collection, filters);
	}
	findOne(filters: DatabaseFilters<dto>) {
		return this.client.findOne(this.database, this.collection, filters);
	}
	has(filters: DatabaseFilters<dto>) {
		return this.client.has(this.database, this.collection, filters);
	}
	update(
		filters: DatabaseFilters<dto>,
		data: Partial<WithoutId<DatabaseData<dto>>>
	) {
		return this.client.updateOne(
			this.database,
			this.collection,
			filters,
			data
		);
	}
	delete(filters: DatabaseFilters<dto>) {
		return this.client.deleteOne(this.database, this.collection, filters);
	}
}
