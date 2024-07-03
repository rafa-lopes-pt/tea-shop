import dbClient from "../database/DatabaseClient";
import { DbUserSchemaType } from "./types/DbUser.type";
import Repository from "./Repository";

const DATABASE = "users";
const COLLECTION = "users_list";

const UserRepository = new Repository<DbUserSchemaType>(
	dbClient,
	DATABASE,
	COLLECTION
);
export default UserRepository;
