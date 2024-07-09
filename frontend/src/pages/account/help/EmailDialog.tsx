import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { DialogProps } from '../../../components/alerts/dialogs/Dialog';
import Button from '../../../components/buttons/Button';
import { Form } from '../../../components/form/Form';
import { SupportEmailSchema, SupportEmailSchemaType } from './SupportEmail.schema';

export interface EmailDialogProps extends DialogProps {
    onConfirm: (data: any) => void
    onCancel: () => void,
};

const EmailDialog = ({
    type = "info",
    backdrop = true,
    closeOnBackdropClick = false,
    ...props
}: EmailDialogProps) => {

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            reset()
            closeOnBackdropClick && props.onCancel && props.onCancel()
        }
    }

    const { register, formState, handleSubmit, reset } = useForm<SupportEmailSchemaType>({
        resolver: zodResolver(SupportEmailSchema)
    })


    return createPortal(
        <AnimatePresence>
            {props.show && <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: `blur(${backdrop ? 10 : 0}px)` }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ backdropFilter: { duration: 0.1, ease: "easeOut" }, duration: 0.25, ease: "easeInOut" }}

                className='dialog '
                data-backdrop={backdrop}
                onClick={e => handleBackdropClick(e)}
            >
                <div
                    className='dialog__container'
                    autoFocus={true}
                >
                    <header className='dialog__header'>
                        <i className={`fa-solid fa-circle-info dialog__header__icon`}></i>
                        <h1 className='dialog__header__title'>{props.title}</h1>
                    </header>


                    <Form id="support-email-form" className='dialog__body email-dialog-body' onSubmit={handleSubmit((data) => {
                        reset();
                        props.onConfirm(data)
                    })}>
                        <Form.Email
                            outlined
                            name={'to'}
                            register={register}
                            formState={formState}
                        />

                        <Form.Textarea
                            outlined
                            name="body"
                            label='Message'
                            register={register}
                            formState={formState}
                        />
                    </Form>


                    <footer className='dialog__footer'>
                        <Button onClick={() => {
                            reset()
                            props.onCancel()
                        }} variant='outlined'>Cancel</Button>
                        <Form.Submit
                            form='support-email-form'
                            variant={"primary"}
                            className='dialog__confirm'
                        > Send</Form.Submit >
                    </footer >
                </div >

            </motion.div >
            }
        </AnimatePresence >
        , document.body);
}

export default EmailDialog;