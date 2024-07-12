import { ReactNode, createContext, useReducer } from "react";
import { CartItemSchemaType } from "../../../shared/schemas/cart-item.schema";

export type CartCtxProperties = {
    cart: CartItemSchemaType[] | null;
    add: (payload: CartItemSchemaType) => void
    remove: (payload: CartItemSchemaType) => void
    clear: () => void
    totalPrice: () => number
};

export const CartCtx = createContext<CartCtxProperties | null>(null);

enum CartActionType {
    ADD,
    REMOVE,
    CLEAR,
}
type CartAction = { type: CartActionType, payload?: CartItemSchemaType }

const cartReducer = (state: CartItemSchemaType[], action: CartAction) => {
    switch (action.type) {
        case CartActionType.ADD: {
            if (!action.payload) return state;

            for (let i = 0; i < state.length; i++) {
                if (state[i]?.id === action.payload.id) {
                    return [...state].splice(i, 1, { ...state[i], quantity: state[i].quantity++ })
                }
            }
            return [...state, action.payload]
        }
        case CartActionType.REMOVE: {
            if (action.payload) {
                for (let i = 0; i < state.length; i++) {
                    if (state[i]?.id === action.payload.id) {
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
    const [cart, dispatch] = useReducer(cartReducer, [])

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

    return (
        <CartCtx.Provider value={{ cart, add, remove, clear, totalPrice }}>{children}</CartCtx.Provider>
    );
};
