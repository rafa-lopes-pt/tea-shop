import { useLocation, useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import NavLink from "./NavLink";

export default function Navbar({
	links,
	className = "",
}: {
	links: { label: string; to?: string; action?: Function }[];
	className?: string;
}) {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const isActive = (path: string) =>
		pathname === `/${path === "/" ? "" : path}`;

	return (
		<nav className={"navbar " + className}>
			{links.map((e) =>
				e?.action ? (
					<Button
						key={`navbar-action-${e.label}-to-${e?.action}`}
						onClick={() => {
							e?.action && e.action();
							if (e?.to) navigate(e.to);
						}}
						variant="outlined">
						{e.label}
					</Button>
				) : (
					<NavLink
						key={`navbar-link-${e.label}-to-${e?.to}`}
						to={e?.to || ""}
						variant={
							isActive(e?.to || "") ? "primary" : "outlined"
						}>
						{e.label}
					</NavLink>
				)
			)}
		</nav>
	);
}
