import { ReactNode, createContext, useEffect, useState } from "react";
import { Id } from "react-toastify";
import { UpdateProfileSchemaType } from "../../../shared/schemas/UpdateProfile.schema";
import { LoginSchemaType } from "../../../shared/schemas/login.schema";
import { SignupSchemaType } from "../../../shared/schemas/signup.schema";
import { UserSchemaType } from "../../../shared/schemas/user.schema";
import responseHandler from "../apis/responseHandler";
import RestAPI from "../apis/server.endpoints";
import {
	notifyToastPromiseEnd,
	notifyToastPromiseSuccess
} from "../components/alerts/toasts/promise.notifier";

export type AuthCtxProperties = {
	isLoggedIn: boolean;
	login: (body: LoginSchemaType) => Promise<boolean>;
	updateUser: (body: UpdateProfileSchemaType) => Promise<boolean>;
	updateImage: (body: File) => Promise<boolean>
	logout: () => Promise<boolean>;
	deleteAccount: () => Promise<boolean>,
	user: UserSchemaType | null,
	signup: (body: SignupSchemaType) => Promise<boolean>,
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
		return await responseHandler(() => RestAPI.updateProfile(body), async (res: Response, toastId: Id) => {
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

	async function updateImage(body: File) {
		return await responseHandler(() => RestAPI.updateImage(body), async (res: Response, toastId: Id) => {
			const data = (await res.json()).data
			// setUser(data)
			// window.sessionStorage.setItem(
			// 	"session",
			// 	JSON.stringify({ user: data, isLoggedIn: true })
			// );
			notifyToastPromiseSuccess(toastId, "Success!")
			return true
		})
	}

	async function logout() {
		setUser(null);
		setIsLoggedIn(false);
		window.sessionStorage.removeItem("session");

		return await responseHandler(() =>
			RestAPI.logout(), (_res: Response, toastId: Id) => {
				notifyToastPromiseSuccess(toastId, "Logged Out");
				return true
			})
	}

	async function deleteAccount() {
		return await responseHandler(RestAPI.deleteProfile, (_res: Response, toastId: Id) => {
			setUser(null);
			setIsLoggedIn(false);
			window.sessionStorage.removeItem("session");
			notifyToastPromiseEnd(toastId)
			return true
		}
		)
	}

	async function signup(body: SignupSchemaType) {
		return await responseHandler(() => RestAPI.signup(body), (_res: Response, toastId: Id) =>
			notifyToastPromiseSuccess(toastId, "Check Your Inbox")
		)
	}


	return (
		<AuthCtx.Provider value={{ isLoggedIn, login, updateUser, updateImage, logout, deleteAccount, user, signup }}>
			{children}
		</AuthCtx.Provider>
	);
};
