import { useLocation } from "react-router-dom";
import NavLink from "./NavLink";
import Button, { BUTTON_VARIANTS } from "../buttons/Button";

export default function Navbar({
	links,
}: {
	links: { label: string; to?: string; action?: Function }[];
}) {
	const { pathname } = useLocation();

	const isActive = (path: string) => pathname.startsWith("/" + path);

	return (
		<nav className="navbar">
			{links.map((e) =>
				e?.action ? (
					<Button
						key={`navbar-action-${e.label}-to-${e?.action}`}
						onClick={e?.action}
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
