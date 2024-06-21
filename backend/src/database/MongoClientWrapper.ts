import { MongoClient, ServerApiVersion } from "mongodb";
import { DatabaseResponse } from "./database.response.type";
/**
 * Wraps the a MongoClient and exposes basic CRUD methods to safely operate with the database.
 * These methods check for successful actions, and catch errors and return them in the form
 * of a DatabaseResponse
 *
 * The intent of this class is to be passed as a dependency into other classes that perform
 * more concrete methods. i.e a user repository.
 * This way the global pool of connections can be shared, and the methods for communicating with
 * the database are technically encapsulated.
 */
export default class MongoClientWrapper {
	private _client: MongoClient;

	/**
	 * @param uri MongoDB Cloud URI
	 */
	constructor(uri: string) {
		this._client = new MongoClient(uri, {
			serverApi: {
				version: ServerApiVersion.v1,
				strict: true,
				deprecationErrors: true,
			},
		});
	}

	/**
	 * Exposes the close method to ensure that a connection is closed
	 */
	async close() {
		return await this._client.close();
	}
	/**
	 * Handles errors and checks if action was successful
	 */
	async insertOne(
		database: string,
		collection: string,
		data: any
	): Promise<DatabaseResponse> {
		try {
			const db_response = await this._client
				.db(database)
				.collection(collection)
				.insertOne(data);

			if (!db_response.acknowledged) {
				return {
					message: `Data was not acknowledged into ${collection} collection from ${database} database`,
				};
			}
		} catch (error) {
			return {
				message: `Error while inserting data into into ${collection} collection from ${database} database`,
				error,
			};
		} finally {
			this.close();
		}

		return { message: "Inserted successfully" };
	}
	/**
	 * Handles errors and checks if action was successful
	 */
	async deleteOne(
		database: string,
		collection: string,
		filters: any
	): Promise<DatabaseResponse> {
		try {
			const db_response = await this._client
				.db(database)
				.collection(collection)
				.deleteOne(filters);

			if (db_response.deletedCount === 0)
				return {
					message: `Could not find resource with filters: ${filters} to delete from ${collection} collection from ${database}`,
				};
			return { message: "Deleted successfully" };
		} catch (error) {
			return {
				message: `Could not delete requested data from ${collection} collection from ${database}`,
				error,
			};
		} finally {
			this.close();
		}
	}
	/**
	 * Handles errors and checks if action was successful
	 */
	async updateOne(
		database: string,
		collection: string,
		filters: any,
		data: any
	): Promise<DatabaseResponse> {
		try {
			const { _id, ...documentData } = data;
			const db_response = await this._client
				.db(database)
				.collection(collection)
				.replaceOne(filters, documentData);

			if (!db_response.acknowledged) {
				return {
					message: `Data was not acknowledged into ${collection} collection from ${database} database`,
				};
			}

			return { message: "Updated successfully" };
		} catch (error) {
			return {
				error,
				message: `Could not update requested data: ${data} from ${collection} collection from ${database}`,
			};
		} finally {
			this.close();
		}
	}
	/**
	 * Returns a cursor for the actual data
	 */
	find(database: string, collection: string, filters: any) {
		try {
			return this._client
				.db(database)
				.collection(collection)
				.find(filters);
		} finally {
			this.close();
		}
	}
	/**
	 * Returns a document, or null if it can't find anything
	 */
	async findOne(database: string, collection: string, filters: any) {
		try {
			return this._client
				.db(database)
				.collection(collection)
				.findOne(filters);
		} finally {
			this.close();
		}
	}
	async has(database: string, collection: string, filters: any) {
		try {
			return (await this.findOne(database, collection, filters))
				? true
				: false;
		} finally {
			this.close();
		}
	}
}
