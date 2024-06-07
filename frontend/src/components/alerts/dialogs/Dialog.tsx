import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import Button from '../../buttons/Button';
type DialogProps = {
    type?: "info" | "danger",
    title: string,
    message: string,
    //
    onCancel?: () => void,
    onConfirm?: () => void,
    //
    show: boolean
    backdrop?: boolean
    closeOnBackdropClick?: boolean,
};

const Dialog = ({
    type = "info",
    backdrop = true,
    closeOnBackdropClick = false,
    ...props
}: DialogProps) => {

    const handleBackdropClick = () => {
        closeOnBackdropClick && props.onCancel && props.onCancel()

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

            >
                <div className='dialog__container' autoFocus={true} onBlur={() => handleBackdropClick()
                }>
                    <header className='dialog__header' data-danger={type === "danger"}>
                        <i className={`fa-solid fa-circle-${type === "info" ? "info" : "exclamation"} dialog__header__icon`}></i>
                        <h1 className='dialog__header__title'>{props.title}</h1>
                    </header>

                    <p className='dialog__body'>
                        {props.message}
                    </p>

                    <footer className='dialog__footer'>
                        {props.onCancel && <Button onClick={props.onCancel} variant='outlined'>Cancel</Button>}
                        <Button
                            onClick={props.onConfirm}
                            variant={type === "danger" ? "danger" : "primary"}
                            className='dialog__confirm'
                            data-danger={type === "danger"}
                        > Confirm</Button >
                    </footer >
                </div >

            </motion.div >
            }
        </AnimatePresence >
        , document.body);
}

export default Dialog;