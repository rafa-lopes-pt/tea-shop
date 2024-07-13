import React, { useContext } from 'react'
import { CartCtx, CartCtxProperties } from '../../store/cart.context'
import CartItem from './CartItem'
import Button from '../../components/buttons/Button'
import { useNavigate } from 'react-router-dom'

export default function CartList() {
  const { cart, totalPrice } = useContext(CartCtx) as CartCtxProperties
  const navigate = useNavigate()
  return (
    <div className='cart-list'>
      {cart?.length === 0 &&
        <span className='cart-list__empty'>
          <h3>Uh oh! Did you forget the most important ingredient... tea?</h3>
          <Button onClick={() => navigate("/")} variant='outlined'>Go to Shop</Button></span>}
      {cart?.map(e => <CartItem key={e._id} item={e} />)}
    </div>
  )
}
