import { useForm } from 'react-hook-form';
import { Form } from '../../components/form/Form'
import { BillingInfoSchema, BillingInfoSchemaType } from '../../../../shared/schemas/billing-info.schema';
import { useContext } from 'react';
import { AuthCtx, AuthCtxProperties } from '../../store/auth.context';
import { zodResolver } from '@hookform/resolvers/zod';
import { Elements } from '@stripe/react-stripe-js';
import FontAwesomeIcons from '../../components/misc/Icons';

export default function PaymentDetails() {
  const { user } = useContext(AuthCtx) as AuthCtxProperties
  const { register, handleSubmit, formState } = useForm<BillingInfoSchemaType>({
    resolver: zodResolver(BillingInfoSchema),
    values: { ...user }
  });



  const onSubmitHandler = async (data: BillingInfoSchemaType) => true



  return (
    <div className='cart-checkout'>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>

        <div className="cart-checkout__shipping">
          <h3>Shipping Details</h3>
          <Form.Control register={register} formState={formState} name='country' label='Country' />
          <Form.Control register={register} formState={formState} name='city' label='City' />
          <Form.Control register={register} formState={formState} name='zipCode' label='Postal Code' />
          <Form.Control register={register} formState={formState} name='street' label='Street' />

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
