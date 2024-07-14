import { AnimatePresence, motion } from 'framer-motion';
import { ReactElement } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../buttons/Button';
export type DialogProps = {
    type?: "info" | "danger",
    title?: string,
    children?: string | ReactElement,
    justifyBody?: boolean
    formId?: string,
    //
    onCancel?: (...args: any[]) => void,
    onCancelText?: string
    onConfirm?: (...args: any[]) => void,
    onConfirmText?: string
    //
    show?: boolean
    backdrop?: boolean
    closeOnBackdropClick?: boolean,

};

const Dialog = ({
    type = "info",
    onConfirmText = "Confirm",
    onCancelText = "Cancel",
    backdrop = true,
    closeOnBackdropClick = false,
    ...props
}: DialogProps) => {

    const onBackdropClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            closeOnBackdropClick && (props.onCancel && props.onCancel()) || (props.onConfirm && props.onConfirm())
        }
    }


    return createPortal(
        <AnimatePresence>
            {props.show && <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: `blur(${backdrop ? 10 : 0}px)` }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ backdropFilter: { duration: 0.1, ease: "easeOut" }, duration: 0.25, ease: "easeInOut" }}

                className='dialog '
                data-backdrop={backdrop}

                onClick={(e) => onBackdropClickHandler(e)}
            >
                <div
                    className='dialog__container'
                    autoFocus={true}
                    data-danger={type === "danger"}
                >
                    <header className='dialog__header' data-danger={type === "danger"}>
                        <i className={`fa-solid fa-circle-${type === "info" ? "info" : "exclamation"} dialog__header__icon`}></i>
                        <h1 className='dialog__header__title'>{props.title}</h1>
                    </header>

                    <div className={`dialog__body ${props.justifyBody ? "dialog__body--justify" : ""}`}>
                        {props.children}
                    </div>

                    <footer className='dialog__footer'>
                        {props.onCancel && <Button onClick={props.onCancel} variant='outlined'>{onCancelText}</Button>}
                        <Button
                            onClick={props.onConfirm}
                            variant={type === "danger" ? "danger" : "primary"}
                            className='dialog__confirm'
                            form={props?.formId}
                            type={props?.formId ? "submit" : "button"}
                        > {onConfirmText}</Button >
                    </footer >
                </div >

            </motion.div >
            }
        </AnimatePresence >
        , document.body);
}

export default Dialog;