import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/buttons/Button'
import { CartCtx, CartCtxProperties } from '../../store/cart.context'
import CartItem from './CartItem'

export default function CartList() {
  const { cart, totalPrice } = useContext(CartCtx) as CartCtxProperties
  const navigate = useNavigate()


  return (
    <div className='cart-list'>
      {cart?.length === 0 &&
        <span className='cart-list__empty'>
          <h3>Uh oh! Did you forget the most important ingredient... tea?</h3>
          <Button onClick={() => navigate("/")} variant='outlined'>Go to Shop</Button></span>}

      <ul className='cart-items-wrapper'>
        {cart?.map(e => <CartItem key={e._id} item={e} />)}
      </ul>

      <div className='cart-list__total'>
        {totalPrice}$
      </div>
    </div>
  )
}
