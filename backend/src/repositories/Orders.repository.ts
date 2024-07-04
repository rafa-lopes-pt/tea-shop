import dbClient from "../database/DatabaseClient";
import Repository from "./Repository";

const DATABASE = "orders";
const COLLECTION = "orders_list";

const OrdersRepository = new Repository<{
	email: string;
	items: [];
	delivered: boolean;
}>(dbClient, DATABASE, COLLECTION);
export default OrdersRepository;
