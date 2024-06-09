import { AnimatePresence, motion } from 'framer-motion'
import { Children, ReactElement, ReactNode, cloneElement } from 'react'

export interface AccordionItemProps {
    children?: ReactElement | ReactElement[]
    className?: string
    isCollapsed?: boolean
    onToggle?: () => void
}

export function AccordionItem({ children, onToggle, ...props }: AccordionItemProps) {
    return (
        <div
            className={`accordion-item ${props.className}`}
            data-collapsed={props.isCollapsed}
        >
            {Children.map(children, (child) => {

                if (child && child.type === AccordionItem.Body) {

                    return (
                        <AnimatePresence initial={false}>
                            {!props?.isCollapsed && child}
                        </AnimatePresence>)

                }
                else if (child && child.type === AccordionItem.Header) {
                    return cloneElement(child, { onToggle })
                }
                else throw new Error("Child is not part of the AccordionItem namespace. Received: " + child?.type)

            })}

        </div>
    )
}

export namespace AccordionItem {

    export function Header({ children, onToggle }: { children?: ReactNode, onToggle?: Function }) {
        return <header className='accordion-item__header' onClick={() => onToggle && onToggle()}>
            <span className='accordion-item__header__content'>{children}</span>
            <i className="fa-solid fa-chevron-down accordion-item__header__icon"></i>
        </header>
    }

    export function Body({ children }: { children?: ReactNode }) {

        return <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
                open: { height: "auto" },
                collapsed: { height: 0 }
            }}
            transition={{
                duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]
            }}
            className='accordion-item__body-wrapper'
        >
            <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                    open: { transform: "scale(1)" },
                    collapsed: {
                        transform: "scale(0.8)", transition: { duration: 0.8, ease: "easeOut" }
                    }
                }}
                transition={{
                    duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98]
                }}

                className='accordion-item__body '>
                {children}
            </motion.div>
        </motion.div >
    }

}