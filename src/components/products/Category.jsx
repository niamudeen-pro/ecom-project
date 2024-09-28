import { useState } from "react";
import { POPULAR_CATEGORIES } from "../../constants";
import CustomDropdown from "../shared/CustomDropdown";
export default function Category({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  const [activePopulateCategory, setActivePopulateCategory] =
    useState("womens-bags");

  const handleCategoryChange = (category) => {
    if (!category) return;
    setActiveCategory(category);
  };

  const renderPopularCategories = () => {
    return (
      <>
        {POPULAR_CATEGORIES?.length > 0 &&
          POPULAR_CATEGORIES.map((category) => (
            <button
              key={category}
              className={`capitalize ${
                activePopulateCategory === category
                  ? "btn"
                  : "btn !bg-gray-100 !shadow !text-black"
              } `}
              onClick={() => {
                handleCategoryChange(category);
                setActivePopulateCategory(category);
              }}
            >
              {category}
            </button>
          ))}
      </>
    );
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {renderPopularCategories()}
      <CustomDropdown
        categoryList={categories}
        handleCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
      />
    </div>
  );
}
