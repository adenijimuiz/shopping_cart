import useProducts from "../hooks/useProducts";
import { useCart } from "../context/CartContext";

export default function ProductList() {
  const { products, error } = useProducts();
  const { dispatch } = useCart();

  if (error) return <p className="text-red-600">Error: {error.message}</p>;
  if (!products.length) return <p>Loading…</p>;

  return (
    <ul className="grid md:grid-cols-2 gap-4">
      {products.map(p => (
        <li key={p.id} className="border rounded p-4 flex justify-between">
          <div>
            <h3 className="font-semibold">{p.name}</h3>
            <p>₦{p.price.toLocaleString()}</p>
          </div>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => dispatch({type:"ADD", item:p})}
          >
            Add
          </button>
        </li>
      ))}
    </ul>
  );
}
