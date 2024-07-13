import { ReactNode, createContext, useEffect, useMemo, useReducer } from "react";
import { CartItemSchemaType } from "../../../shared/schemas/cart-item.schema";

export type CartCtxProperties = {
    cart: CartItemSchemaType[] | null;
    addItem: (payload: CartItemSchemaType) => void
    removeItem: (payload: CartItemSchemaType) => void
    deleteItem: (payload: CartItemSchemaType) => void
    clear: () => void
    totalPrice: string
    isEmpty: () => boolean
};

export const CartCtx = createContext<CartCtxProperties | null>(null);

enum CartActionType {
    ADD,
    REMOVE,
    DELETE,
    CLEAR,
    LOAD
}
type CartAction = { type: CartActionType, payload?: CartItemSchemaType }

const cartReducer = (state: CartItemSchemaType[], action: CartAction) => {
    switch (action.type) {
        case CartActionType.ADD: {
            if (!action.payload) return state;

            for (let i = 0; i < state.length; i++) {
                if (state[i]?._id === action.payload._id) {
                    const arr = [...state]
                    arr.splice(i, 1, { ...state[i], quantity: state[i].quantity++ })
                    return arr
                }
            }
            return [...state, action.payload]
        }
        case CartActionType.REMOVE: {
            if (!action.payload) return state;

            for (let i = 0; i < state.length; i++) {

                if (state[i]?._id === action.payload._id) {

                    const arr = [...state]
                    const item = { ...arr[i] }

                    if (item.quantity > 1) {
                        item.quantity--
                        arr[i] = item
                    } else {
                        arr.splice(i, 1)
                    }
                    return arr
                }

            }
            return [...state, action.payload]
        }
        case CartActionType.DELETE: {
            if (action.payload) {

                for (let i = 0; i < state.length; i++) {
                    if (state[i]?._id === action.payload._id) {
                        const arr = [...state]
                        arr.splice(i, 1)
                        return arr
                    }
                }
            }

            return state;

        }
        case CartActionType.CLEAR: { return [] }

        default: return state
    }
}


export const CartCtxProvider = ({ children }: { children?: ReactNode }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], loadPrevCart)

    function loadPrevCart() {
        try {
            return JSON.parse(window.localStorage.getItem("cart") as string)
        } catch (error) {
            return []
        }


    }
    useEffect(() => {
        window.localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addItem = (payload: CartItemSchemaType) => {
        dispatch({ type: CartActionType.ADD, payload })
    }

    const removeItem = (payload: CartItemSchemaType) => {
        dispatch({ type: CartActionType.REMOVE, payload })
    }

    const deleteItem = (payload: CartItemSchemaType) => {
        dispatch({ type: CartActionType.DELETE, payload })
    }

    const clear = () => {
        dispatch({ type: CartActionType.CLEAR })
    }

    const totalPrice = useMemo(() => {
        return cart.reduce((sum, e) => sum + e.price * e.quantity, 0).toFixed(2)
    }, [cart])

    const isEmpty = () => cart.length === 0

    return (
        <CartCtx.Provider value={{ cart, addItem, removeItem, deleteItem, clear, totalPrice, isEmpty }}>{children}</CartCtx.Provider>
    );
};
