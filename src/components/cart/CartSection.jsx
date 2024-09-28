import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartContent from "./Content";
import { IoCloseOutline } from "react-icons/io5";

import EmptyCartImage from "../../assets/images/empty-cart.jpg";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function CartSection({ show, setShow }) {
  const cart = useSelector((state) => state.cart?.data);
  const navigate = useNavigate();
  const cartRef = useRef(null);

  const handleGoToShop = () => {
    navigate("/");
    setShow(!show);
  };

  useOnClickOutside(cartRef, () => setShow(false));

  const renderEmtpyCart = () => {
    return (
      <>
        {!cart ||
          (cart?.length === 0 && (
            <div className="flex flex-col items-center gap-10">
              <img src={EmptyCartImage} alt="" />
              <h3 className="text-3xl sm:text-5xl font-semibold capitalize">
                your cart is <span className="text-orange-600">empty</span>
              </h3>
              <button className="btn !text-lg" onClick={handleGoToShop}>
                Continue shopping
              </button>
            </div>
          ))}
      </>
    );
  };
  return (
    <>
      <section
        className={`fixed top-0 right-0 h-full w-full flex justify-end  bg-black/50 transition-all duration-300
          ${
            show
              ? "opacity-100 pointer-events-auto visible"
              : "opacity-0 pointer-events-none invisible"
          }
          `}
      >
        {/* Cart Content Goes Here --------- */}
        <div
          ref={cartRef}
          className={`bg-white max-w-[40rem] w-full p-8 sm:p-12 space-y-8 transition-all duration-300
          ${show ? "-translate-x-0" : "translate-x-[100%]"} 
          `}
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl text-black font-semibold">Cart</h2>
              {cart?.length > 0 && (
                <p className="text-gray-500">{cart?.length} items</p>
              )}
            </div>
            <IoCloseOutline
              size={22}
              className="cursor-pointer"
              onClick={() => setShow(!show)}
            />
          </div>

          <div>
            {renderEmtpyCart()}
            <CartContent />
          </div>
        </div>
      </section>
    </>
  );
}
