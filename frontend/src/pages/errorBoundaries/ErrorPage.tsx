import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import Button from '../../components/buttons/Button'
import Frame from '../misc/Frame'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage({ title, error, showRefreshButton = true }: { title: string, error?: Error | unknown, showRefreshButton?: boolean }) {
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false)
    const errMessage = useMemo(() => error instanceof Error ? <>
        {error?.name && <p>
            <span className='error-boundary__error__field-name'>Name:</span>
            {error.name}
        </p >}
        {error?.message && <p>
            <span className='error-boundary__error__field-name'>Message:</span>
            {error.message}
        </p >}
        {error?.cause && <p>
            <span className='error-boundary__error__field-name'>Cause:</span>
            {JSON.stringify(error.cause)}
        </p >}
        {error?.stack && <p>
            <span className='error-boundary__error__field-name'>Stack:</span>
            {error?.stack}
        </p >}
    </> : "<empty>", [error])

    return (
        <>
            <Frame></Frame>
            <main id="main" className='error-boundary'>
                <h1 className='error-boundary__title'>{title}</h1>
                <AnimatePresence>
                    {showMessage &&
                        <motion.div
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { height: "auto", opacity: 1 },
                                collapsed: { height: 0, opacity: 0 }
                            }}
                            transition={{
                                duration: 0.15
                                , ease: "easeOut"
                            }}
                            className="error-boundary__error">
                            {errMessage}
                        </motion.div>
                    }
                </AnimatePresence>
                <span className='error-boundary__actions'>
                    {(error as any) &&
                        <Button variant={showMessage ? "outlined" : "primary"} onClick={() => setShowMessage(prev => !prev)}>{showMessage ? "Hide" : "Show"} log</Button>}
                    {showRefreshButton &&
                        <Button variant='outlined' onClick={() => navigate("/")}>Refresh</Button>}

                </span>
                <p className="error-boundary__support">
                    Need a calming cup of support? Contact our team at <span className="error-boundary__support__contact">rafalopessecond@gmail.com</span></p>
            </main>
        </>
    )
}
