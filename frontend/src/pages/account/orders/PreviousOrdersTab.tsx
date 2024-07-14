import { useEffect, useRef, useState } from "react";
import { OrderSchemaType } from "../../../../../shared/schemas/order.schema";
import responseHandler from "../../../apis/responseHandler";
import RestAPI from "../../../apis/server.endpoints";
import Dialog, { DialogProps } from "../../../components/alerts/dialogs/Dialog";
import Image from "../../../components/misc/Image";
import { AnimatePresence, motion } from "framer-motion";


export default function PreviousOrdersTab() {
    const [orders, setOrders] = useState<OrderSchemaType[]>([])

    const cycleRef = useRef(true)
    useEffect(() => {
        if (cycleRef.current) {
            responseHandler(RestAPI.getOrders, async (res: Response) => {
                setOrders((await res.json()).data)

            })
            cycleRef.current = false
        }

    }, [cycleRef.current])

    const [showDialog, setShowDialog] = useState(false)
    const [dialogData, setDialogData] = useState<DialogProps>({ show: false, title: "", children: "" })

    return (
        <div className="prev-orders-tab">

            <Dialog  {...dialogData} show={showDialog}></Dialog>


            <AnimatePresence presenceAffectsLayout={true} initial={false}>
                {orders.length === 0 &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="prev-orders-tab__empty">
                        <h3>We see you haven't embarked on your tea journey yet. Your first cup awaits!</h3>
                    </motion.div>
                }
                {
                    orders.length > 0 && orders.map(e => {

                        const date = new Date(e.createdAt).toLocaleDateString("en-GB")
                        const total = e.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

                        return (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="prev-orders-tab__item accordion-item__header"
                                key={"prev-orders-tab-order-#" + e.createdAt}
                                onClick={() => {
                                    setDialogData(
                                        {
                                            show: dialogData ? true : false,
                                            title: "Order #" + e.createdAt,
                                            onConfirm: () => setShowDialog(false)
                                            , onConfirmText: "Close"
                                            , children: <div className="order-info__list">{
                                                e.items.map(item =>
                                                    <div className="order-info__item" key={"prev-order-" + e.createdAt + "-" + item._id}>
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
                                }
                            >
                                <span>Date: {date}</span>
                                <span>Total: {total} $</span>
                                <span>{e.state}</span>
                            </motion.div >
                        )
                    })
                }

            </AnimatePresence>

        </div >
    )


}
