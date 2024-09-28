import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SidebarItem } from "./SideNavigation";
import SideNavigation from "./SideNavigation";
import UserMenu from "./UserMenu";
import Loader from "../shared/Loader";
import { useQuery } from "@tanstack/react-query";
import { updateAuthUser, useAuth } from "../../store/features/authSlice";
import { PRIVATE_ROUTES, SERVER_URL } from "../../constants";

export default function AdminLayout({ children }) {
  const authUser = useAuth();
  const route = useLocation().pathname;
  const dispatch = useDispatch();

  const { isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(`${SERVER_URL}/auth/user`);

      if (response.data && response.data.code === "SUCCESS") {
        dispatch(updateAuthUser(response.data.user));
        return response.data.user;
      }
      return {};
    },
  });

  if (isLoading) return <Loader />;
  if (!authUser?.isLoggedIn) return <Navigate to="/" />;

  return (
    <>
      <section className="min-h-screen w-full flex relative">
        <SideNavigation>
          {PRIVATE_ROUTES &&
            PRIVATE_ROUTES.length > 0 &&
            PRIVATE_ROUTES.filter((menu) => menu?.private)?.map((menu) => {
              return (
                <SidebarItem
                  key={menu?.id}
                  icon={menu?.icon}
                  text={menu?.title}
                  alert
                  url={menu?.path}
                  active={route === menu?.path ? true : false}
                />
              );
            })}
        </SideNavigation>

        <main className="w-full max-h-screen px-4 hide-scrollbar bg-gray-100 border overflow-y-auto relative">
          <div className="flex items-center justify-end p-10">
            <UserMenu />
          </div>
          <section className="w-full flexCenter flex-col  p-5 sm:p-10 ">
            {children}
          </section>
        </main>
      </section>
    </>
  );
}
