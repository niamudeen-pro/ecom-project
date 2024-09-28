import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/api/products";
import Rating from "../components/shared/Rating";
import Skeleton from "../components/shared/Skeleton";
import { FaImage } from "react-icons/fa6";
import StaticButtons from "../components/StaticButton";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/features/cartSlice";
import { sendNotification } from "../utils/notifications";
import Loader from "../components/shared/Loader";

export default function ProuductPage() {
  const { id: productId } = useParams();
  const [activeImg, setActiveImg] = useState("");

  const cart = useSelector((state) => state.cart?.data);
  const dispatch = useDispatch();

  const getProductsById = async () => {
    const response = await fetchProducts(`/products/${productId}`);
    return response?.data || {};
  };

  const { data: product, isLoading: fetchingProduct, isError } = useQuery({
    queryKey: ["products", productId],
    queryFn: getProductsById,
    retry: false,
  });


  const handleCartProduct = (product) => {
    if (!product) return;
    if (cart && cart.find((item) => item.id === product.id)) {
      return sendNotification("warning", "Proudct already exists in the cart");
    } else {
      dispatch(addToCart(product));
      return sendNotification("success", "Proudct added to the cart successfully");
    }
  };

  if (fetchingProduct) return <Loader />

  return (
    <>
      <section className={`min-h-[60rem] customContainer flexCenter`}>
        {product && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-80 lg:gap-20 w-full py-10">
            {fetchingProduct ? (
              <Skeleton className="h-[45rem] sm:!h-[50rem] max-w-[60rem]">
                <FaImage size={34} className="text-white" />
              </Skeleton>
            ) : (
              <div className="h-[45rem]  sm:h-[50rem]  max-w-[60rem] bg-gray-100/80 rounded-xl space-y-4 mx-auto">
                <img
                  src={activeImg ? activeImg : product.thumbnail}
                  alt="Product"
                  className="object-contain imgHover"
                />

                {/* images array */}
                <div className="grid grid-cols-4 gap-4">
                  {product?.images?.length &&
                    product.images.map((image) => (
                      <div
                        className="bg-gray-100/80 rounded-xl cursor-pointer"
                        onClick={() => setActiveImg(image)}
                      >
                        <img
                          key={image}
                          src={image}
                          alt="Product"
                          className="h-[10rem] w-[15rem] imgHover object-contain"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {fetchingProduct ? (
              <div className="flex flex-col space-y-8">
                <Skeleton className="w-1/2" />
                <Skeleton className="w-1/2" />
                <Skeleton className="w-1/2" />
              </div>
            ) : (
              <div className="space-y-6">
                <p className="capitalize">{product.category}</p>
                <h2 className="font-normal text-5xl sm:text-8xl">
                  {product.title}
                </h2>
                <span className="text-gray-400 flex gap-2 items-center text-xl">
                  <Rating count={1} />
                  {product.rating?.toFixed(1)}
                </span>
                <p>{product.description}</p>
                <p className="capitalize text-green-400 font-semibold">
                  {product.availabilityStatus}
                </p>
                <p className="text-3xl !text-black font-semibold">
                  {`$${Math.floor(product.price)}`}
                </p>
                {!fetchingProduct && (
                  <button
                    className="btn capitalize !py-5 !px-16 w-full"
                    onClick={() => handleCartProduct(product)}
                  >
                    add to cart
                  </button>
                )}
              </div>
            )}
          </section>
        )}


        {isError &&
          <p className="!w-full mx-auto text-center text-2xl">Product not found ...</p>
        }

      </section>
      <StaticButtons />
    </>
  );
}
