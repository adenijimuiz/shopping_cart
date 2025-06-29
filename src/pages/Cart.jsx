import React from 'react'
import { useCart } from '../context/CartContext';
import useProduct from '../hooks/useProducts';
import { CiTrash } from "react-icons/ci";
import Title from '../components/Title';
import CouponInput from '../components/CouponInput';

const Cart = () => {
  const {products} = useProduct();
   const { state, dispatch, subtotal, discount, total } = useCart();

   const cartRows = Object.entries(state.items)
  return (
    <div className="mt-8">
       <h2 className="text-xl font-semibold mb-4"><Title text1={'Your'} text2={'Cart'}/></h2>
      {cartRows.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <table className="w-full">
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
            <tr>
              <th className='px-4 py-3 font-semibold truncate'>Item</th>
              <th className='px-4 py-3 font-semibold truncate'>Qty</th>
              <th className='px-4 py-3 font-semibold truncate'>Price</th>
              <th className='px-4 py-3 font-semibold truncate'></th>
            </tr>
          </thead>
          <tbody>
            {cartRows.map(([id, qty]) => {
              const p = products.find(pr => pr.id === Number(id));
              if (!p) return null;
              return (
                <tr key={id} className='border-b border-gray-500/20'>
                  <td className='px-3 py-3'>{p.name}</td>
                  <td className="flex items-center gap-2 px-3 py-3 truncate">
                    <button onClick={() => dispatch({type:"DEC", id})}>−</button>
                    {qty}
                    <button onClick={() => dispatch({type:"INC", id})}>+</button>
                  </td>
                  <td className='px-3 py-3'>₦ {(p.price * qty).toLocaleString()}</td>
                  <td className='px-3 py-3'>
                    <button onClick={() => dispatch({type:"DEL", id})} className='cursor-pointer'><CiTrash /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* totals */}
      <div className=" mt-10 space-y-1 flex flex-col justify-end items-end">
        <div className="text-2xl">
          <Title text1={'CART'} text2={'TOTALS'}/>
        </div>

        <div className='flex flex-col gap-2 mt-2'>
          <div className='flex flex-col gap-2 justify-between'>
            <p>Subtotal: ₦ {subtotal.toLocaleString()}</p>
            {state.coupon && <p>Discount (13.2%): −₦{discount.toLocaleString()}</p>}
          </div>

          <CouponInput />

          <p className="font-bold mt-4">Total: ₦ {total.toLocaleString()}</p>

        </div>
        
        
      </div>

    </div>
  )
}

export default Cart