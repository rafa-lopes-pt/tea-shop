import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outlined" | "link" | "danger";

}
export default function Button({
	variant = "primary",
	className = "",
	type = "button",
	children,
	...props
}: ButtonProps
) {
	return (
		<button
			{...props}
			type={type}
			className={`btn btn--${variant} ${className}`}>
			<span>{children}</span>
		</button>
	);
}
