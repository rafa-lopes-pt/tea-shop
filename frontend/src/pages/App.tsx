import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import IconButton, { ICONS } from "../components/buttons/IconButton";
import Navbar from "../components/navbar/Navbar";
import { AuthCtx } from "../store/auth.context";
import Frame from "./misc/Frame";

const AuthenticatedNavItems = [
	{ label: "Shop", to: "/" },
	{ label: "Profile", to: "account" },
	{ label: "Logout", action: () => {} },
];
const UnauthenticatedNavItems = [
	{ label: "Shop", to: "/" },
	{ label: "Login", to: "login" },
];
function App() {
	const auth = useContext(AuthCtx);

	return (
		<>
			<Frame />
			<main>
				<Navbar
					links={
						auth?.isLoggedIn
							? AuthenticatedNavItems
							: UnauthenticatedNavItems
					}
					className="main-navbar"></Navbar>

				{/* social icons */}

				<div className="social-icons">
					<IconButton icon={ICONS.youtube} />
					<IconButton icon={ICONS.facebook} />
					<IconButton icon={ICONS.instagram} />
				</div>

				<AnimatePresence>
					<Outlet></Outlet>
				</AnimatePresence>
			</main>
		</>
	);
}

export default App;
