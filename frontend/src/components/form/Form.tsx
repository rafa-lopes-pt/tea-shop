import { motion } from "framer-motion";
import React, { FormHTMLAttributes, HTMLAttributes } from "react";
import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";
import Button, { ButtonProps } from "../buttons/Button";
import Input, { InputProps } from "../input/Input";
import Toggle from "../buttons/Toggle";

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
	 * Control that requires the definition of name property
	 */
	interface FormControlProps<T extends FieldValues>
		extends InputProps,
		FormControlValidationProps<T> {
		name: Path<T>;
	}
	/**
	 * Used for preset form components that already have a name defined
	 */
	interface FormControlPresetProps<T extends FieldValues>
		extends InputProps,
		FormControlValidationProps<T> {
		name?: Path<T>;
	}

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
	 * Detects the input type and creates the appropriate component.
	 * Creates a form input and registers a field with the value of name property
	 * Automatically sets the invalidText prop from formState
	 */
	export const Control = <T extends FieldValues>({
		register,
		formState,
		className = "",
		...props
	}: FormControlProps<T>) => {


		if (typeof formState?.defaultValues?.[props.name] === "boolean") {
			return (
				<Toggle
					{...props}
					{...register(props.name)}
					className={"form__control " + className}
				/>
			);
		}

		/**
		 * Gets the error message of the target formStatus field, even if its nested
		 */
		const getErrorMessage = (targetFieldName: string, value: any): string | undefined => {
			//No error message
			if (!targetFieldName || !value) { return undefined }

			//Check if the target field is nested inside another field
			if (/\./.test(targetFieldName)) {
				return getErrorMessage(targetFieldName.split(".")[1], value[targetFieldName.split(".")[0]]);
			}
			//Return the error message of the target field
			else {
				return value?.[targetFieldName]?.message as string | undefined;
			}

		}


		return (
			<Input
				{...props}
				{...register(props.name)}
				className={"form__control " + className}
				invalidText={getErrorMessage(props.name, formState?.errors)}
			/>
		);
	};

	/**
	 * Creates a form button with type submit
	 */
	export const Submit = (props: ButtonProps) => (
		<Button  {...props} type="submit" />
	);

	export const Separator = () => <hr className="form__separator" />;

	/**
	 * ==== Preset Components ====
	 * The components bellow represent implementations of form components with default values for ease of development
	 *
	 */
	export const Email = <T extends FieldValues>(
		{ name = "email" as Path<T>, label = "Email", ...props }: FormControlPresetProps<T>
	) => (
		<Control
			{...props}
			label={label}
			type={"email"}
			name={name}
		/>
	);

	export const Password = <T extends FieldValues>(
		{ name = "password" as Path<T>, label = "Password", ...props }: FormControlPresetProps<T>
	) => (
		<Control
			{...props}
			label={label}
			type="password"
			name={name}
		/>
	);

	export const Name = <T extends FieldValues>(
		{ name = "name" as Path<T>, label = "Name", ...props }: FormControlPresetProps<T>
	) => (
		<Control
			{...props}
			label={label}
			name={name}
		/>
	);
}
