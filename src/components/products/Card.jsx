import { useNavigate } from "react-router-dom";
import Rating from "../shared/Rating";
import Skeleton from "../shared/Skeleton";
import { FaImage } from "react-icons/fa6";
export default function ProductCard({ product, isLoading }) {
  const navigate = useNavigate();

  const goToProduct = (productId) => {
    if (!productId) return;
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <div
        key={product.id}
        className={`p-6 rounded-xl max-w-[30rem] ${isLoading ? "min-h-[34rem]" : "min-h-[38rem]"
          }  w-full mx-auto relative cursor-pointer`}
        onClick={() => goToProduct(product.id)}
      >
        {isLoading ? (
          <>
            <Skeleton className="!h-[20rem]">
              <FaImage size={22} className="text-white" />
            </Skeleton>
            <div className="p-8 space-y-8 capitalize absolute left-0 bottom-0 w-full">
              <Skeleton className="w-full" />
              <div className="flexSbs">
                <Skeleton className="w-1/3" />
                <Skeleton className="w-1/3" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* top section */}
            <div className="bg-gray-100/80 rounded-xl">
              <img
                src={product.thumbnail}
                alt="Product"
                className="h-[25rem] object-contain imgHover"
                loading="lazy"
              />
            </div>
            {/* content section  */}
            <div className="p-6 space-y-3 capitalize absolute left-0 bottom-0 w-full">
              <h3 className="text-2xl text-gray-400">
                {product.title.substring(0, 20)}..more
              </h3>
              <div className="text-gray-400 text-lg flex gap-2  items-center">
                <Rating count={1} />
                <p>{product.rating.toFixed(1)}</p>
              </div>
              <h3 className="text-2xl font-semibold">
                ${Math.floor(product.price)}
              </h3>
              {/* <h3 className="text-2xl font-semibold flex items-center">
                <MdCurrencyRupee />
                {Math.floor(product.price)}
              </h3> */}
            </div>
          </>
        )}
      </div>
    </>
  );
}
