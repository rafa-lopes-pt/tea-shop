import { ReactNode, createContext, useEffect, useMemo, useReducer } from "react";
import { CartItemSchemaType } from "../../../shared/schemas/cart-item.schema";

export type CartCtxProperties = {
    cart: CartItemSchemaType[] | null;
    add: (payload: CartItemSchemaType) => void
    remove: (payload: CartItemSchemaType) => void
    clear: () => void
    totalPrice: () => number
    isEmpty: () => boolean
};

export const CartCtx = createContext<CartCtxProperties | null>(null);

enum CartActionType {
    ADD,
    REMOVE,
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
                    return [...state].splice(i, 1, { ...state[i], quantity: state[i].quantity++ })
                }
            }
            return [...state, action.payload]
        }
        case CartActionType.REMOVE: {
            if (action.payload) {
                for (let i = 0; i < state.length; i++) {
                    if (state[i]?._id === action.payload._id) {
                        return [...state].splice(i, 1)
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

    const add = (payload: CartItemSchemaType) => {
        dispatch({ type: CartActionType.ADD, payload })
    }

    const remove = (payload: CartItemSchemaType) => {
        dispatch({ type: CartActionType.REMOVE, payload })
    }

    const clear = () => {
        dispatch({ type: CartActionType.CLEAR })
    }

    const totalPrice = () => {
        return cart.reduce((sum, e) => sum + e.price, 0)
    }

    const isEmpty = () => cart.length === 0

    return (
        <CartCtx.Provider value={{ cart, add, remove, clear, totalPrice, isEmpty }}>{children}</CartCtx.Provider>
    );
};
