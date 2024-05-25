export default function Button({
	variant = "primary",
	children,
	onClick = () => {},
	className = "",
}: {
	onClick?: Function;
	variant?: "primary" | "outlined";
	children: string;
	className?: string;
}) {
	return (
		<button
			onClick={() => onClick()}
			type="button"
			className={`btn btn--${variant} ${className}`}>
			<span>{children}</span>
		</button>
	);
}
