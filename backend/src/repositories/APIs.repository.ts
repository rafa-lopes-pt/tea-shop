import dbClient from "../database/DatabaseClient";
import Repository from "./Repository";
import { ApiData } from "./types/ApiData.type";

const DATABASE = "security";
const COLLECTION = "apis";

const ApisRepository = new Repository<ApiData>(dbClient, DATABASE, COLLECTION);
export default ApisRepository;
