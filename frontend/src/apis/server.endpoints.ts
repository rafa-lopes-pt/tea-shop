import { LoginSchemaType } from "../../../shared/schemas/login.schema";
import { SignupSchemaType } from "../../../shared/schemas/signup.schema";
import { UpdateProfileSchemaType } from "../../../shared/schemas/UpdateProfile.schema";

const BASE_URI: string = import.meta.env.VITE_REST_API_URI;
type ApiMethods = "POST" | "GET" | "PATCH" | "DELETE";

namespace RestAPI {
	async function baseFetch(
		endpoint: string,
		method: ApiMethods = "GET",
		body: unknown = undefined
	) {
		return await fetch(BASE_URI + endpoint, {
			headers: {},
			method,
			body: body ? JSON.stringify({ data: body }) : undefined,
		});
	}

	//============== auth endpoints
	export function signup(data: SignupSchemaType) {
		return baseFetch("/signup", "POST", data);
	}
	export function activate(token: string) {
		return baseFetch("/activate/" + token);
	}
	export function login(data: LoginSchemaType) {
		return baseFetch("/login", "POST", data);
	}
	//============== shop endpoints
	export function getShopItems() {
		return baseFetch("/shop");
	}
	//============== profile endpoints
	export function updateProfile(data: UpdateProfileSchemaType) {
		return baseFetch("/profile", "PATCH", data);
	}
	export function deleteProfile() {
		return baseFetch("/profile", "DELETE");
	}
	//============== orders endpoints
	export function getOrders() {
		return baseFetch("/orders");
	}
}

export default RestAPI;
