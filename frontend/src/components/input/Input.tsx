import { InputHTMLAttributes, Ref, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	invalidText?: string;
	outlined?: boolean
}

const Input = forwardRef(
	(
		{
			label = "",
			type = "text",
			invalidText,
			spellCheck = false,
			className = "",
			...props
		}: InputProps,
		ref: Ref<HTMLInputElement>
	) => {
		return (
			<div className={`input ${props.outlined ? "input--outlined" : ""} ` + className}>
				<input
					{...props}
					ref={ref}
					type={type}
					spellCheck={spellCheck}
					className="input__element"
					placeholder={label}
				/>
				<label
					htmlFor={props?.id}
					className="input__label">
					{label}
				</label>
				<AnimatePresence>
					{invalidText && (
						<motion.p
							initial={{ opacity: 0, translateY: "100%" }}
							animate={{
								opacity: 1,
								translateY: "0%",
							}}
							exit={{
								opacity: 0,
								translateY: "100%",
							}}
							transition={{ duration: 0.3 }}
							className="input__invalid-text">
							{invalidText}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		);
	}
);
export default Input;
