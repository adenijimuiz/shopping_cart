import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CouponInput() {
  const REGEX = /^POWERLABSx$/i;
  const { dispatch } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg]   = useState("");

  function apply() {
    const ok = REGEX.test(code.trim());
    dispatch({ type: "COUPON", valid: ok });
    setMsg(ok ? "Coupon applied!" : "Invalid code");
  }

  return (
    <div className="mt-6 flex gap-2">
      <input
        type="text"
        value={code}
        placeholder="Enter coupon"
        onChange={e => setCode(e.target.value)}
        className="border p-2 flex-1"
      />
      <button onClick={apply} className="bg-green-600 text-white px-3 py-2 rounded">
        Apply
      </button>
      {msg && <span className="text-sm">{msg}</span>}
    </div>
  );
}
