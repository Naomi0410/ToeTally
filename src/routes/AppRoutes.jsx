import { Blog, Cart, Checkout, Home, Shop } from "../pages";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Login from "../components/auth/LogIn";
import SignUp from "../components/auth/SignUp";
import AddToCart from "../components/addToCart/AddToCart";
import ContactUs from "../pages/ContactUs";
import AboutUs from "../pages/AboutUs";
import NotFound from "../pages/NotFound";
import OrderConfirmation from "../pages/OrderConfirmation";
import { Loader } from "../components";
const RootLayout = lazy(() => import("../layouts/RootLayout"));

export default function AppRoutes() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    handleLoading();
  }, []);

  const routes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <RootLayout />
        </Suspense>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/aboutus", element: <AboutUs /> },
        { path: "/addToCart/:productId", element: <AddToCart /> },
        { path: "/contact-us", element: <ContactUs /> },
        { path: "/cart", element: <Cart /> },
        { path: "/blog", element: <Blog /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/orderconfirmation", element: <OrderConfirmation /> },
        {
          path: "/shop",
          element: <Shop />,
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },

    { path: "*", element: <NotFound /> },
  ];

  const router = createBrowserRouter(routes);
  return (
    <div>
      {loading && <Loader />}
      <RouterProvider
        router={router}
        onNavigate={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}
