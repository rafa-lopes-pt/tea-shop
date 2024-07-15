import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { Id } from "react-toastify";
import { UpdateProfileSchemaType } from "../../../shared/schemas/update-profile.schema";
import { LoginSchemaType } from "../../../shared/schemas/login.schema";
import { SignupSchemaType } from "../../../shared/schemas/signup.schema";
import { UserSchema, UserSchemaType } from "../../../shared/schemas/user.schema";
import { CLIENT_SESSION_LIFETIME_MS } from "../../../shared/utils/misc";
import responseHandler from "../apis/responseHandler";
import RestAPI from "../apis/server.endpoints";
import {
	notifyToastPromiseSuccess
} from "../components/alerts/toasts/promise.notifier";


export type AuthCtxProperties = {
	isLoggedIn: boolean;
	login: (body: LoginSchemaType) => Promise<boolean>;
	updateUser: (body: UpdateProfileSchemaType) => Promise<boolean>;
	updateImage: (body: any) => Promise<boolean>
	logout: () => Promise<boolean>;
	deleteAccount: () => Promise<boolean>,
	user: UserSchemaType | null,
	signup: (body: SignupSchemaType) => Promise<boolean>,
	checkSessionValidity: () => boolean
	deleteSessionData: () => void
};

export const AuthCtx = createContext<AuthCtxProperties | null>(null);

export const AuthCtxProvider = ({ children }: { children?: ReactNode }) => {
	const [user, setUser] = useState<UserSchemaType | null>(null);

	useEffect(() => {

		loadSessionData()

	}, [])


	//=========================================================
	//================= Session Store Handlers ================
	//=========================================================
	function getSessionStore() {
		try {
			const localData = window.sessionStorage.getItem("session") as string;
			const { user } = JSON.parse(localData)
			const expiresAt = JSON.parse(window.sessionStorage.getItem("session-lifetime") as string);

			return { user, isValid: UserSchema.safeParse(user).success && Date.now() < expiresAt }
		} catch (error) {
			//console.error(error)
			return {}
		}

	}

	function checkSessionValidity() {
		return getSessionStore()?.isValid as boolean
	}

	function loadSessionData() {
		const { user, isValid } = getSessionStore() as { user: UserSchemaType, isValid: boolean }
		if (!isValid) return false;
		setUser(user);
		return true

	}

	function clearSessionStorage() {
		window.sessionStorage.removeItem("session");
		window.sessionStorage.removeItem("session-lifetime")
	}

	function saveSessionData(data: UserSchemaType) {
		setUser(data);

		window.sessionStorage.setItem(
			"session",
			JSON.stringify({ user: data })
		);

		const expiresAt = CLIENT_SESSION_LIFETIME_MS
		window.sessionStorage.setItem(
			"session-lifetime",
			JSON.stringify(Date.now() + expiresAt)
		);
	}

	function deleteSessionData() {
		setUser(null);
		clearSessionStorage()
	}
	//=========================================================
	async function login(body: LoginSchemaType) {
		return await responseHandler(() => RestAPI.login(body), async (res: Response, toastId: Id) => {
			const data = (await res.json()).data

			saveSessionData(data)
			notifyToastPromiseSuccess(toastId, "Logged In");
			return true
		})
	}

	async function updateUser(body: UpdateProfileSchemaType) {
		return await responseHandler(() => RestAPI.updateProfile(body), async (res: Response, toastId: Id) => {
			const data = (await res.json()).data
			saveSessionData(data)
			notifyToastPromiseSuccess(toastId, "Success!")
			return true
		})

	}

	async function updateImage(body: any) {
		return await responseHandler(() => RestAPI.updateImage(body), async (res: Response, toastId: Id) => {
			let data

			try {
				data = (await res?.json())?.data
			} catch (error) {
				//server might not contain a response
			}

			if (data) {
				saveSessionData(data)
			}
			notifyToastPromiseSuccess(toastId, "Updated!")
			return true
		})
	}

	async function logout() {

		deleteSessionData()

		return await responseHandler(() =>
			RestAPI.logout(), (_res: Response, toastId: Id) => {
				notifyToastPromiseSuccess(toastId, "Logged Out");
				return true
			})
	}

	async function deleteAccount() {
		return await responseHandler(RestAPI.deleteProfile, (_res: Response, toastId: Id) => {
			deleteSessionData()
			notifyToastPromiseSuccess(toastId, "Deleted");
			return true
		}
		)
	}

	async function signup(body: SignupSchemaType) {
		return await responseHandler(() => RestAPI.signup(body), (_res: Response, toastId: Id) => {
			notifyToastPromiseSuccess(toastId, "Check Your Inbox")
			return true
		}
		)
	}


	return (
		<AuthCtx.Provider value={{ isLoggedIn: user ? true : false, login, updateUser, updateImage, logout, deleteAccount, user, signup, checkSessionValidity, deleteSessionData }}>
			{children}
		</AuthCtx.Provider>
	);
};
