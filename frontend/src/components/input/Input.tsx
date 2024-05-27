import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export default function Input({
	label,
	type = "text",
	spellCheck = false,
	...props
}: Props) {
	return (
		<div className="input">
			<input
				{...props}
				type={type}
				className="input__element"
				placeholder={label}
			/>
			<label
				htmlFor={props?.id}
				className="input__label">
				{label}
			</label>
		</div>
	);
}
