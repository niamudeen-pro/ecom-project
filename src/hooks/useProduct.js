import { useState } from "react";
import { fetchProducts } from "../services/api/products";
import { useQuery } from "@tanstack/react-query";

export default function useProduct() {
  const [allproducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    const {
      data: { products: allProducts },
    } = await fetchProducts("/products?limit=0");

    setAllProducts(allProducts || []);
    return true;
  };

  useQuery({
    queryKey: ["all_products"],
    queryFn: getAllProducts,
  });

  return { allproducts };
}
