import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../services/api/products";
import Category from "./Category";
import ProductCard from "./Card";
import SectionText from "../shared/SectionText";
import UnavailableContent from "../shared/UnavailableContent";

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState("womens-bags");

  const getProductsByCategory = async () => {
    const response = await fetchProducts(`/products/category/${activeCategory}`);
    return response?.data?.products || [];
  };

  const getCategories = async () => {
    const response = await fetchProducts("/products/category-list");
    return response?.data
  };

  const { data: products, isLoading: fetchingProducts } = useQuery({
    queryKey: ["products", activeCategory],
    queryFn: getProductsByCategory,
  });


  const { data: categories } = useQuery({
    queryKey: ["products_categories"],
    queryFn: getCategories,
  });


  return (
    <>
      <section className="section customContainer space-y-10" id="newArrivals">
        {/* top section */}

        <div className="flexCenter">
          <SectionText
            title="New Arrivals"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem."
            textDirection="CENTER"
          />
        </div>

        {/* category section */}
        <div className="">
          <Category
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {/* products section */}
        {products && products?.length ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24  py-14
           max-h-[120rem] overflow-y-auto hide-scrollbar 
          "
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isLoading={fetchingProducts}
              />
            ))}
          </div>
        ) : (
          <UnavailableContent content="Products are currently unavailable" />
        )}
      </section>
    </>
  );
}
//
