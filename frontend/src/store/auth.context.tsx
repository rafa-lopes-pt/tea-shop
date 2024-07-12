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
import { CLIENT_SESSION_LIFETIME_MS } from "../../../shared/utils/misc"
import { notifyErrorToast } from "../components/alerts/toasts/toast.notifier";
import { useNavigate } from "react-router-dom";


export type AuthCtxProperties = {
	isLoggedIn: boolean;
	login: (body: LoginSchemaType) => Promise<boolean>;
	updateUser: (body: UpdateProfileSchemaType) => Promise<boolean>;
	updateImage: (body: any) => Promise<boolean>
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

		loadSessionData()

	}, []);


	//=========================================================
	//================= Session Store Handlers ================
	//=========================================================
	function loadSessionData() {
		try {
			const localData = window.sessionStorage.getItem("session") as string;
			const { user, isLoggedIn } = JSON.parse(localData);
			const expiresAt = window.sessionStorage.getItem("session-lifetime") as string;

			if (!user || !isLoggedIn || !expiresAt || Date.now() >= new Date(expiresAt).getTime()) {
				return deleteSessionData()
			}

			setUser(user);
			setIsLoggedIn(isLoggedIn);


		} catch (error) {
			deleteSessionData()
		}

	}

	const clearSessionStorage = () => {
		window.sessionStorage.removeItem("session");
		window.sessionStorage.removeItem("session-lifetime")
	}

	function saveSessionData(data: UserSchemaType) {
		setIsLoggedIn(true);
		setUser(data);

		window.sessionStorage.setItem(
			"session",
			JSON.stringify({ user: data, isLoggedIn: true })
		);
		
		if (!isLoggedIn) {
			//expire a little before the auth cookie to prevent unauthorized access due to blocked event stack
			// (is that even a real scenario??)
			const expiresAt = CLIENT_SESSION_LIFETIME_MS * 0.99;
			window.sessionStorage.setItem(
				"session-lifetime",
				JSON.stringify(expiresAt)
			);
			setTimeout(() => { deleteSessionData() }, expiresAt)
			window.addEventListener('beforeunload', function () {
				//session store may persist if the whole browser is closed
				//NOTE: cookie may still persist
				clearSessionStorage()
			});
		}

	}

	function deleteSessionData() {
		setUser(null);
		setIsLoggedIn(false);
		clearSessionStorage()
	}
	//=========================================================
	async function login(body: LoginSchemaType) {
		return await responseHandler(() => RestAPI.login(body), async (res: Response, toastId: Id) => {
			const data = (await res.json()).data

			saveSessionData(data)
			// setIsLoggedIn(true);
			// setUser(data);

			// window.sessionStorage.setItem(
			// 	"session",
			// 	JSON.stringify({ user: data, isLoggedIn: true })
			// );

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
