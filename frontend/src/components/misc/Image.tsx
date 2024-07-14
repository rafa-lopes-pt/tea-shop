import { ImgHTMLAttributes } from "react";
import LazyLoad from 'react-lazyload';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    placeholder?: string
    error?: string
}


export default function Image({ className, placeholder = "/media/tea-cup.svg", error = placeholder, ...props }: ImageProps) {


    return (
        <LazyLoad
            offset={100}
            className={"image " + className}
            placeholder={<img {...props} src={placeholder} className={"image__img" + className} />}
        >
            <img className={"image__img"} src={props.src} onError={(e) => {
                const el = e.target as HTMLImageElement
                el.src = error
            }} />
        </LazyLoad>
    )
}

