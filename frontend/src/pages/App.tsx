import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { notifyInfoToast } from "../components/alerts/toasts/toast.notifier";
import IconButton from "../components/buttons/IconButton";
import FontAwesomeIcons from "../components/misc/Icons";
import NavLink from "../components/navbar/NavLink";
import Navbar from "../components/navbar/Navbar";
import { AuthCtx } from "../store/auth.context";
import Frame from "./misc/Frame";

function App() {
	const auth = useContext(AuthCtx);
	const navigate = useNavigate()

	const clientSideLogout = () => {
		auth?.deleteSessionData()
		notifyInfoToast("Your session timed out. Please login again")
		navigate("/login")

	}

	useEffect(() => {

		const id = auth?.isLoggedIn ? setInterval(() => {

			if (!auth?.checkSessionValidity()) {
				clientSideLogout()
			}
		}, 1000 * 5) : undefined

		return () => clearInterval(id)

	}, [auth?.user])

	useLayoutEffect(() => {
		const isSessionValid = auth?.checkSessionValidity()

		if (!isSessionValid && !location.pathname.match(new RegExp("^\/$|^\/login|^/item", "i"))) {
			clientSideLogout()
		}
		else if (!isSessionValid) {
			auth?.deleteSessionData()
		}

	}, [location.pathname])


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
