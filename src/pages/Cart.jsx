import { Link, useNavigate } from "react-router-dom";
import { ActionButton, Subscribe } from "../components";
import { useState, useEffect, useCallback } from "react";
import { cartImg } from "../assets";
import { Image, Spinner } from "react-bootstrap";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { formatCurrency } from "../utils";

const API_BASE_URL = "https://backend-toetally.onrender.com/api";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Redirecting to login.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch cart");

      const data = await response.json();
      console.log("Fetched cart data:", data);
      const filteredCartData = data.items?.filter((item) => item.product) || [];
      setCartData(filteredCartData);
      localStorage.setItem("cart", JSON.stringify(filteredCartData)); // Store cart data
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
      return;
    }

    setCartData((prev) =>
      prev.map((item) =>
        item.product?._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error(
        "No token found in localStorage. User may not be authenticated."
      );
      return;
    }

    console.log(`Attempting to remove product ${productId} from cart`);
    console.log(
      "Token found, sending DELETE request with Authorization header"
    );

    setCartData((prev) =>
      prev.filter((item) => item.product?._id !== productId)
    );

    try {
      const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.statusText}`);
      }

      console.log(`Product ${productId} removed successfully`);
    } catch (error) {
      console.error("Error removing item:", error);
      fetchCart();
    }
  };

  const totalPrice = cartData.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <>
      <div style={{ backgroundColor: "#EBEBEB" }}>
        <div className="px-16 py-3 lg:flex gap-3 hidden">
          <Link
            to="/"
            className="text-customLightGray font-semibold text-xl font-family-2 no-underline"
          >
            Home
          </Link>
          <span className="font-semibold text-customLightGray font-family-1 text-xl">
            /
          </span>
          <span className="font-semibold font-family-2 text-xl">Cart</span>
        </div>

        <div className="px-3 py-2 flex gap-3 lg:hidden">
          <Link
            to="/"
            className="text-customLightGray font-semibold text-sm font-family-2 no-underline"
          >
            Home
          </Link>
          <span className="font-semibold text-customLightGray font-family-1 text-sm">
            /
          </span>
          <span className="font-semibold font-family-2 text-sm">Cart</span>
        </div>
      </div>

      <h1 className="py-3 lg:px-16 md:px-3 font-family-3 lg:text-5xl md:text-3xl text-black hidden md:block">
        Your Cart
      </h1>
      <h1 className="py-3 md:hidden block font-family-3 px-3 text-2xl text-black">
        Your Cart
      </h1>
      {loading ? (
        <Spinner animation="border" className="lg:mx-16" />
      ) : cartData.length === 0 ? (
        <div className="text-center py-5">
          <h2 className="font-family-3 text-2xl">Your cart is empty</h2>
          <button
            className="mt-3 bg-[#01497C] text-white px-4 py-2 rounded"
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="lg:w-11/12 mx-auto">
          <div className="flex flex-col gap-3 lg:flex-row md:justify-between">
            <div className="w-full lg:w-100">
              <div className="border mx-3 lg:mx-0 rounded-3 p-4">
                {cartData.map((item, index) => (
                  <div key={item.product._id} className="pb-3">
                    <div className="d-flex flex-column flex-md-row gap-3">
                      <Image
                        src={
                          item.product.thumbnail ||
                          item.product.image ||
                          cartImg
                        }
                        className="img-fluid"
                        style={{ maxWidth: "100px", height: "auto" }}
                      />

                      <div className="d-flex flex-column gap-3 w-100">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="font-family-2 text-lg md:text-xl">
                            {item.product.title}
                          </span>
                          <RiDeleteBinFill
                            color="red"
                            onClick={() => removeItem(item.product._id)}
                            className="cursor-pointer"
                            size={18}
                          />
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <p className="font-family-2 text-lg md:text-2xl">
                            {formatCurrency(item.product.price)}
                          </p>
                          <div className="border-2 d-flex align-items-center rounded-3 gap-3 p-2">
                            <FaMinus
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.quantity - 1
                                )
                              }
                              className="cursor-pointer"
                            />
                            {item.quantity}
                            <FaPlus
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.quantity + 1
                                )
                              }
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < cartData.length - 1 && <hr />}
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="w-full xl:w-4/5 lg:w-3/5 px-2">
              <div className="lg:border rounded-4 p-3">
                <h1 className="font-family-3 text-3xl xl:text-4xl">
                  Order Summary
                </h1>

                <div className="d-flex justify-content-between font-family-2 text-lg xl:text-xl">
                  <p className="text-gray-400">Subtotal</p>
                  {formatCurrency(totalPrice)}
                </div>

                <div className="d-flex justify-content-between font-family-2 text-lg xl:text-xl text-red-500">
                  <p className="text-gray-400">Discount (20%)</p>-
                  {formatCurrency(totalPrice * 0.2)}
                </div>

                <div className="d-flex justify-content-between font-family-2 text-lg xl:text-xl">
                  <p className="text-gray-400">Delivery Fee</p>
                  {formatCurrency(5000)}
                </div>

                <hr />

                <div className="d-flex justify-content-between font-family-2 text-xl xl:text-2xl">
                  <p>Total</p>
                  {formatCurrency(totalPrice - totalPrice * 0.2 + 5000)}
                </div>

                {/* Promo Code Input */}
                <div className="flex  gap-3 md:flex-row items-center justify-between w-full mt-3">
                  <div className="flex w-5/6 bg-[#F0F0F0] rounded-3 py-2 px-2">
                    <img src="/tag.svg" className="mx-1"/>
                    <input
                      type="text"
                      placeholder="Add promo code"
                      className="bg-[#F0F0F0] w-full  outline-none font-family-2"
                    />
                  </div>
                  <button className="bg-[#01497C] text-white px-4 py-2 rounded-3 w-auto md:mt-0">
                    Apply
                  </button>
                </div>

                {/* Checkout Button */}
                <button
                  className="font-family-2 bg-[#01497C] text-white rounded-3 w-full p-3 mt-3 flex justify-center gap-3"
                  onClick={() => navigate("/checkout")}
                >
                  Go to Checkout <img src="/arrow1.svg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto lg:w-11/12">
        <Subscribe />
      </div>
    </>
  );
};

export default Cart;
