import { createContext, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";

import useWindowSize from "../../hooks/useWindowSize";

import { useDispatch } from "react-redux";
import { userLogout } from "../../store/features/authSlice";

const SidebarContext = createContext();

export default function SideNavigation({ children }) {
  const windowSize = useWindowSize();

  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout(false));
    navigate("/");
  };

  useEffect(() => {
    if (windowSize?.width <= 946) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [windowSize?.width]);

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col  shadow-sm bg-white">
          <div className="p-4 pb-10 flex justify-between items-center">
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? (
                <LuChevronFirst size={16} />
              ) : (
                <LuChevronLast size={16} />
              )}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 py-10">{children}</ul>
          </SidebarContext.Provider>

          <div
            className="flex p-3 mx-2 mb-10  cursor-pointer rounded-lg hover:bg-black hover:text-white transition-all duration-300"
            onClick={handleLogout}
          >
            <div className={`flex items-center overflow-hidden `}>
              <IoLogOutOutline size={22} />
              {expanded && (
                <div className="leading-4 ml-3">
                  <span className="text-lg">Logout</span>
                </div>
              )}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active = false, alert, url }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <Link to={url}>
      <li
        className={`relative text-lg flex items-center py-3  px-3 my-1 font-medium rounded-md cursor-pointer transition-all duration-300 group mb-4 capitalize  ${
          active
            ? "bg-black text-white bg-gradient-to-tr  bg-secondary "
            : " hover:text-black hover:bg-white"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-5 py-3 ml-6 bg-light text-secondary  invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap text-sm !bg-white !text-black`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
