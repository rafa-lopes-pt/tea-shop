import { motion } from "framer-motion";
import Button, { BUTTON_VARIANTS } from "../buttons/Button";
import React, { FormEvent } from "react";

export function Form({
	children,
	animationProps,
}: {
	children: React.ReactNode;
	animationProps: any;
}) {
	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		console.log("submited");
	};

	return (
		<motion.form
			{...animationProps}
			className="form"
			onSubmit={onSubmitHandler}>
			{children}
		</motion.form>
	);
}
export namespace Form {
	export const ToggleVisibilityButton = ({
		onClick,
		children,
	}: {
		children: string;
		onClick: Function;
	}) => (
		<Button
			variant={BUTTON_VARIANTS.link}
			onClick={onClick}>
			{children}
		</Button>
	);

	export const Header = ({
		title,
		children,
	}: {
		title: string;
		children?: React.ReactNode;
	}) => (
		<span className="form__header">
			<h1>{title}</h1>
			{children}
		</span>
	);

	export const Body = ({ children }: { children: React.ReactNode }) => (
		<span className="form__body">{children}</span>
	);

	export const Submit = ({ children }: { children: string }) => (
		<Button type="submit">{children}</Button>
	);
}
