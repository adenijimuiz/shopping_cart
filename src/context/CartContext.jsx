import { createContext, useReducer, useContext } from "react";
import useProducts from "../hooks/useProducts";   // ⬅️  hook that fetches products.json

/* ------------------------------------------------------------------ */
/*  1. CONSTANTS                                                      */
/* ------------------------------------------------------------------ */
const DISCOUNT_CODE = "POWERLABSx";
const DISCOUNT_RATE = 0.132;

/* ------------------------------------------------------------------ */
/*  2. CONTEXT SET‑UP                                                */
/* ------------------------------------------------------------------ */
export const CartContext = createContext(null);

/* ------------------------------------------------------------------ */
/*  3. REDUCER (pure function, declared once outside the component)   */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  4. PROVIDER COMPONENT                                             */
/* ------------------------------------------------------------------ */
export function CartProvider({ children }) {
  const { products } = useProducts();                // all product data
  const [state, dispatch] = useReducer(reducer, { items: {}, coupon: false });

  /* ---------- derived totals ---------- */
  const subtotal = Object.entries(state.items).reduce((sum, [id, qty]) => {
    const price = products.find((p) => p.id === Number(id))?.price ?? 0;
    return sum + price * qty;
  }, 0);

  const discount = state.coupon ? subtotal * DISCOUNT_RATE : 0;
  const total = subtotal - discount;

  /* ---------- expose everything ---------- */
  const value = { state, dispatch, subtotal, discount, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ------------------------------------------------------------------ */
/*  5. CONVENIENCE HOOK                                               */
/* ------------------------------------------------------------------ */
export const useCart = () => useContext(CartContext);
