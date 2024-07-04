import {
	FindCursor,
	MongoClient,
	ObjectId,
	ServerApiVersion,
	WithId,
	WithoutId,
} from "mongodb";
import {
	DatabaseData,
	DatabaseFilters,
	DatabaseResponse,
} from "./database.types";
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
	async insertOne<dto>(
		database: string,
		collection: string,
		data: DatabaseData<dto>
	): DatabaseResponse<ObjectId | string> {
		try {
			await this._client.connect();

			const db_response = await this._client
				.db(database)
				.collection(collection)
				.insertOne(data);

			if (!db_response.acknowledged) {
				throw new Error("Data not acknowledged");
			}

			return { data: db_response.insertedId };
		} catch (error) {
			return {
				message: `Error while inserting data into into ${collection} collection from ${database} database`,
				error,
			};
		} finally {
			await this.close();
		}
	}
	/**
	 * Handles errors and checks if action was successful
	 */
	async deleteOne<dto>(
		database: string,
		collection: string,
		filters: DatabaseFilters<dto>
	): DatabaseResponse<boolean> {
		try {
			await this._client.connect();

			const db_response = await this._client
				.db(database)
				.collection(collection)
				.deleteOne(filters);

			if (db_response.deletedCount === 0)
				throw new Error("Could not find resource");

			return { data: true };
		} catch (error) {
			return {
				data: false,
				message: `Could not delete requested data from ${collection} collection from ${database}`,
				error,
			};
		} finally {
			await this.close();
		}
	}
	/**
	 * Handles errors and checks if action was successful
	 */
	async updateOne<dto>(
		database: string,
		collection: string,
		filters: DatabaseFilters<dto>,
		data: Partial<WithoutId<DatabaseData<dto>>>
	): DatabaseResponse<dto> {
		try {
			await this._client.connect();

			const db_response = await this._client
				.db(database)
				.collection(collection)
				.findOneAndUpdate(
					filters,
					{ $set: data },
					{ returnDocument: "after" }
				);

			if (!db_response) {
				throw new Error("Data not acknowledged");
			}

			return { data: db_response as dto };
		} catch (error) {
			return {
				error,
				message: `Could not update requested data: ${data} from ${collection} collection from ${database}`,
			};
		} finally {
			await this.close();
		}
	}
	/**
	 * Returns a cursor for the actual data
	 */
	async find<dto>(
		database: string,
		collection: string,
		filters: DatabaseFilters<dto>
	): DatabaseResponse<FindCursor<WithId<dto>>> {
		try {
			await this._client.connect();

			return {
				data: this._client
					.db(database)
					.collection(collection)
					.find(filters) as FindCursor<WithId<dto>>,
			};
		} catch (error) {
			return {
				error,
				message: `Error while searching for ${filters} on ${collection} collection from ${database}`,
			};
		} finally {
			await this.close();
		}
	}
	/**
	 * Returns a document, or null if it can't find anything
	 */
	async findOne<dto>(
		database: string,
		collection: string,
		filters: DatabaseFilters<dto>
	): DatabaseResponse<WithId<dto> | null> {
		try {
			await this._client.connect();

			return {
				data: (await this._client
					.db(database)
					.collection(collection)
					.findOne(filters)) as WithId<dto> | null,
			};
		} catch (error) {
			return {
				error,
				message: `Error while searching for ${filters} on ${collection} collection from ${database}`,
			};
		} finally {
			await this.close();
		}
	}
	async has<dto>(
		database: string,
		collection: string,
		filters: DatabaseFilters<dto>
	): DatabaseResponse<boolean> {
		const response = await this.findOne(database, collection, filters);
		return { ...response, data: response.data ? true : false };
	}
}
