import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import responseHandler from '../../apis/responseHandler'
import RestAPI from '../../apis/server.endpoints'
import { notifyToastPromiseEnd, notifyToastPromiseSuccess } from '../../components/alerts/toasts/promise.notifier'
import SectionWrapper from '../misc/SectionWrapper'
import { Id } from 'react-toastify'
import { notifyErrorToast } from '../../components/alerts/toasts/toast.notifier'

export default function AccountActivation() {

    const { token } = useParams()

    const navigation = useNavigate()

    useEffect(() => {

        responseHandler(() => RestAPI.activate(token as string), (_res: Response, toastId: Id) => {
            notifyToastPromiseSuccess(toastId, "Success!")
            navigation("/login")
        })


    }, [])

    return (
        <SectionWrapper className="account-activation">
            <h2>Activating Your Account</h2>
        </SectionWrapper>
    )
}
