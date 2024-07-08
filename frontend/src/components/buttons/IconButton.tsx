import FontAwesomeIcons from "../misc/Icons";


export default function IconButton({
	icon,
	onClick = () => { },
	className = "",
}: {
	icon: FontAwesomeIcons;
	onClick?: Function;
	className?: string;
}) {
	return (
		<button
			className={`icon-btn ${className}`}
			onClick={() => onClick()}>
			<i className={icon}></i>
		</button>
	);
}
