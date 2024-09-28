import LandingPage from "../pages/landing-page/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashbaordPage";
import Speech from "../pages/Speech";
import SpeechLib from "../pages/SpeechLib";
import NotFoundPage from "../pages/NotFoundPage";
import SuccessPage from "../pages/SuccessPage";
import ErrorPage from "../pages/ErrorPage";
import ProuductPage from "../pages/ProuductPage";
import AdminLayout from "../components/layout/AdminLayout";
import AppLayout from "../components/layout/AppLayout";

import FirstSlideImgae from "../assets/images/logo (1).png";
import SecondSlideImgae from "../assets/images/logo (2).png";
import ThirdSlideImgae from "../assets/images/logo (3).png";
import FourthSlideImgae from "../assets/images/logo(4).png";
import FifthSlideImgae from "../assets/images/logo (5).png";

import img_1 from "../assets/images/products/img_1.png";
import img_2 from "../assets/images/products/img_2.png";
import img_3 from "../assets/images/products/img_3.png";
import img_4 from "../assets/images/products/img_4.png";
import img_5 from "../assets/images/products/img_5.png";

import { RxDashboard } from "react-icons/rx";
/**
 * =================================================
 * SERVER_URL : THIS IS THE URL OF THE SERVER
 * =================================================
 * */

export const SERVER_URL = "https://ecom-sever.onrender.com/api/v1";
// export const SERVER_URL = "http://localhost:7000/api/v1";

export const _config = {
  TOKEN: "access_token",
  ID: "userId",
};

/**
 * =================================================
 * ROUTES : ALL THE ROUTES OF THE APP
 * =================================================
 * */

export const ROUTES = [
  {
    id: "home",
    element: <LandingPage />,
    title: "Home",
    path: "/",
  },
  {
    title: "Deals",
    path: "#deals",
  },
  {
    title: "New Arrivals",
    path: "#newArrivals",
  },
  {
    id: "signin",
    element: <LoginPage />,
    title: "Sign in",
    path: "/login",
  },
  {
    id: "signup",
    element: <SignupPage />,
    title: "Sign up",
    path: "/signup",
    isButton: true,
  },
  {
    id: "success",
    path: "/success",
    title: "Success",
    element: <SuccessPage />,
    hidden: true,
  },
  {
    id: "error",
    path: "/error",
    title: "Error",
    element: <ErrorPage />,
    hidden: true,
  },
  {
    id: "product",
    path: "/product/:id",
    title: "Product",
    element: <ProuductPage />,
    excludeNav: true,
  },
  {
    id: "dashboard",
    title: "Dashboard",
    element: <DashboardPage />,
    path: "/dashboard",
    icon: <RxDashboard size={18} />,
    private: true,
  },
  {
    id: "speech",
    path: "/speech",
    title: "Speech",
    element: <Speech />,
    icon: <RxDashboard size={18} />,
    private: true,
    hidden: false,
  },
  {
    id: "speech-lib",
    title: "Speech Library",
    path: "/speech-lib",
    element: <SpeechLib />,
    icon: <RxDashboard size={18} />,
    private: true,
    hidden: false,
  },
];

export const PUBLIC_ROUTES =
  ROUTES.length > 0 &&
  ROUTES.filter((route) => !route?.private && !route.hidden);

export const PRIVATE_ROUTES =
  ROUTES.length > 0 &&
  ROUTES.filter((route) => route?.private && !route.hidden).map((route) => {
    return {
      ...route,
      path: route?.path,
      element: <AdminLayout>{route?.element}</AdminLayout>,
    };
  });

export const _routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: PUBLIC_ROUTES,
  },
  ...PRIVATE_ROUTES,
  {
    path: "*",
    element: <NotFoundPage />,
  },
] || [
  {
    path: "/",
    element: <NotFoundPage />,
  },
];

/**
 * =================================================
 * FORMS CONSTANTS ENDS HERE
 * =================================================
 * */

export const FORM_ERROR_MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL: {
    INVALID: "Please provide a valid email address",
  },
  PASSWORD: {
    MIN_LENGTH: "Please provide a password with at least 3 characters",
  },
  PHONE: {
    INVALID: "Please provide a valid phone number",
  },
};

export const SLIDES_MENU = [
  {
    id: 1,
    img: FirstSlideImgae,
  },
  {
    id: 2,
    img: FourthSlideImgae,
  },
  {
    id: 3,
    img: FifthSlideImgae,
  },
  {
    id: 4,
    img: SecondSlideImgae,
  },
  {
    id: 5,
    img: ThirdSlideImgae,
  },
];

export const COMMON_SLIDES = [
  {
    id: 1,
    img: img_1,
  },
  {
    id: 2,
    img: img_2,
  },
  {
    id: 3,
    img: img_3,
  },
  {
    id: 4,
    img: img_4,
  },
  {
    id: 5,
    img: img_5,
  },
];

export const POPULAR_CATEGORIES = [
  "mens-shoes",
  "mens-watches",
  "womens-bags",
  "womens-shoes",
];

export const FOOTER_LINKS = [
  {
    id: 1,
    name: "About us",
  },
  {
    id: 2,
    name: "Contact",
  },
  {
    id: 3,
    name: "FAQ",
  },
];
