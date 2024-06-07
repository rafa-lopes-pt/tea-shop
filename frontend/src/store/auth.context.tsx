import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginSchemaType } from "../../../shared/schemas/login.schema";
import { UserSchemaType } from "../../../shared/schemas/user.schema";
import {
	notifyToastPromiseEnd,
	notifyToastPromiseError,
	notifyToastPromiseLoading,
} from "../components/alerts/toasts/promise.notifier";
import { notifyInfoToast } from "../components/alerts/toasts/toast.notifier";

export type AuthCtxProperties = {
	isLoggedIn: boolean;
	login: (data: LoginSchemaType) => Promise<any>;
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

	const fakeRequest = (returnData: any) =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(returnData);
			}, 3000);
		});

	async function login() {
		const toastId = notifyToastPromiseLoading();

		return fakeRequest({
			name: "Rafa",
			email: "rafalopessecond@gmail.com",
			image: "https://avatars.githubusercontent.com/u/45339818?v=4",
			notifyByEmail: true,
			notifyBySms: false,
			billingInfo: {
				country: "Portugal",
				city: "Tomar",
				street: "Casal das Cabras",
				zipCode: "1234-567",
			},
		})
			.then((user) => {
				setIsLoggedIn(true);
				setUser(user as UserSchemaType);
				window.sessionStorage.setItem(
					"session",
					JSON.stringify({ user, isLoggedIn: true })
				);

				notifyToastPromiseEnd(toastId);
			})
			.catch((err) => {
				console.log("check err type- 401 or other");
				if (err.code === 401) {
					notifyToastPromiseError(toastId, "Invalid Credentials");
				} else {
					notifyToastPromiseError(toastId, "Something went wrong");
				}
			});
	}
	async function logout() {
		setUser(null);
		setIsLoggedIn(false);
		window.sessionStorage.removeItem("session");
		notifyInfoToast("Logged Out");
	}

	return (
		<AuthCtx.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
			{children}
		</AuthCtx.Provider>
	);
};
