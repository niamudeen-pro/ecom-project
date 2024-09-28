import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../store/features/cartSlice";
import { setItemsIntoLocalStorage } from "../utils/helper";
import { Link } from "react-router-dom";

export default SuccessPage;
function SuccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    setItemsIntoLocalStorage("cart", [], true);
    dispatch(updateCart([]));
  }, [dispatch]);

  return (
    <section className="section customContainer min-h-[80vh] flexCenter flex-col gap-8">
      <h2 className="text-3xl">
        Thank you ! your payement has received successfully.
      </h2>
      <Link to="/">
        <button className="btn capitalize">continue shopping</button>
      </Link>
    </section>
  );
}
