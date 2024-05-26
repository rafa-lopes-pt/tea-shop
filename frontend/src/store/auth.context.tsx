import { ReactNode, createContext, useState } from "react";
//IMPROVE: Move this to models folder
// but first plan out the best structure for reusing these files in backend code too
type USER_SCHEMA = {
	image: string;
	email: string;
	name: string;
	notifyByEmail: boolean;
	notifyBySms: boolean;
	billingInfo: {
		country: string;
		city: string;
		street: string;
		zipCode: string;
	};
};
type AuthCtxProperties = {
	isLoggedIn: boolean;
	login: () => Promise<any>;
	logout: () => void;
	user: USER_SCHEMA | null;
	setUser: (data: USER_SCHEMA) => void;
};

export const AuthCtx = createContext<AuthCtxProperties | null>(null);

export const AuthCtxProvider = ({ children }: { children?: ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<USER_SCHEMA | null>(null);

	const fakeRequest = (returnData: any) =>
		new Promise((resolve) => {
			setTimeout(() => {
				resolve(returnData);
			}, 300);
		});

	async function login() {
		return fakeRequest(true).then(() => {
			setIsLoggedIn(true);
			setUser({
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
			});
		});
	}
	function logout() {
		setUser(null);
		setIsLoggedIn(false);
	}

	return (
		<AuthCtx.Provider value={{ isLoggedIn, login, logout, user, setUser }}>
			{children}
		</AuthCtx.Provider>
	);
};
