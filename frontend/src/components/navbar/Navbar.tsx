import { useLocation, useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import Button, { BUTTON_VARIANTS } from "../buttons/Button";

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
						variant={BUTTON_VARIANTS.outlined}>
						{e.label}
					</Button>
				) : (
					<NavLink
						key={`navbar-link-${e.label}-to-${e?.to}`}
						to={e?.to || ""}
						variant={
							isActive(e?.to || "")
								? BUTTON_VARIANTS.primary
								: BUTTON_VARIANTS.outlined
						}>
						{e.label}
					</NavLink>
				)
			)}
		</nav>
	);
}
