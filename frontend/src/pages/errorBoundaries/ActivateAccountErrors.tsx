import { useRouteError } from 'react-router-dom';
import ErrorPage from './ErrorPage';

export default function ActivateAccountErrors() {
  const error = useRouteError() as Error

  return (
    <ErrorPage title="We've Spilled The Tea" message={error.message} />
  )
}
