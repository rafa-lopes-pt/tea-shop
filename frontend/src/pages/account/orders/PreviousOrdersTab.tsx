import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { OrderSchemaType } from "../../../../../shared/schemas/order.schema";
import responseHandler from "../../../apis/responseHandler";
import RestAPI from "../../../apis/server.endpoints";
import Dialog, { DialogProps } from "../../../components/alerts/dialogs/Dialog";
import OrderItem from "./OrderItem";


export default function PreviousOrdersTab() {
    const [orders, setOrders] = useState<OrderSchemaType[] | null>(null)

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
                {!orders &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="prev-orders-tab__empty">
                        <h3>Our finest china is being polished for your order history...</h3>
                    </motion.div>
                }

                {orders && orders.length === 0 &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="prev-orders-tab__empty">
                        <h3>We see you haven't embarked on your tea journey yet. Your first cup awaits!</h3>
                    </motion.div>
                }
                {
                    orders && orders.length > 0 && orders.map(e => {

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
                                            title: "Order #" + e.createdAt,
                                            onConfirm: () => setShowDialog(false),
                                            onConfirmText: "Close",
                                            children: <div className="order-info__list">{
                                                e.items.map(item =>
                                                    <OrderItem item={item} key={"prev-order-" + e.createdAt + "-" + item._id} />
                                                )
                                            }</div>

                                        })

                                    setShowDialog(true)
                                }
                                }
                            >
                                <span>Date: {date}</span>
                                <span>Total: {total.toFixed(2)} $</span>
                                <span>{e.state}</span>
                            </motion.div >
                        )
                    })
                }

            </AnimatePresence>

        </div >
    )


}
