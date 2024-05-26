import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Frame from "./misc/Frame";
import { AnimatePresence, motion } from "framer-motion";
import IconButton, { ICONS } from "../components/buttons/IconButton";
function App() {
	return (
		<>
			<Frame />
			<main>
				<Navbar
					links={[
						{ label: "Shop", to: "/" },
						{ label: "Profile", to: "account" },
						{ label: "Logout", action: () => {} },
					]}
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
