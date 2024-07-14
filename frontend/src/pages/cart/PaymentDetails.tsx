import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Id } from 'react-toastify';
import { OrderSchema, OrderSchemaType, OrderState } from '../../../../shared/schemas/order.schema';
import { UserSchemaType } from '../../../../shared/schemas/user.schema';
import responseHandler from '../../apis/responseHandler';
import RestAPI from '../../apis/server.endpoints';
import { notifyToastPromiseSuccess } from '../../components/alerts/toasts/promise.notifier';
import { Form } from '../../components/form/Form';
import FontAwesomeIcons from '../../components/misc/Icons';
import { AuthCtx } from '../../store/auth.context';
import { CartCtx, CartCtxProperties } from '../../store/cart.context';

export default function PaymentDetails() {
  const user = useContext(AuthCtx)?.user as UserSchemaType
  const { cart, clear } = useContext(CartCtx) as CartCtxProperties
  const navigate = useNavigate()
  const { register, handleSubmit, formState, reset } = useForm<OrderSchemaType>({
    resolver: zodResolver(OrderSchema),
    values: { email: user.email, billingInfo: { ...user }, items: cart ?? [], createdAt: 0, state: OrderState.PROCESSING }
  });



  const onSubmitHandler = async (data: OrderSchemaType) => {
    console.log(data)
    await responseHandler(() => RestAPI.placeOrder(data), (_data: Response, toastId: Id) => {
      notifyToastPromiseSuccess(toastId, "Order in Process!")
      clear()
      reset()
      navigate("/")
    })
  }



  return (
    <div className='cart-checkout'>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>

        <div className="cart-checkout__shipping">
          <h3>Shipping Details</h3>
          <Form.Control register={register} formState={formState} name='billingInfo.country' label='Country' />
          <Form.Control register={register} formState={formState} name='billingInfo.city' label='City' />
          <Form.Control register={register} formState={formState} name='billingInfo.zipCode' label='Postal Code' />
          <Form.Control register={register} formState={formState} name='billingInfo.street' label='Street' />

        </div>

        <Form.Separator />

        <div className="cart-checkout__payment">
          <h3>Payment Details</h3>
          <div className='cart-checkout__payment__tbd'><h4>Stage 1 Feature</h4>
            <p>Check out the Github docs for more info</p></div>

        </div>

        <Form.Separator />

        <Form.Submit formState={formState}>Pay <i className={FontAwesomeIcons.card}></i></Form.Submit>

      </Form>



    </div>
  )
}
