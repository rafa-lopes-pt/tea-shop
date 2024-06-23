import { ObjectId } from "mongodb";

export default interface Token {
	_id: ObjectId;
	email: string;
}
