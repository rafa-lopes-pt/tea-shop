import { UserSchemaType } from "../../../shared/schemas/user.schema";

import Repository from "./Repository";

const USERS_DATABASE = "users";
const USERS_COLLECTION = "users_list";

export default class AuthRepository extends Repository<UserSchemaType> {
	insert(data: UserSchemaType) {
		return this.client.insertOne(USERS_DATABASE, USERS_COLLECTION, data);
	}

	find(filters: Partial<UserSchemaType>) {
		return this.client.find(USERS_DATABASE, USERS_COLLECTION, filters);
	}

	findOne(filters: Partial<UserSchemaType>) {
		return this.client.findOne(USERS_DATABASE, USERS_COLLECTION, filters);
	}

	has(filters: Partial<UserSchemaType>) {
		return this.client.has(USERS_DATABASE, USERS_COLLECTION, filters);
	}
	update(filters: Partial<UserSchemaType>, data: UserSchemaType) {
		return this.client.updateOne(
			USERS_DATABASE,
			USERS_COLLECTION,
			filters,
			data
		);
	}
	delete(filters: Partial<UserSchemaType>) {
		return this.client.deleteOne(USERS_DATABASE, USERS_COLLECTION, filters);
	}
}
