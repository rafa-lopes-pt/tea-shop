import { ChangeEvent, useRef, useState } from "react";
export default function FileInput({
	initialValue,
	className = "",
	onChange,
	alt,
}: {
	initialValue?: string;
	className?: string;
	onChange: Function;
	alt?: string;
}) {
	const [src, setSrc] = useState(
		initialValue || "media/user-image-placeholder.jpg"
	);

	const handleImageUpload = (e: ChangeEvent) => {
		const file = (e.target as HTMLInputElement).files?.[0];

		if (!file) throw new Error("Unable to get file from input");

		const img = URL.createObjectURL(file);
		setSrc(img);
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
			/>
			<i className="fa-solid fa-file-arrow-up file-input__icon"></i>
			<input
				ref={ref}
				className="visually-hidden "
				type="file"
				onChange={handleImageUpload}></input>
		</div>
	);
}
