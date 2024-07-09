import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { DialogProps } from '../../../components/alerts/dialogs/Dialog';
import Button from '../../../components/buttons/Button';
import { Form } from '../../../components/form/Form';
import { SupportEmailSchema, SupportEmailSchemaType } from '../../../../../shared/schemas/SupportEmail.schema';
import RestAPI from '../../../apis/server.endpoints';
import responseHandler from '../../../apis/responseHandler';
import { Id } from 'react-toastify';
import { notifyToastPromiseSuccess } from '../../../components/alerts/toasts/promise.notifier';
import { useState } from 'react';

export interface EmailDialogProps extends DialogProps {
    onCancel: () => void,
};

const EmailDialog = ({
    type = "info",
    backdrop = true,
    closeOnBackdropClick = false,
    ...props
}: EmailDialogProps) => {

    const onBackdropClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            handleDialogClose()
        }
    }

    const { register, formState, handleSubmit, reset } = useForm<SupportEmailSchemaType>({
        resolver: zodResolver(SupportEmailSchema)
    })

    const [wasSubmitted, setWasSubmitted] = useState(false)

    const onSubmitHandler = async (data: any) => {
        // reset();
        await responseHandler(() =>
            RestAPI.emailSupport(data), (_data: any, toastId: Id) => {
                setWasSubmitted(true)
                notifyToastPromiseSuccess(toastId, "Ticket Created")
            })

    }

    const handleDialogClose = () => {
        reset();
        setWasSubmitted(false)
        props.onCancel()
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
                onClick={e => onBackdropClickHandler(e)}
            >
                <div
                    className='dialog__container'
                    autoFocus={true}
                >
                    <header className='dialog__header'>
                        <i className={`fa-solid fa-circle-info dialog__header__icon`}></i>
                        <h1 className='dialog__header__title'>{props.title}</h1>
                    </header>

                    {!wasSubmitted &&
                        <Form id="support-email-form" className='dialog__body email-dialog-body' onSubmit={handleSubmit(onSubmitHandler)}>
                            <Form.Email
                                outlined
                                name={'user'}
                                register={register}
                                formState={formState}
                            />

                            <Form.Textarea
                                outlined
                                name="message"
                                label='Message'
                                register={register}
                                formState={formState}
                            />
                        </Form>}

                    {wasSubmitted &&
                        <div className='dialog__header'>
                            Thanks for your email. Our team will reply as soon as possible.
                        </div>
                    }


                    <footer className='dialog__footer'>
                        <Button onClick={handleDialogClose} variant='outlined'>{wasSubmitted ? "close" : "cancel"}</Button>

                        {!wasSubmitted && <Form.Submit
                            form='support-email-form'
                            variant={"primary"}
                            className='dialog__confirm'
                        > Send</Form.Submit >}

                    </footer >
                </div >

            </motion.div >
            }
        </AnimatePresence >
        , document.body);
}

export default EmailDialog;