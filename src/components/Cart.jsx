import React from 'react'
import { useCart } from '../context/CartContext';
import useProduct from '../hooks/useProducts';

const Cart = () => {
  const {products} = useProduct();
   const { state, dispatch, subtotal, discount, total } = useCart();

   const cartRows = Object.entries(state.items)
  return (
    <div className="mt-8">
       <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {cartRows.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr><th>Item</th><th>Qty</th><th>Price</th><th></th></tr>
          </thead>
          <tbody>
            {cartRows.map(([id, qty]) => {
              const p = products.find(pr => pr.id === Number(id));
              if (!p) return null;
              return (
                <tr key={id}>
                  <td>{p.name}</td>
                  <td className="flex items-center gap-2">
                    <button onClick={() => dispatch({type:"DEC", id})}>−</button>
                    {qty}
                    <button onClick={() => dispatch({type:"INC", id})}>+</button>
                  </td>
                  <td>₦{(p.price * qty).toLocaleString()}</td>
                  <td>
                    <button onClick={() => dispatch({type:"DEL", id})}>Remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* totals */}
      <div className="text-right mt-4 space-y-1">
        <p>Subtotal: ₦{subtotal.toLocaleString()}</p>
        {state.coupon && <p>Discount (13.2%): −₦{discount.toLocaleString()}</p>}
        <p className="font-bold">Total: ₦{total.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default Cart