import React from "react";
import Button from "./Button";

export enum ICONS {
	youtube = "fa-brands fa-youtube",
	facebook = "fa-brands fa-facebook",
	instagram = "fa-brands fa-instagram",
	hamburger = "fa-solid fa-bars",
	left = "fa-solid fa-circle-chevron-left",
	right = "fa-solid fa-circle-chevron-right",
	question = "fa-solid fa-circle-question",
}

export default function IconButton({
	icon,
	onClick = () => {},
	className = "",
}: {
	icon: ICONS;
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
