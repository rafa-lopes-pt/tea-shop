import { useAsyncError, useRouteError } from "react-router-dom"
import ErrorPage from "./ErrorPage"

export default function GenericErrorBoundary() {
    const error = useRouteError() ?? useAsyncError()

    return <ErrorPage
        title={`Oh dear! A spot of trouble in our teacups. We're brewing a fix. Try again in a moment.`}
        error={error}
    />
}