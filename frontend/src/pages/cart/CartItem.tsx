import { useContext } from 'react'
import { CartItemSchemaType } from '../../../../shared/schemas/cart-item.schema'
import IconButton from '../../components/buttons/IconButton'
import FontAwesomeIcons from '../../components/misc/Icons'
import { CartCtx, CartCtxProperties } from '../../store/cart.context'
import Image from '../../components/misc/Image'
import im from "../../../public/media/white_tea.jpg"

export default function CartItem({ item }: { item: CartItemSchemaType }) {
    const { addItem, removeItem, deleteItem } = useContext(CartCtx) as CartCtxProperties

    const prettyPrice = (item.price * item.quantity).toFixed(2) + "$"

    return (
        <div className='cart-item'>


            <Image className='cart-item__img' src={im} alt="item" />
            <p className='cart-item__name'>{item.name}</p>

            <span className='cart-item__quantity'>
                <IconButton className='cart-item__remove' icon={FontAwesomeIcons.remove} onClick={() => removeItem(item)} />
                <p className='cart-item__indicator'>{item.quantity}</p>
                <IconButton className='cart-item__add' icon={FontAwesomeIcons.add} onClick={() => addItem(item)} />
            </span>


            <IconButton className='cart-item__delete' icon={FontAwesomeIcons.trash} onClick={() => deleteItem(item)} />

            <p className="cart-item__price">{prettyPrice}</p>

        </div>
    )
}
