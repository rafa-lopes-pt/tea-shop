import { ImgHTMLAttributes } from "react";
import LazyLoad from 'react-lazyload';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    placeholder?: string
    error?: string
}


export default function Image({ className, placeholder = "/media/tea-cup.svg", error = placeholder, ...props }: ImageProps) {


    return (
        <LazyLoad
            overflow={true}
            offset={300}
            unmountIfInvisible={true}
            className={"image " + className}
            placeholder={<img {...props} src={placeholder} className={"image__img image__img--placeholder" + className} />}
        >
            <img className={"image__img"} src={props.src} onError={(e) => {
                const el = e.target as HTMLImageElement
                el.src = error
                el.classList.add("image__img--error")
            }} />
        </LazyLoad>
    )
}

