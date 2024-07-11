import { ChangeEvent, useRef } from "react";
export default function FileInput({
	src,
	className = "",
	onChange,
	alt,
}: {
	src?: string;
	className?: string;
	onChange: Function;
	alt?: string;
}) {
	const handleImageUpload = (e: ChangeEvent) => {
		const file = (e.target as HTMLInputElement).files?.[0];

		if (!file) throw new Error("Unable to get file from input");

		onChange(file);
	};

	const ref = useRef<HTMLInputElement | null>(null);

	return (
		<div
			className={"file-input " + className}
			onClick={() => ref.current?.click()}>
			<img
				src={src}
				alt={alt}
				onError={e =>
					(e.target as HTMLImageElement).style.display = "none"
				}
			/>
			<i className="fa-solid fa-file-arrow-up file-input__icon"></i>
			<input
				ref={ref}
				className="visually-hidden "
				type="file"
				onChange={handleImageUpload}></input>
		</div >
	);
}
