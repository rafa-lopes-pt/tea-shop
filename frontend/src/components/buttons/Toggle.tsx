import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
};

const Toggle = forwardRef(
	(
		{ label, className = "", ...props }: ToggleProps,
		ref: Ref<HTMLInputElement>

	) => {
		return (
			<label className={"toggle-wrapper " + className}>
				{label && <span className="toggle-label">{label}</span>}

				<input {...props} type="checkbox" className="toggle__input" aria-hidden ref={ref} />
				<div className="toggle">
					<div className="toggle__slider-wrapper">

						<div className="toggle__slider"></div>
					</div>
				</div>
			</label>
		);
	})

export default Toggle