import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginSchemaType } from "../../../shared/schemas/login.schema";
import { UserSchemaType } from "../../../shared/schemas/user.schema";
import responseHandler from "../apis/responseHandler";
import RestAPI from "../apis/server.endpoints";
import {
	notifyToastPromiseSuccess
} from "../components/alerts/toasts/promise.notifier";
import { Id } from "react-toastify";
import { UpdateProfileSchemaType } from "../../../shared/schemas/UpdateProfile.schema";

export type AuthCtxProperties = {
	isLoggedIn: boolean;
	login: (data: LoginSchemaType) => Promise<boolean>;
	updateUser: (data: UpdateProfileSchemaType) => Promise<boolean>;
	logout: () => void;
	user: UserSchemaType | null;
	setUser: (data: UserSchemaType) => void;
};

export const AuthCtx = createContext<AuthCtxProperties | null>(null);

export const AuthCtxProvider = ({ children }: { children?: ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<UserSchemaType | null>(null);

	useEffect(() => {
		const localData = window.sessionStorage.getItem("session");
		if (localData) {
			const { user, isLoggedIn } = JSON.parse(localData);
			setUser(user);
			setIsLoggedIn(isLoggedIn);
		}
	}, []);

	async function login(body: LoginSchemaType) {
		return await responseHandler(() => RestAPI.login(body), async (res: Response, toastId: Id) => {
			console.log(res)
			const data = (await res.json()).data
			setIsLoggedIn(true);
			setUser(data);

			window.sessionStorage.setItem(
				"session",
				JSON.stringify({ user: data, isLoggedIn: true })
			);

			notifyToastPromiseSuccess(toastId, "Logged In");
			return true
		})
	}

	async function updateUser(body: UpdateProfileSchemaType) {
		return responseHandler(() => RestAPI.updateProfile(body), async (res: Response, toastId: Id) => {
			const data = (await res.json()).data
			setUser(data)
			window.sessionStorage.setItem(
				"session",
				JSON.stringify({ user: data, isLoggedIn: true })
			);
			notifyToastPromiseSuccess(toastId, "Success!")
			return true
		})

	}


	async function logout() {
		await responseHandler(() =>
			RestAPI.logout(), (_res: Response, toastId: Id) => {
				setUser(null);
				setIsLoggedIn(false);
				window.sessionStorage.removeItem("session");
				notifyToastPromiseSuccess(toastId, "Logged Out");

			})
	}

	return (
		<AuthCtx.Provider value={{ isLoggedIn, login, updateUser, logout, user, setUser }}>
			{children}
		</AuthCtx.Provider>
	);
};
