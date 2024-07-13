import { OrderSchemaType } from "../../../shared/schemas/order.schema";
import dbClient from "../database/DatabaseClient";
import Repository from "./Repository";

const DATABASE = "orders";
const COLLECTION = "orders_list";

const OrdersRepository = new Repository<OrderSchemaType>(
	dbClient,
	DATABASE,
	COLLECTION
);
export default OrdersRepository;
