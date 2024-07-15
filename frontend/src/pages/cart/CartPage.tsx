import { useContext } from 'react'
import { AuthCtx } from '../../store/auth.context'
import SectionWrapper from '../misc/SectionWrapper'
import CartList from './CartList'
import PaymentDetails from './PaymentDetails'

export default function CartPage() {
    const isLoggedIn = useContext(AuthCtx)?.isLoggedIn
    if (!isLoggedIn) return <></>
    return (
        <SectionWrapper className='cart'>

            <h1>Cart</h1>

            <PaymentDetails />

            <CartList />


        </SectionWrapper>
    )
}
