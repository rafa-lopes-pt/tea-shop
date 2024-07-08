import { UpdateProfileSchemaType } from "../../../shared/schemas/UpdateProfile.schema";
import { LoginSchemaType } from "../../../shared/schemas/login.schema";
import { SignupSchemaType } from "../../../shared/schemas/signup.schema";
import HttpError from "../../../shared/types/HttpError/HttpError.type";

const BASE_URI: string = import.meta.env.VITE_REST_API_URI;
if (!BASE_URI) {
	throw new Error("Could not load 'REST_API_URI' from env");
}

namespace RestAPI {
	type ApiMethods = "POST" | "GET" | "PATCH" | "DELETE";
	export type Request = (data?: unknown) => Promise<Response>;
	export type ResponseData<dto> = Promise<{ data: dto | string } | HttpError>;

	async function baseFetch(
		endpoint: string,
		method: ApiMethods = "GET",
		body: unknown = undefined
	) {
		return await fetch(BASE_URI + endpoint, {
			headers: { "Content-Type": "application/json" },
			method,
			body: body ? JSON.stringify(body) : undefined,
			credentials: "include",
		});
	}
	//============== auth endpoints
	export async function signup(data: SignupSchemaType) {
		return baseFetch("/signup", "POST", data);
	}
	export async function activate(token: string) {
		return baseFetch("/activate/" + token);
	}
	export async function login(data: LoginSchemaType) {
		return baseFetch("/login", "POST", data);
	}
	export async function logout() {
		return baseFetch("/logout");
	}
	//============== shop endpoints
	export async function getShopItems() {
		return baseFetch("/shop");
	}
	//============== profile endpoints
	export async function updateProfile(data: UpdateProfileSchemaType) {
		return baseFetch("/profile", "PATCH", data);
	}
	export async function deleteProfile() {
		return baseFetch("/profile", "DELETE");
	}
	//============== orders endpoints
	export async function getOrders() {
		return (await baseFetch("/orders")).json();
	}
}

export default RestAPI;
