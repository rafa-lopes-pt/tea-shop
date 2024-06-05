import { NavLink as RouterLink } from "react-router-dom";

export default function NavLink({
	to,
	variant = "outlined",
	children,
}: {
	to: string;
	variant?: "primary" | "outlined";
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
