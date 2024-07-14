import { CartItemSchemaType } from '../../../../../shared/schemas/cart-item.schema'
import Image from '../../../components/misc/Image'

export default function OrderItem({ item }: { item: CartItemSchemaType }) {
    return (
        <div className="order-info__item" >
            <Image className='order-info__item__img' src={item.image} alt="" />
            <p className='order-info__item__name'>{item.name}</p>
            <p className="order-info__item__price">{(item.price * item.quantity).toFixed(2)}$</p>
            <p className="order-info__item__qt">Qt: {item.quantity}</p>
        </div>
    )
}
