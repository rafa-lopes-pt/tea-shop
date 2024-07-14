import { useEffect, useState } from "react";
import { OrderSchemaType } from "../../../../../shared/schemas/order.schema";
import responseHandler from "../../../apis/responseHandler";
import RestAPI from "../../../apis/server.endpoints";
import Dialog, { DialogProps } from "../../../components/alerts/dialogs/Dialog";
import Image from "../../../components/misc/Image";

export default function PreviousOrdersTab() {
    const [orders, setOrders] = useState<OrderSchemaType[]>([])

    useEffect(() => {
        responseHandler(RestAPI.getOrders, async (res: Response) => {
            setOrders((await res.json()).data)
        })
    }, [])

    const [showDialog, setShowDialog] = useState(false)
    const [dialogData, setDialogData] = useState<DialogProps>({ show: false, title: "", children: "" })

    return (
        <div className="prev-orders-tab">
            <Dialog  {...dialogData} show={showDialog}></Dialog>


            {orders && orders.map(e => {
                const date = new Date(e.createdAt).toLocaleDateString("en-GB")
                const total = e.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

                return (
                    <div onClick={() => {
                        setDialogData(
                            {
                                show: dialogData ? true : false,
                                title: "Order #" + e.createdAt,
                                onConfirm: () => setShowDialog(false)
                                , onConfirmText: "Close"
                                , children: <div className="orders-list">{
                                    e.items.map(item =>
                                        <div className="order-item" key={"prev-order-" + e.createdAt + "-" + item._id}>
                                            <Image className='order-item__img' src={item.image} alt="" />
                                            <p className='order-item__name'>{item.name}</p>
                                            <p className="order-item__price">{(item.price * item.quantity).toFixed(2)}$</p>
                                            <p className="order-item__qt">Qt: {item.quantity}</p>
                                        </div>
                                    )
                                }</div>

                            })

                        setShowDialog(true)
                    }
                    }>
                        <span>{date}</span>
                        <span>{total}</span>
                        <span>{e.state}</span>
                    </div >
                )
            })}
        </div>
    )


}
