import { Children, ReactElement, cloneElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton, { ICONS } from "../buttons/IconButton";
import NavLink from "./NavLink";
export default function Navbar({
	className = "",
	children
}: {
	children?: ReactElement | ReactElement[];
	className?: string;
}) {

	const [show, setShow] = useState(false)

	return <div className="main-navbar">

		{/*== Only on small screens ==*/}
		<div className="main-navbar__background" data-show={show}>&nbsp;</div>

		<IconButton
			icon={ICONS.hamburger}
			className="main-navbar__hamburger-icon" onClick={() => setShow(prev => !prev)} />
		{/*==========================*/}

		<nav className="main-navbar__nav" data-open={show}>
			<ul className="main-navbar__list">

				{
					Children.map(children, (child) => {
						if (child && child.type === NavLink) {

							return cloneElement(child, { onDismissOverlay: () => setShow(false) })

						}
						return child;
					})
				}



			</ul>
		</nav>

	</div>

}