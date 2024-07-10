import Frame from '../misc/Frame'

export default function ErrorPage({ title, message }: { title: string, message: string }) {
    return (
        <>
            <Frame></Frame>
            <main id="main" className='error-container'>
                <h1>{title}</h1>
                <p className="error-message">{message}</p>
            </main>
        </>
    )
}
