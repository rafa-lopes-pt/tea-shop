import { motion } from "framer-motion";
import React, { FormHTMLAttributes } from "react";
import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";
import Button from "../buttons/Button";
import Input, { InputProps } from "../input/Input";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
	//NOTE: Couldn't figure out the proper type, ts creates a conflict with HTMLFormAttributes and MotionProps
	animationProps?: any;
}
export function Form({
	children,
	animationProps,
	className = "",
	...props
}: FormProps) {
	return (
		<motion.form
			{...animationProps}
			{...props}
			noValidate={
				props?.noValidate === undefined ? true : props.noValidate
			}
			className={"form " + className}>
			{children}
		</motion.form>
	);
}

export namespace Form {
	/**
	 * HookForm Properties used to register and validate a form field
	 */
	interface FormControlValidationProps<T extends FieldValues> {
		register: UseFormRegister<T>;
		formState?: FormState<T>;
	}
	/**
	 * Requires the definition of name property
	 */
	interface FormControlProps<T extends FieldValues>
		extends InputProps,
			FormControlValidationProps<T> {
		name: string;
	}
	/**
	 * Used for preset form components that already have a name defined
	 */
	interface FormControlPresetProps<T extends FieldValues>
		extends InputProps,
			FormControlValidationProps<T> {}

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

	/**
	 * Creates a form input and registers a field with the value of name property
	 * Automatically sets the invalidText prop from formState
	 */
	export const Control = <T extends FieldValues>({
		register,
		formState,
		className = "",
		...props
	}: FormControlProps<T>) => {
		return (
			<Input
				{...props}
				{...register(props.name as Path<T>)}
				className={"form__control " + className}
				invalidText={formState?.errors[props.name]?.message as string}
			/>
		);
	};

	/**
	 * Creates a form button with type submit
	 */
	export const Submit = ({ children }: { children: string }) => (
		<Button type="submit">{children}</Button>
	);

	/**
	 * ==== Preset Components ====
	 * The components bellow represent implementations of form components with default values for ease of development
	 *
	 */
	export const Email = <T extends FieldValues>(
		props: FormControlPresetProps<T>
	) => (
		<Control
			{...props}
			label="Email"
			type="email"
			name="email"
		/>
	);

	export const Password = <T extends FieldValues>(
		props: FormControlPresetProps<T>
	) => (
		<Control
			{...props}
			label="Password"
			type="password"
			name="password"
		/>
	);

	export const Name = <T extends FieldValues>(
		props: FormControlPresetProps<T>
	) => (
		<Control
			{...props}
			label="Name"
			name="name"
		/>
	);
}
