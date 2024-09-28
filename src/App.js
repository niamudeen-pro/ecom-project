import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { _routes } from "./constants";

export default function App() {
  const router = createBrowserRouter(_routes);
  return <RouterProvider router={router} />;
}
