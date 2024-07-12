import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Id } from 'react-toastify'
import responseHandler from '../../apis/responseHandler'
import RestAPI from '../../apis/server.endpoints'
import { notifyToastPromiseSuccess } from '../../components/alerts/toasts/promise.notifier'
import SectionWrapper from '../misc/SectionWrapper'
import { useThrowAsyncError } from '../../hooks/useThrowAsyncError.hook'
import Frame from '../misc/Frame'


export default function ActivationPage() {

    const { token } = useParams()
    const navigation = useNavigate()
    const ref = useRef(true)
    const throwError = useThrowAsyncError()
    useEffect(() => {
        if (ref.current) {

            responseHandler(() => RestAPI.activate(token as string), (_res: Response, toastId: Id) => {

                notifyToastPromiseSuccess(toastId, "Success!")
                navigation("/login")
                return true;

            }).then(res => {
                !res && throwError(new Error("There seems to be a problem activating your account. Please request a new link through the sign up form, or try again later."))
            })

            ref.current = false
        }
    }, [ref])

    return (
        <>

            <Frame></Frame>
            <main id="main">
                <SectionWrapper className="account-activation">
                    <h2>Activating Your Account</h2>
                </SectionWrapper></main>
        </>
    )
}
