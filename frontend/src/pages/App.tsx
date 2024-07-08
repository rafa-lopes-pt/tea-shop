import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import IconButton from "../components/buttons/IconButton";
import FontAwesomeIcons from "../components/misc/Icons";
import NavLink from "../components/navbar/NavLink";
import Navbar from "../components/navbar/Navbar";
import { AuthCtx } from "../store/auth.context";
import Frame from "./misc/Frame";

function App() {
	const auth = useContext(AuthCtx);


	const AuthenticatedNav =
		<Navbar
			className="main-navbar">
			<NavLink to="/">Shop</NavLink>
			<NavLink to="account">Profile</NavLink>
			<NavLink to="cart">Cart</NavLink>
			<NavLink to="/" indicateRoute={false} action={auth?.logout}>Logout</NavLink>
		</Navbar>

	const UnauthenticatedNav =
		<Navbar
			className="main-navbar">
			<NavLink to="/">Shop</NavLink>
			<NavLink to="login">Login</NavLink>
		</Navbar>

	return (
		<>
			<Frame />
			<main id="main">

				{auth?.isLoggedIn ? AuthenticatedNav : UnauthenticatedNav}



				{/* social icons */}

				<div className="social-icons">
					<IconButton icon={FontAwesomeIcons.youtube} />
					<IconButton icon={FontAwesomeIcons.facebook} />
					<IconButton icon={FontAwesomeIcons.instagram} />
				</div>

				<AnimatePresence>
					<Outlet></Outlet>
				</AnimatePresence>
			</main >
		</>
	);
}

export default App;
