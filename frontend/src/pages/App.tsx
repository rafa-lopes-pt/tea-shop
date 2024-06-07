import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import IconButton, { ICONS } from "../components/buttons/IconButton";
import Navbar from "../components/navbar/Navbar";
import { AuthCtx } from "../store/auth.context";
import Frame from "./misc/Frame";

function App() {
	const auth = useContext(AuthCtx);

	const AuthenticatedNavItems = [
		{ label: "Shop", to: "/" },
		{ label: "Profile", to: "account" },
		{ label: "Cart", to: "account/cart" },
		{ label: "Logout", to: "/", action: auth?.logout },
	];
	const UnauthenticatedNavItems = [
		{ label: "Shop", to: "/" },
		{ label: "Login", to: "login" },
	];

	return (
		<>
			<Frame />
			<main id="main">
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
