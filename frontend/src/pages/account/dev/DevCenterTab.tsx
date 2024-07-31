import { useState } from 'react'
import { Id } from 'react-toastify'
import responseHandler from '../../../apis/responseHandler'
import RestAPI from '../../../apis/server.endpoints'
import notifyToastPromise, { notifyToastPromiseSuccess } from '../../../components/alerts/toasts/promise.notifier'
import Button from '../../../components/buttons/Button'

export default function DevCenterTab() {
  const [error, setError] = useState<any>(null)

  const throwError = () => setError({ i_am_the_error_you_triggered_in_the_dev_center: "" })
  const invalidateSession = () => {
    window.sessionStorage.removeItem("session-lifetime")
    /*
    If you're reading this...please don't be scared of the highly advanced security features of my application!
    ====================================================================
    ============== I SHALL NOT DO THIS IN YOUR PROJECT =================
    ====================================================================
    I'm fully aware of the problems related to this approach...this will be improved on future stages!!!
    */
    // navigate("/login")
    location.reload()
  }
  const failedAsync = async () => {
    notifyToastPromise(new Promise((_resolve, reject) => setTimeout(() => reject(), 1500)))
  }

  const markAllOrdersAsShipped = async () => {
    responseHandler(RestAPI.markAllOrdersAsShipped, async (res: Response, toastId: Id) => notifyToastPromiseSuccess(toastId, (await res.json()).data))
  }

  return (
    <div className='dev-center'>
      <div className='dev-center__note'>
        <h3>Glad you're here!</h3>
        <div className='dev-center__note__box'>
          <p>Hi there fellow web surfer. Hope you like my project! 🤓 </p>
          <p>This tab provides some triggers to special events that should not occur during normal conditions, such as those pesky errors no one likes.</p>
        </div>
      </div>

      <div className="dev-center__triggers">
        <Button variant='outlined' onClick={throwError}>
          Throw Breaking Error
        </Button>
        <Button variant='outlined' onClick={failedAsync}>
          Failed Async Operation
        </Button>
        <Button variant='outlined' onClick={invalidateSession}>
          Invalidate Session
        </Button>
        <Button variant='outlined' onClick={markAllOrdersAsShipped}>
          Mark All Orders as Delivered
        </Button>
      </div>

      <footer>
        <p>Want to trigger something else? Let's <a href='https://www.linkedin.com/in/rafael-lopes-software-developer/' target='_blank'>schedule an interview</a> and discuss that!</p>
        <p>PS: click on the support email from the error page </p>
      </footer>
      {error}
    </div >
  )
}
