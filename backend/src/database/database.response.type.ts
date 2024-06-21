import { Document, WithId } from "mongodb";

export type DatabaseResponse = {
	error?: any;
	message: string;
	data?: WithId<Document>;
};
