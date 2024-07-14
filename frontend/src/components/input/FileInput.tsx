import { ChangeEvent, useRef } from "react";
import Image from "../misc/Image";

export interface FileInputProps {
	src?: string;
	error?: string;
	placeholder?: string;
	className?: string;
	onChange: Function;
	alt?: string;
}

export default function FileInput({
	src,
	className = "",
	onChange,
	alt,
}: FileInputProps) {
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
			<Image
				src={src}
				error="/media/user-image-placeholder.jpg"
				alt={alt}
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
