export enum BUTTON_VARIANTS {
	primary = "primary",
	outlined = "outlined",
}

export default function Button({
	variant = BUTTON_VARIANTS.primary,
	children,
	onClick = () => {},
	className = "",
}: {
	onClick?: Function;
	variant?: BUTTON_VARIANTS;
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
