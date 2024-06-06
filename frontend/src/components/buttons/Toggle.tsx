import { InputHTMLAttributes } from "react";

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
	// label: string;
};

export default function Toggle({ children, ...props }: ToggleProps) {
	return (
		<label className="toggle-wrapper">
			{children && <span className="toggle-label">{children}</span>}

			<input type="checkbox" className="toggle__input" aria-hidden  {...props} />
			<div className="toggle">
				<div className="toggle__slider-wrapper">

					<div className="toggle__slider"></div>
				</div>
			</div>
		</label>
	);
}
