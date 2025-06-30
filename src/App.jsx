import { useState } from 'react'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import { CiShoppingCart } from "react-icons/ci";
import { NavLink, Route, Routes } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Title from './components/Title';




function App() {
   const { state } = useCart();
  const totalItems = Object.values(state.items).reduce((sum, qty) => sum + qty, 0);

  return (
    <main className='max-w-3xl mx-auto p-6'>
      <nav className='flex justify-between items-center mb-4 border-b border-b-white/55 shadow-lg py-3'>
        <NavLink to={'/'}><Title text1={'Power'} text2={'Labs'}/></NavLink>

        <NavLink to={'/cart'} className='relative flex items-center'>
          <CiShoppingCart className='w-7 h-7 min-w-5'/>

          {totalItems > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] animate-bounce">{totalItems}</p>
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
