import { useState } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import { CiShoppingCart } from "react-icons/ci";
import { NavLink, Route, Routes } from 'react-router-dom';
import { useCart } from './context/CartContext';




function App() {
   const { state } = useCart();  // 👈 Access cart state
  const totalItems = Object.values(state.items).reduce((sum, qty) => sum + qty, 0);  // 👈 Count all items

  return (
    <main className='max-w-3xl mx-auto p-6'>
      <nav className='flex justify-between items-center mb-4'>
        <NavLink to={'/'}>POWERLABS Shop</NavLink>

        <NavLink to={'/cart'} className='relative flex items-center'>
          <CiShoppingCart className='w-7 h-7 min-w-5'/>

          {totalItems > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{totalItems}</p>
          )}
          
        </NavLink>
      </nav>

      <Routes>
        <Route path='/' element={<ProductList />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
      
      
    </main>
  )
}

export default App
