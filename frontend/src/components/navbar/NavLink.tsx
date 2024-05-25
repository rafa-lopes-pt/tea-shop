import { NavLink as RouterLink } from "react-router-dom";
import { BUTTON_VARIANTS } from "../buttons/Button";

export default function NavLink({
	to,
	variant = BUTTON_VARIANTS.outlined,
	children,
}: {
	to: string;
	variant?: BUTTON_VARIANTS;
	children: any;
}) {
	return (
		<RouterLink
			to={to}
			className={`btn btn--${variant}`}>
			<span>{children}</span>
		</RouterLink>
	);
}
