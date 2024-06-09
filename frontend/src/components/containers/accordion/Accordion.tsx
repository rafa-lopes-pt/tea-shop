import { Children, ReactElement, ReactNode, cloneElement, forwardRef, useEffect, useRef, useState } from "react"
import { AccordionItem, AccordionItemProps } from "./AccordionItem";

export interface AccordionProps {
    className?: string;
    children: ReactElement | ReactElement[];
}

export default function Accordion({ className, children }: AccordionProps) {

    const [isOpen, setIsOpen] = useState<false | number>(false)

    return (
        <div className={`accordion-container ${className}`}>
            {
                Children.map(children, (child, index) => {
                    if (child.type !== AccordionItem) throw new Error("Accordion only accepts AccordionItem as children")

                    const childProps: AccordionItemProps = {
                        isCollapsed: isOpen !== index,
                        onToggle: () => {
                            setIsOpen(isOpen === index ? false : index)
                        }
                    }

                    return cloneElement(child, childProps)

                })

            }
        </div>
    )
}

