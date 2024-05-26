export enum BUTTON_VARIANTS {
	primary = "primary",
	outlined = "outlined",
	link = "link",
}

export default function Button({
	variant = BUTTON_VARIANTS.primary,
	children,
	onClick = () => {},
	className = "",
	type = "button",
}: {
	onClick?: Function;
	variant?: BUTTON_VARIANTS;
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
