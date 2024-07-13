import SectionWrapper from '../misc/SectionWrapper'
import CartList from './CartList'
import PaymentDetails from './PaymentDetails'

export default function CartPage() {

    return (
        <SectionWrapper className='cart'>

            <h1>Cart</h1>

            <PaymentDetails />

            <CartList />


        </SectionWrapper>
    )
}
