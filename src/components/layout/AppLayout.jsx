import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getItemsFromLocalStorage } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { updateCart } from "../../store/features/cartSlice";
import Navbar from "./Navbar";
import { ToastContainerNotification } from "../../utils/notifications";
import { useAuth } from "../../store/features/authSlice";

export default function AppLayout() {
  const dispatch = useDispatch();
  const authUser = useAuth();

  useEffect(() => {
    const cart = getItemsFromLocalStorage("cart", true);
    if (cart) {
      dispatch(updateCart(cart));
    }
  }, [dispatch]);

  if (authUser?.isLoggedIn) return <Navigate to="/dashboard" />;

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <ToastContainerNotification />
    </>
  );
}
