import dbClient from "../database/DatabaseClient";
import { ShopItemSchemaType } from "../../../shared/schemas/shop-item.schema";
import Repository from "./Repository";

const DATABASE = "shop";
const COLLECTION = "current_items";

const ShopRepository = new Repository<ShopItemSchemaType>(
	dbClient,
	DATABASE,
	COLLECTION
);
export default ShopRepository;
