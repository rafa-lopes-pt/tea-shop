import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { notifyInfoToast } from "../components/alerts/toasts/toast.notifier";
import IconButton from "../components/buttons/IconButton";
import FontAwesomeIcons from "../components/misc/Icons";
import NavLink from "../components/navbar/NavLink";
import Navbar from "../components/navbar/Navbar";
import { AuthCtx } from "../store/auth.context";
import Frame from "./misc/Frame";
import RestAPI from "../apis/server.endpoints";

function App() {
	const auth = useContext(AuthCtx);
	const navigate = useNavigate()
	const [waitingForServer, setWaitingForServer] = useState(true)
	const clientSideLogout = () => {
		auth?.deleteSessionData()
		notifyInfoToast("Your session timed out. Please login again")
		navigate("/login") //FIX: navigate does not seem to be working properly...need to force a reload for it to take an effect
		location.reload()
	}

	//Check if server is alive
	useLayoutEffect(() => {
		RestAPI.isAlive().then(res => res && setWaitingForServer(false)).catch(e => { throw new Error(e) })
	}, [])
	//Check Session validity
	useEffect(() => {
		const id = auth?.isLoggedIn ? setInterval(() => {

			if (!auth?.checkSessionValidity()) {
				clientSideLogout()
			}
		}, 1000 * 5) : undefined

		return () => clearInterval(id)

	}, [auth?.user])

	// Redirect on invalid session
	useLayoutEffect(() => {
		const isSessionValid = auth?.checkSessionValidity()

		if (!isSessionValid && !location.pathname.match(new RegExp("^\/$|^\/login|^\/item", "i"))) {
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

			{waitingForServer && <main id="main" className="booting">
				<h1>Brewing tea ...</h1>
				<h3>We're brewing up something special for you!</h3>
				<p> Due to some technical limitations of the free tiers in our hosting platforms, the website can take up to 50s to load 😔</p>
				<p> You can read more about this at the <a href="https://github.com/rafa-lopes-pt/tea-shop" target="_blank" className="link">github repository</a></p>
			</main>
			}
			{!waitingForServer && <main id="main">

				{auth?.isLoggedIn ? AuthenticatedNav : UnauthenticatedNav}

				{/* social icons */}
				<div className="social-icons">
					<a href="https://github.com/rafa-lopes-pt/tea-shop" target="_blank" rel="noopener noreferrer"><IconButton icon={FontAwesomeIcons.github} /></a>
					<a href="https://www.linkedin.com/in/rafael-lopes-software-developer/" target="_blank" rel="noopener noreferrer"><IconButton icon={FontAwesomeIcons.linkedin} /></a>
					<a href="mailto:rafalopessecond@gmail.com" target="_blank" rel="noopener noreferrer"><IconButton icon={FontAwesomeIcons.mail} /></a>
				</div>

				<AnimatePresence>
					<Outlet></Outlet>
				</AnimatePresence>
			</main >}
		</>
	);
}

export default App;
