import Repository from "./Repository";
import { DbUserSchemaType } from "./DbUser.type";
import dbClient from "../database/DatabaseClient";

const USERS_DATABASE = "users";
const USERS_COLLECTION = "users_list";

class UserRepo extends Repository<DbUserSchemaType> {
	insert(data: DbUserSchemaType & { password: string }) {
		return this.client.insertOne(USERS_DATABASE, USERS_COLLECTION, data);
	}

	find(filters: Partial<DbUserSchemaType>) {
		return this.client.find(USERS_DATABASE, USERS_COLLECTION, filters);
	}

	findOne(filters: Partial<DbUserSchemaType>) {
		return this.client.findOne(USERS_DATABASE, USERS_COLLECTION, filters);
	}

	has(filters: Partial<DbUserSchemaType>) {
		return this.client.has(USERS_DATABASE, USERS_COLLECTION, filters);
	}
	update(filters: Partial<DbUserSchemaType>, data: DbUserSchemaType) {
		return this.client.updateOne(
			USERS_DATABASE,
			USERS_COLLECTION,
			filters,
			data
		);
	}
	delete(filters: Partial<DbUserSchemaType>) {
		return this.client.deleteOne(USERS_DATABASE, USERS_COLLECTION, filters);
	}
}

const UserRepository = new UserRepo(dbClient);
export default UserRepository;
