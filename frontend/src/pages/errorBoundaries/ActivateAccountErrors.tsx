import { useRouteError } from 'react-router-dom';
import ErrorPage from './ErrorPage';

export default function ActivateAccountErrors() {
  const error = useRouteError() as Error

  return (
    <ErrorPage title={error.message} />
  )
}
