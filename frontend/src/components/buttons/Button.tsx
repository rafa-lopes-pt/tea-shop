export default function Button({
	variant = "primary",
	children,
	onClick = () => {},
	className = "",
	type = "button",
}: {
	onClick?: Function;
	variant?: "primary" | "outlined" | "link";
	children: string;
	className?: string;
	type?: "button" | "submit";
}) {
	return (
		<button
			onClick={() => onClick()}
			type={type}
			className={`btn btn--${variant} ${className}`}>
			<span>{children}</span>
		</button>
	);
}
