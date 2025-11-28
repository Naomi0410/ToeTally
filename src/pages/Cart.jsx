import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Subscribe } from "../components";
import { useState, useEffect, useCallback } from "react";
import { cartImg } from "../assets";
import { Image, Spinner } from "react-bootstrap";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { formatCurrency } from "../utils";

const API_BASE_URL = "https://backend-toetally-1.onrender.com/api";

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

      // Get size mapping from localStorage
      const sizeMap = JSON.parse(localStorage.getItem("cartSizes") || "{}");

      const filteredCartData =
        data.items
          ?.filter((item) => item.product)
          .map((item) => ({
            ...item,
            size: item.size || sizeMap[item.product._id] || "Not specified",
          })) || [];

      setCartData(filteredCartData);
      localStorage.setItem("cart", JSON.stringify(filteredCartData));
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
      console.error("No token found. User may not be authenticated.");
      return;
    }
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
      // Clean up size mapping
      const sizeMap = JSON.parse(localStorage.getItem("cartSizes") || "{}");
      delete sizeMap[productId];
      localStorage.setItem("cartSizes", JSON.stringify(sizeMap));

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
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: "#EBEBEB" }}
      >
        <div className="px-12 lg:py-2 xl:py-3 lg:flex gap-3 hidden">
          <Link
            to="/"
            className="text-customLightGray font-semibold text-base font-family-2 no-underline hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <span className="font-semibold text-customLightGray font-family-1 text-base">
            /
          </span>
          <span className="font-semibold font-family-2 text-base text-black">
            Cart
          </span>
        </div>

        <div className="px-3 py-2 flex gap-2 lg:hidden">
          <Link
            to="/"
            className="text-customLightGray font-semibold text-xs font-family-2 no-underline hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <span className="font-semibold text-customLightGray font-family-1 text-xs">
            /
          </span>
          <span className="font-semibold font-family-2 text-xs">
            Cart
          </span>
        </div>
      </motion.div>

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="py-6 px-3 lg:hidden font-family-3 text-3xl text-black"
      >
        Your Cart
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="py-6 px-12 lg:block hidden font-family-3 lg:text-5xl text-black"
      >
        Your Cart
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner animation="border" className="text-[#01497C]" />
        </div>
      ) : cartData.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="max-w-md mx-auto">
            <img
              src={cartImg}
              alt="Empty cart"
              className="w-48 h-48 mx-auto mb-6 opacity-50"
            />
            <h2 className="font-family-3 text-2xl lg:text-3xl mb-4 text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6 font-family-2">
              Looks like you haven't added anything to your cart yet
            </p>
            <motion.button
              className="bg-[#01497C] text-white px-8 py-3 rounded-xl font-semibold font-family-2 hover:bg-[#013A63] transition-colors"
              onClick={() => navigate("/shop")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* large screen cart layout */}
          <div className="px-12 hidden lg:block mx-auto mb-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                  {cartData.map((item, index) => (
                    <motion.div
                      key={item.product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="pb-6"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="bg-[#F5F5F5] rounded-xl p-4 flex items-center justify-center w-full sm:w-32 h-32">
                          <Image
                            src={
                              item.product.thumbnail ||
                              item.product.image ||
                              cartImg
                            }
                            className="object-contain max-h-full max-w-full"
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-family-2 text-lg lg:text-xl font-semibold text-gray-900">
                                {item.product.title}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">
                                Size: {item.size}
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.product._id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2"
                            >
                              <RiDeleteBinFill size={20} />
                            </motion.button>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <p className="font-family-2 text-xl lg:text-2xl font-bold text-[#01497C]">
                              {formatCurrency(item.product.price)}
                            </p>
                            <div className="flex items-center border-2 border-gray-300 rounded-lg">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(
                                    item.product._id,
                                    item.quantity - 1
                                  )
                                }
                                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <FaMinus size={12} />
                              </motion.button>
                              <span className="px-6 py-2 font-semibold border-x-2 border-gray-300">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(
                                    item.product._id,
                                    item.quantity + 1
                                  )
                                }
                                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <FaPlus size={12} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < cartData.length - 1 && (
                        <hr className="mt-6 border-gray-200" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm sticky top-4">
                  <h2 className="font-family-3 text-2xl lg:text-3xl mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between font-family-2 text-lg">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-semibold">
                        {formatCurrency(totalPrice)}
                      </p>
                    </div>

                    <div className="flex justify-between font-family-2 text-lg text-red-500">
                      <p className="text-gray-600">Discount (20%)</p>
                      <p className="font-semibold">
                        -{formatCurrency(totalPrice * 0.2)}
                      </p>
                    </div>

                    <div className="flex justify-between font-family-2 text-lg">
                      <p className="text-gray-600">Delivery Fee</p>
                      <p className="font-semibold">{formatCurrency(5000)}</p>
                    </div>

                    <hr className="border-gray-300" />

                    <div className="flex justify-between font-family-2 text-xl">
                      <p className="font-bold">Total</p>
                      <p className="font-bold text-[#01497C]">
                        {formatCurrency(totalPrice - totalPrice * 0.2 + 5000)}
                      </p>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mt-6">
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center bg-[#F0F0F0] rounded-lg px-3 py-3">
                        <img
                          src="/tag.svg"
                          alt="tag"
                          className="w-5 h-5 mr-2"
                        />
                        <input
                          type="text"
                          placeholder="Add promo code"
                          className="bg-transparent w-full outline-none font-family-2 text-sm"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#01497C] text-white px-6 rounded-lg font-family-2 font-semibold hover:bg-[#013A63] transition-colors"
                      >
                        Apply
                      </motion.button>
                    </div>
                  </div>
                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="font-family-2 bg-[#01497C] text-white rounded-xl w-full py-3 mt-6 flex justify-center items-center gap-3 font-semibold text-lg hover:bg-[#013A63] transition-colors"
                    onClick={() => navigate("/checkout")}
                  >
                    Go to Checkout
                    <img src="/arrow1.svg" alt="arrow" className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* medium and small screen cart layout */}
          <div className="px-3 lg:hidden mx-auto mb-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
                  {cartData.map((item, index) => (
                    <motion.div
                      key={item.product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="pb-6"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="bg-[#F5F5F5] rounded-xl p-4 flex items-center justify-center w-full sm:w-32 h-32">
                          <Image
                            src={
                              item.product.thumbnail ||
                              item.product.image ||
                              cartImg
                            }
                            className="object-contain max-h-full max-w-full"
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-family-2 text-base font-semibold text-gray-900">
                                {item.product.title}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">
                                Size: {item.size}
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.product._id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2"
                            >
                              <RiDeleteBinFill size={20} />
                            </motion.button>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <p className="font-family-2 text-sm font-bold text-[#01497C]">
                              {formatCurrency(item.product.price)}
                            </p>
                            <div className="flex items-center border-2 border-gray-300 rounded-lg">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(
                                    item.product._id,
                                    item.quantity - 1
                                  )
                                }
                                className="px-2 py-1 hover:bg-gray-100 transition-colors"
                              >
                                <FaMinus size={12} />
                              </motion.button>
                              <span className="px-4 py-1 font-semibold border-x-2 border-gray-300">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  updateQuantity(
                                    item.product._id,
                                    item.quantity + 1
                                  )
                                }
                                className="px-2 py-1 hover:bg-gray-100 transition-colors"
                              >
                                <FaPlus size={12} />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < cartData.length - 1 && (
                        <hr className="mt-6 border-gray-200" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm sticky top-4">
                  <h2 className="font-family-3 text-2xl mb-6">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between font-family-2 text-base">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-semibold">
                        {formatCurrency(totalPrice)}
                      </p>
                    </div>
                    <div className="flex justify-between font-family-2 text-base text-red-500">
                      <p className="text-gray-600">Discount (20%)</p>
                      <p className="font-semibold">
                        -{formatCurrency(totalPrice * 0.2)}
                      </p>
                    </div>
                    <div className="flex justify-between font-family-2 text-base">
                      <p className="text-gray-600">Delivery Fee</p>
                      <p className="font-semibold">{formatCurrency(5000)}</p>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between font-family-2 text-lg">
                      <p className="font-bold">Total</p>
                      <p className="font-bold text-[#01497C]">
                        {formatCurrency(totalPrice - totalPrice * 0.2 + 5000)}
                      </p>
                    </div>
                  </div>
                  {/* Promo Code */}
                  <div className="mt-6">
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center bg-[#F0F0F0] rounded-lg px-3 py-2">
                        <img
                          src="/tag.svg"
                          alt="tag"
                          className="w-5 h-5 mr-2"
                        />
                        <input
                          type="text"
                          placeholder="Add promo code"
                          className="bg-transparent w-full outline-none font-family-2 text-sm"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#01497C] text-white px-6 rounded-lg font-family-2 font-semibold hover:bg-[#013A63] transition-colors"
                      >
                        Apply
                      </motion.button>
                    </div>
                  </div>
                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="font-family-2 bg-[#01497C] text-white rounded-xl w-full py-3 mt-6 flex justify-center items-center gap-3 font-semibold text-lg hover:bg-[#013A63] transition-colors"
                    onClick={() => navigate("/checkout")}
                  >
                    Go to Checkout
                    <img src="/arrow1.svg" alt="arrow" className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}

      <div className="mx-auto lg:w-11/12">
        <Subscribe />
      </div>
    </>
  );
};

export default Cart;
