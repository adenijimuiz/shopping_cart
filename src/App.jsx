import { useState } from 'react'
import useProduct from './hooks/useProduct'




function App() {
  const {products, error} = useProduct()

    console.log(products, error)
  return (
    <>
      hello
    </>
  )
}

export default App
