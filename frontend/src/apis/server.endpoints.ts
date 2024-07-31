import { LoginSchemaType } from "../../../shared/schemas/login.schema";
import { OrderSchemaType } from "../../../shared/schemas/order.schema";
import { SignupSchemaType } from "../../../shared/schemas/signup.schema";
import { UpdateProfileSchemaType } from "../../../shared/schemas/update-profile.schema";
import HttpError from "../../../shared/types/HttpError/HttpError.type";

const BASE_URI: string = import.meta.env.VITE_REST_API_URI;
if (!BASE_URI) {
	throw new Error("Could not load 'REST_API_URI' from env");
}

namespace RestAPI {
	type ApiMethods = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
	export type Request = (data?: unknown) => Promise<Response>;
	export type ResponseData<dto> = Promise<{ data: dto | string } | HttpError>;

	async function baseRequest(
		endpoint: string,
		method: ApiMethods,
		body?: any,
		headers?: Record<string, string>
	) {
		try {
			return await fetch(BASE_URI + endpoint, {
				headers: {
					"Access-Control-Allow": "true",
					...headers,
				},
				method,
				body,
				credentials: "include",
			});
		} catch (error) {
			console.error(error);
			throw new Error("Connection Failed");
		}
	}

	async function jsonRequest(
		endpoint: string,
		method: ApiMethods = "GET",
		body: unknown = undefined
	) {
		return baseRequest(
			endpoint,
			method,
			body ? JSON.stringify(body) : undefined,
			{ "Content-Type": "application/json" }
		);
	}
	//============== auth endpoints
	export async function signup(data: SignupSchemaType) {
		return jsonRequest("/signup", "POST", data);
	}
	export async function activate(token: string) {
		return jsonRequest("/activate/" + token);
	}
	export async function login(data: LoginSchemaType) {
		return jsonRequest("/login", "POST", data);
	}
	export async function logout() {
		return jsonRequest("/logout");
	}
	//============== shop endpoints
	export async function getShopItems() {
		return jsonRequest("/shop");
	}
	//============== profile endpoints
	export async function updateProfile(data: UpdateProfileSchemaType) {
		return jsonRequest("/profile", "PATCH", data);
	}
	export async function updateImage(data: any) {
		return baseRequest("/profile/image", "PUT", data);
	}
	export async function deleteProfile() {
		return jsonRequest("/profile", "DELETE");
	}
	//============== orders endpoints
	export async function placeOrder(data: OrderSchemaType) {
		return jsonRequest("/orders", "POST", data);
	}
	export async function getOrders() {
		return jsonRequest("/orders");
	}
	//============== other
	export async function emailSupport(data: any) {
		return await jsonRequest("/mail/email-support", "POST", data);
	}
	export async function markAllOrdersAsShipped() {
		return await jsonRequest("/dev/markAllOrdersAsShipped");
	}
}

export default RestAPI;
