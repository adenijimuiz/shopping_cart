import { useEffect, useState } from 'react'

const useProduct = () => {
  const [products, setProduct] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => setError(err))
  };

  useEffect(() => {
    fetchProducts()
  }, [products, error])

  return {
    products, error
  }
}

export default useProduct