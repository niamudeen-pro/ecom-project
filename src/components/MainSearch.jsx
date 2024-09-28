import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import useDebounce from "../hooks/useDebounce";
import UnavailableContent from "./shared/UnavailableContent";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProduct from "../hooks/useProduct";

export default function MainSearch({ setShowSearch, showSearch }) {
  const [query, setQuery] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);

  const debounceValue = useDebounce(query, 500);
  const navigate = useNavigate();

  const { allproducts } = useProduct();

  const searhcProducts = async () => {
    if (debounceValue === "" && !debounceValue) {
      setSearchProducts([]);
      return false;
    }
    if (allproducts.length === 0) return false;
    const filterProducts = allproducts.filter((product) => {
      return (
        product?.title?.toLowerCase().includes(debounceValue?.toLowerCase()) ||
        product?.category?.toLowerCase().includes(debounceValue?.toLowerCase())
      );
    });

    if (filterProducts?.length > 0) {
      setSearchProducts(filterProducts);
      return false;
    }
    return false;
  };

  useEffect(() => {
    if (query === "" || !query) {
      setSearchProducts([]);
    }
  }, [query]);

  useEffect(() => {
    if (!showSearch) {
      setQuery("");
      setSearchProducts([]);
    }
  }, [showSearch]);

  const handleGoToProduct = (productId) => {
    if (!productId) return;
    navigate(`/product/${productId}`);
    setShowSearch(false);
  };

  useQuery({
    queryKey: ["search_products", debounceValue],
    queryFn: searhcProducts,
  });

  return (
    <>
      {showSearch && (
        <section className="bg-white fixed top-0 left-0 w-full h-full z-50 flex flex-col gap-10 p-10">
          <IoCloseOutline
            className="cursor-pointer text-4xl  z-50 ml-auto"
            onClick={() => setShowSearch(!showSearch)}
            size={24}
          />
          <div class="max-w-md mx-auto">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-8 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="border-2 border-black py-6 px-20 rounded-xl w-full text-xl"
                placeholder="Search for products..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>

          {searchProducts && searchProducts.length > 0 ? (
            <div className="w-full max-h-[80rem] overflow-y-auto hide-scrollbar h-full bg-white z-10 space-y-5">
              {searchProducts.map((product) => (
                <div
                  className=" p-8 rounded-xl max-w-[50rem] w-full mx-auto relative cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                  key={product.id}
                  onClick={() => handleGoToProduct(product.id)}
                >
                  <div className="grid grid-cols-4">
                    <div className="w-24 h-24">
                      <img
                        src={product.thumbnail}
                        alt="Product"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="col-span-3">
                      <h3 className="text-2xl">{product.title}</h3>
                      <p>{product?.description?.substring(0, 50)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <UnavailableContent content="No products found yet." />
          )}
        </section>
      )}
    </>
  );
}
