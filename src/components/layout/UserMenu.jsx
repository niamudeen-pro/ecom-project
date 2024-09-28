import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import { PRIVATE_ROUTES } from "../../constants";
import { userLogout } from "../../store/features/authSlice";

export default function UserMenu() {
  const currentUser = useSelector((state) => state.authUser.data);

  const [show, setShow] = useState(false);
  const userMenuRef = useRef(null);
  useOnClickOutside(userMenuRef, () => setShow(false));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout(false));
    navigate("/");
  };

  function renderUserToggleIcon() {
    return (
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 "
        type="button"
        onClick={() => setShow(!show)}
      >
        <span className="sr-only">Open user menu</span>
        <span className="w-14 h-14 rounded-full bg-black text-white flexCenter text-xl uppercase">
          {currentUser?.username && currentUser.username[0]}
        </span>
      </button>
    );
  }

  function renderUserMenusLink({ path, title }) {
    return (
      <Link to={path} className="block px-4 py-2 hover:bg-gray-100" key={path}>
        <p className="text-gray-900">{title}</p>
      </Link>
    );
  }

  return (
    <div>
      {renderUserToggleIcon()}

      {show && (
        <div
          ref={userMenuRef}
          id="dropdownAvatar"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44  absolute top-28 right-10 text-lg text-gray-900"
        >
          <div className="px-4 py-3">
            <p className="text-gray-900 capitalize">
              {currentUser?.username && currentUser.username}
            </p>
          </div>
          <ul
            className="py-2 text-lg text-gray-700 "
            aria-labelledby="dropdownUserAvatarButton"
          >
            {PRIVATE_ROUTES &&
              PRIVATE_ROUTES.length > 0 &&
              PRIVATE_ROUTES.map((route) => renderUserMenusLink(route))}
          </ul>
          <div className="py-2">
            <button className="block px-4 py-2 !text-lg" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
