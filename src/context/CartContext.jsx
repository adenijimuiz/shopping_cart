import { createContext, useReducer, useContext } from "react";
import useProducts from "../hooks/useProducts";


const DISCOUNT_CODE = "POWERLABSx";
const DISCOUNT_RATE = 0.132;

export const CartContext = createContext(null);


function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        items: {
          ...state.items,
          [action.item.id]: (state.items[action.item.id] || 0) + 1,
        },
      };

    case "INC":
      return {
        ...state,
        items: { ...state.items, [action.id]: state.items[action.id] + 1 },
      };

    case "DEC":
      return {
        ...state,
        items: { ...state.items, [action.id]: Math.max(1, state.items[action.id] - 1) },
      };

    case "DEL": {
      const { [action.id]: _, ...rest } = state.items;
      return { ...state, items: rest };
    }

    case "COUPON":
      return { ...state, coupon: action.valid };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const { products } = useProducts();                
  const [state, dispatch] = useReducer(reducer, { items: {}, coupon: false });

  const subtotal = Object.entries(state.items).reduce((sum, [id, qty]) => {
    const price = products.find((p) => p.id === Number(id))?.price ?? 0;
    return sum + price * qty;
  }, 0);

  const discount = state.coupon ? subtotal * DISCOUNT_RATE : 0;
  const total = subtotal - discount;

  /* ---------- expose everything ---------- */
  const value = { state, dispatch, subtotal, discount, total };

  return <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
