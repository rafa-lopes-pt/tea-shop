import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginSchemaType } from "../../../shared/schemas/login.schema";
import { UserSchemaType } from "../../../shared/schemas/user.schema";
type AuthCtxProperties = {
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
		//Get stuff from localstorage

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
			}, 300);
		});

	async function login() {
		return fakeRequest(true).then(() => {
			setIsLoggedIn(true);
			const user = {
				name: "Rafa",
				email: "rafalopessecond@gmail.com",
				image: "",
				notifyByEmail: true,
				notifyBySms: false,
				billingInfo: {
					country: "Portugal",
					city: "Tomar",
					street: "Casal das Cabras",
					zipCode: "1234-567",
				},
			};
			setUser(user);
			window.sessionStorage.setItem(
				"session",
				JSON.stringify({ user, isLoggedIn: true })
			);
		});
	}
	function logout() {
		setUser(null);
		setIsLoggedIn(false);
		window.sessionStorage.removeItem("session");
	}

	return (
		<AuthCtx.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
			{children}
		</AuthCtx.Provider>
	);
};
