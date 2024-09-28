import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import useWindowSize from "../../hooks/useWindowSize";
import { ROUTES } from "../../constants";
import BrandImage from "../../assets/images/shopping-bag_3.png";
import MainSearch from "../MainSearch";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const windowSize = useWindowSize();

  const toggle = () => {
    setIsNavOpen((prev) => !prev);
  };

  useEffect(() => {
    if (windowSize.width > 1280) {
      setIsNavOpen(false);
    }
  }, [windowSize.width]);
  return (
    <>
      <header className="customContainer w-full flex justify-between items-center py-20">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={BrandImage} alt="Brand Logo" className="w-16" />
        </Link>
        <nav
          className={
            isNavOpen
              ? "bg-white fixed top-0 left-0 h-screen w-full flex justify-center items-center z-50"
              : "hidden xl:block"
          }
        >
          <ul
            className={
              isNavOpen
                ? "flex flex-col justify-center items-center gap-14 capitalize"
                : "flex justify-between items-center gap-14 capitalize"
            }
          >
            {ROUTES?.length > 0 &&
              ROUTES?.filter(
                (route) => !route.private && !route.hidden && !route.excludeNav
              ).map((route) => (
                <li
                  key={route.id}
                  className={` ${
                    route.isButton
                      ? "btn"
                      : "hover:bg-gray-100 py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
                  }`}
                  onClick={() => setIsNavOpen(false)}
                >
                  <Link to={route.path}>{route.title}</Link>
                </li>
              ))}
          </ul>
        </nav>
        {isNavOpen ? (
          <IoCloseOutline
            className="cursor-pointer text-4xl xl:hidden z-50 fixed left-[50%]"
            onClick={toggle}
          />
        ) : (
          <HiBars3BottomRight
            className="cursor-pointer text-4xl xl:hidden"
            onClick={toggle}
          />
        )}
        <CiSearch
          onClick={() => setShowSearch(true)}
          size={24}
          className="cursor-pointer"
        />
      </header>
      <MainSearch showSearch={showSearch} setShowSearch={setShowSearch} />
    </>
  );
}
