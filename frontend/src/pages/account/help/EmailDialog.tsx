import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Id } from 'react-toastify';
import { SupportEmailSchema, SupportEmailSchemaType } from '../../../../../shared/schemas/support-email.schema';
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

    const onSubmitHandler = async (data: SupportEmailSchemaType) => {
        await responseHandler(() =>
            RestAPI.emailSupport(data), (_data: any, toastId: Id) => {
                notifyToastPromiseSuccess(toastId, "Ticket Created")
            })

    }

    const onDialogCloseHandler = async () => {
        reset();
        onCancel && onCancel()

    }


    return <Dialog {...props} formId='support-email-form' onCancel={!formState.isSubmitted ? onDialogCloseHandler : undefined} onConfirmText={formState.isSubmitted ? "Close" : "Send"} onConfirm={formState.isSubmitted ? onDialogCloseHandler : () => { }}>
        <>
            {!formState.isSubmitted &&
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

            {formState.isSubmitted &&
                <div className='dialog__header'>
                    Thanks for your email. Our team will reply as soon as possible.
                </div>
            }
        </>
    </Dialog>
}

export default EmailDialog;