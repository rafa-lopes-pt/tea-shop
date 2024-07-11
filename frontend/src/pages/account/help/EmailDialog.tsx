import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Id } from 'react-toastify';
import { SupportEmailSchema, SupportEmailSchemaType } from '../../../../../shared/schemas/SupportEmail.schema';
import responseHandler from '../../../apis/responseHandler';
import RestAPI from '../../../apis/server.endpoints';
import Dialog, { DialogProps } from '../../../components/alerts/dialogs/Dialog';
import { notifyToastPromiseSuccess } from '../../../components/alerts/toasts/promise.notifier';
import { Form } from '../../../components/form/Form';

const EmailDialog = ({
    onCancel, onConfirm,
    ...props
}: Omit<DialogProps, "children">) => {


    const { register, formState, handleSubmit, reset } = useForm<SupportEmailSchemaType>({
        resolver: zodResolver(SupportEmailSchema)
    })

    const [wasSubmitted, setWasSubmitted] = useState(false)

    const onSubmitHandler = async (data: SupportEmailSchemaType) => {
        setWasSubmitted(true)
        await responseHandler(() =>
            RestAPI.emailSupport(data), (_data: any, toastId: Id) => {
                setWasSubmitted(true)
                notifyToastPromiseSuccess(toastId, "Ticket Created")
            })

    }

    const onDialogCloseHandler = () => {
        reset();
        setWasSubmitted(false)
        onCancel && onCancel()
    }


    return <Dialog {...props} formId='support-email-form' onCancel={onDialogCloseHandler} onConfirm={wasSubmitted ? onDialogCloseHandler : () => { }}>
        <>
            {!wasSubmitted &&
                <Form id="support-email-form" className='email-dialog-body' onSubmit={handleSubmit(onSubmitHandler)}>
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
        </>
    </Dialog>
}

export default EmailDialog;