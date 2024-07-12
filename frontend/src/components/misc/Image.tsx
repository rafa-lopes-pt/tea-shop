import { ImgHTMLAttributes } from "react";

export default function Image({ ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            onError={e =>
                (e.target as HTMLImageElement).style.display = "none"
            }
        />
    )
}
