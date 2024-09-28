import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCartProdutQty } from "../../store/features/cartSlice";
import { setItemsIntoLocalStorage } from "../../utils/helper";

export default function QuantityInput({ prouductId, qty }) {
  const [count, setCount] = useState(qty ? qty : 1);

  const cart = useSelector((state) => state.cart?.data);
  const dispatch = useDispatch();

  useEffect(() => {
    setItemsIntoLocalStorage("cart", cart, true);
  }, [cart, count]);

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      dispatch(updateCartProdutQty({ id: prouductId, qty: count - 1 }));
    }
  };
  const handleIcrement = () => {
    setCount(count + 1);
    dispatch(updateCartProdutQty({ id: prouductId, qty: count + 1 }));
  };

  return (
    <div className="flex gap-4" key={prouductId}>
      <button className="qtyBtn" onClick={handleDecrement}>
        -
      </button>
      <button className="shadow px-4 rounded-lg">{count}</button>
      <button className="qtyBtn" onClick={handleIcrement}>
        +
      </button>
    </div>
  );
}
