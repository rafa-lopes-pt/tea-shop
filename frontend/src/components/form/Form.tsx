import { motion } from "framer-motion";
import React, { FormEvent, FormHTMLAttributes } from "react";
import { FieldValues, FormState, Path, UseFormRegister } from "react-hook-form";
import Button, { ButtonProps } from "../buttons/Button";
import Toggle from "../buttons/Toggle";
import Input, { InputProps } from "../input/Input";
import TextareaComponent, { TextareaProps } from "../input/Textarea"

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
	//NOTE: Couldn't figure out the proper type, ts creates a conflict with HTMLFormAttributes and MotionProps
	animationProps?: any;
	middleware?: Function;
	honeyPotFieldName?: string;
}

export function Form({
	children,
	animationProps,
	className = "",
	honeyPotFieldName,
	onSubmit,
	...props
}: FormProps) {

	const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		//check honeypot
		if (honeyPotFieldName && (new FormData(e.target as HTMLFormElement)).get(honeyPotFieldName)) {
			return; //begone foul bot! YOU SHALL NOT PASS!!!
		}

		onSubmit && onSubmit(e);
	}

	return (
		<motion.form
			{...animationProps}
			{...props}
			noValidate={
				props?.noValidate === undefined ? true : props.noValidate
			}
			className={"form " + className}
			onSubmit={onSubmitHandler}
		>
			{honeyPotFieldName && <input type="text" name={honeyPotFieldName} className="form__control--special" />}
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
	 */interface FormControlProps<T extends FieldValues>
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
	interface FormTextareaProps<T extends FieldValues> extends TextareaProps, FormControlValidationProps<T> {
		name: Path<T>
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
					disabled={formState?.isSubmitting}
				/>
			);
		}
		return (
			<Input
				{...props}
				{...register(props.name)}
				className={"form__control " + className}
				invalidText={getErrorMessage(props.name, formState?.errors)}
				disabled={formState?.isSubmitting}
			/>
		);
	};
	/**
	 * 
	 * @param props 
	 * @returns 
	 */
	export const Textarea = <T extends FieldValues>({
		register,
		formState,
		className = "",
		...props
	}: FormTextareaProps<T>) => {
		return <TextareaComponent
			{...props}
			{...register(props.name)}
			className={"form__control form__textarea" + className}
			invalidText={getErrorMessage(props.name, formState?.errors)}
			disabled={formState?.isSubmitting}
		/>
	}
	/**
	 * Creates a form button with type submit
	 */
	export const Submit = ({ formState, ...props }: ButtonProps & { formState: FormState<any> }) => (
		<Button
			{...props}
			type="submit"
			disabled={
				props.disabled !== undefined ?
					props.disabled :
					Object.keys(formState.touchedFields).length === 0 || formState.isSubmitting
			} />
	);
	export const Reset = ({ variant = "outlined", formState, ...props }: ButtonProps & { formState: FormState<any> }) => (
		<Button
			{...props}
			variant={variant} 
			type="reset"
			disabled={
				props.disabled !== undefined ?
					props.disabled :
					Object.keys(formState.touchedFields).length === 0 || formState.isSubmitting
			} />
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
