import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import OfferForYou from "../OfferForYou";
import Alert from "../alert/Alert";
import Subscribe from "../Subscribe";

// Unique IDs for accessibility
const PRODUCT_INFO_ID = "product-info-section";
const SIZE_SELECTION_ID = "size-selection-label";
const QUANTITY_LABEL_ID = "quantity-label";

const AddToCart = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [previewImage, setPreviewImage] = useState("");
  const [alert, setAlert] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Product ID:", productId);
        const response = await axios.get(
          `https://backend-toetally-1.onrender.com/api/products/${productId}`
        );
        if (!response.data) throw new Error("No product found.");
        console.log("Fetched product:", response.data);
        setProduct(response.data);
        setPreviewImage(response.data.thumbnail || "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product || !product._id) {
      setAlert({ message: "Product information is missing.", type: "error" });
      return;
    }

    if (!selectedSize) {
      setAlert({
        message: "Please select a size before adding to cart.",
        type: "warning",
      });
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setAlert({
        message: "You need to be logged in to add items to the cart.",
        type: "error",
      });
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const cartItem = {
      productId: product._id,
      title: product.title,
      quantity: quantity,
      size: selectedSize,
    };

    console.log("Sending to cart:", cartItem);
    setIsAddingToCart(true);
    try {
      const response = await axios.post(
        "https://backend-toetally-1.onrender.com/api/cart/add",
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Cart response:", response.data);
      // WORKAROUND: Store size mapping in localStorage
      const sizeMap = JSON.parse(localStorage.getItem("cartSizes") || "{}");
      sizeMap[product._id] = selectedSize;
      localStorage.setItem("cartSizes", JSON.stringify(sizeMap));

      setAlert({ message: "Item added to cart!", type: "success" });
      setTimeout(() => {
        navigate("/cart");
      }, 1000);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      setAlert({
        message: error.response?.data?.message || "Failed to add item to cart.",
        type: "error",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product)
    return (
      <div
        className="flex justify-center items-center min-h-screen"
        role="status"
        aria-live="polite"
        aria-label="Loading product details"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#01497C]"></div>
      </div>
    );

  return (
    <>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: "#EBEBEB" }}
        role="navigation"
        aria-label="Breadcrumb"
      >
        <div className="px-12 lg:py-2 xl:py-3 lg:flex gap-3 hidden">
          <Link
            to="/"
            className="text-customLightGray font-semibold text-base font-family-2 no-underline hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <span
            aria-hidden="true"
            className="font-semibold text-customLightGray font-family-1 text-base"
          >
            /
          </span>
          <Link
            to="/shop"
            className="text-customLightGray font-semibold text-base font-family-2 no-underline hover:text-gray-600 transition-colors"
          >
            Shop
          </Link>
          <span
            aria-hidden="true"
            className="font-semibold text-customLightGray font-family-1 text-base"
          >
            /
          </span>
          <span
            aria-current="page"
            className="font-semibold font-family-2 text-base text-black"
          >
            Product
          </span>
        </div>

        <div className="px-3 py-2 flex gap-2 lg:hidden">
          <Link
            to="/"
            className="text-customLightGray font-semibold text-xs font-family-2 no-underline hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <span
            aria-hidden="true"
            className="font-semibold text-customLightGray font-family-1 text-xs"
          >
            /
          </span>
          <Link
            to="/shop"
            className="text-customLightGray font-semibold text-xs font-family-2 no-underline hover:text-gray-600 transition-colors"
          >
            Shop
          </Link>
          <span
            aria-hidden="true"
            className="font-semibold text-customLightGray font-family-1 text-xs"
          >
            /
          </span>
          <span
            aria-current="page"
            className="font-semibold font-family-2 text-xs text-black"
          >
            Product
          </span>
        </div>
      </motion.nav>

      {/* Product Details for large screen */}
      <main
        role="main"
        aria-labelledby={PRODUCT_INFO_ID}
        className="mx-auto hidden lg:block px-12 mt-8 mb-12"
      >
        <h1 id={PRODUCT_INFO_ID} className="sr-only">
          {product.title} Product Details
        </h1>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <motion.div
              className="bg-[#B5B5B54D] rounded-3xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={previewImage}
                alt={`${product.title} - main preview image`}
                className="w-full h-[300px] lg:h-[400px] object-contain"
              />
            </motion.div>
            <div
              role="group"
              aria-label="Alternative product views"
              className="px-2 flex gap-3 mt-4 overflow-x-auto"
            >
              {product.image?.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className={`w-20 h-20  my-3 object-contain rounded-lg cursor-pointer transition-all ${
                    previewImage === img
                      ? "ring-2 ring-[#01497C]"
                      : "hover:ring-2 hover:ring-gray-400"
                  }`}
                  onClick={() => setPreviewImage(img)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="button"
                  tabIndex={0} // Make the image clickable and focusable
                  aria-label={`Show view ${index + 1} of ${product.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPreviewImage(img);
                    }
                  }}
                />
              ))}
            </div>
          </motion.div>
          {/* Product Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-3xl font-family-3 text-gray-900">
              {product.title}
            </h1>
            <p className="text-gray-600 text-lg mt-2 font-family-2">
              {product.productTag}
            </p>
            <h2 className="text-[#01497C] text-2xl font-bold mt-2 font-family-2">
              ₦{product.price?.toLocaleString()}
            </h2>

            {/* Color */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold font-family-2 mb-2">
                Colour
              </h3>
              <p className="text-gray-600 text-lg font-family-2">
                {product.color}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mt-4">
              <h3
                className="text-xl font-semibold font-family-2 mb-2"
                id={SIZE_SELECTION_ID}
              >
                Select Size
              </h3>
              <div
                className="flex flex-wrap gap-3"
                role="group"
                aria-labelledby={SIZE_SELECTION_ID}
                aria-live="polite"
              >
                {product.size?.map((size) => (
                  <motion.button
                    key={size}
                    className={`lg:w-14 xl:w-16 py-2 border-2 rounded-xl font-semibold font-family-2 transition-all ${
                      selectedSize === size
                        ? "border-[#01497C] bg-[#01497C] text-white shadow-lg"
                        : "border-gray-300 hover:border-[#01497C] hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-pressed={selectedSize === size}
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </motion.button>
                ))}
                {/* Announcement for selected size */}
                {selectedSize && (
                  <span className="sr-only" aria-live="polite">
                    Size {selectedSize} selected.
                  </span>
                )}
              </div>
            </div>
            {/* Quantity */}
            <div className="mt-4">
              <h3
                className="text-xl font-semibold font-family-2 mb-2"
                id={QUANTITY_LABEL_ID}
              >
                Quantity
              </h3>
              <div
                className="inline-flex items-center border-2 border-gray-300 rounded-xl overflow-hidden"
                role="group"
                aria-labelledby={QUANTITY_LABEL_ID}
              >
                <motion.button
                  className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold text-lg"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Decrease quantity"
                >
                  -
                </motion.button>
                <span
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  aria-label={`Current quantity: ${quantity}`}
                  className="px-6 py-2 text-lg font-semibold border-x-2 border-gray-300 min-w-[80px] text-center"
                >
                  {quantity}
                </span>
                <motion.button
                  className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold text-lg"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Increase quantity"
                >
                  +
                </motion.button>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <motion.button
                className="w-full bg-[#01497C] text-white py-3 rounded-xl font-semibold text-lg font-family-2 hover:bg-[#013A63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-live={isAddingToCart ? "assertive" : "off"}
                aria-label={
                  isAddingToCart ? "Adding to Cart..." : "Add To Cart"
                }
              >
                {isAddingToCart ? "Adding to Cart..." : "Add To Cart"}
              </motion.button>
              <motion.button
                className="w-full bg-white border-2 border-[#01497C] text-[#01497C] py-3 rounded-xl font-semibold text-lg font-family-2 hover:bg-[#01497C] hover:text-white transition-colors"
                onClick={() => {
                  if (!selectedSize) {
                    setAlert({
                      message: "Please select a size before purchasing.",
                      type: "warning",
                    });
                    return;
                  }
                  navigate("/checkout", {
                    state: {
                      productId: product._id,
                      title: product.title,
                      price: product.price,
                      size: selectedSize,
                      quantity: quantity,
                      image: product.thumbnail || "",
                    },
                  });
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Product Details for medium and small screen */}
      <div
        className="lg:hidden mx-auto px-3 mt-8 mb-12"
        role="main"
        aria-labelledby={PRODUCT_INFO_ID}
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <motion.div
              className="bg-[#B5B5B54D] rounded-3xl p-6 "
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={previewImage}
                alt={`${product.title} - main preview image`}
                className="w-full h-[300px] object-contain"
              />
            </motion.div>
            <div
              role="group"
              aria-label="Alternative product views"
              className="px-2 flex gap-3 mt-4 overflow-x-auto"
            >
              {product.image?.map((img, index) => (
                <motion.img
                  key={index}
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className={`w-16 h-16  my-3 object-contain rounded-lg cursor-pointer transition-all ${
                    previewImage === img
                      ? "ring-2 ring-[#01497C]"
                      : "hover:ring-2 hover:ring-gray-400"
                  }`}
                  onClick={() => setPreviewImage(img)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Show view ${index + 1} of ${product.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPreviewImage(img);
                    }
                  }}
                />
              ))}
            </div>
          </motion.div>
          {/* Product Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-2xl font-family-3 text-gray-900">
              {product.title}
            </h1>
            <p className="text-gray-600 text-lg mt-2 font-family-2">
              {product.productTag}
            </p>
            <h2 className="text-[#01497C] text-xl font-bold mt-2 font-family-2">
              ₦{product.price?.toLocaleString()}
            </h2>

            {/* Color */}
            <div className="mt-3">
              <h3 className="text-xl font-semibold font-family-2 mb-2">
                Colour
              </h3>
              <p className="text-gray-600 text-lg font-family-2">
                {product.color}
              </p>
            </div>
            {/* Size Selection */}
            <div className="mt-3">
              <h3
                className="text-xl font-semibold font-family-2 mb-2"
                id={`${SIZE_SELECTION_ID}-mobile`}
              >
                Select Size
              </h3>
              <div
                className="flex flex-wrap gap-3"
                role="group"
                aria-labelledby={`${SIZE_SELECTION_ID}-mobile`}
                aria-live="polite"
              >
                {product.size?.map((size) => (
                  <motion.button
                    key={size}
                    className={`w-10 py-2 border-2 rounded-xl font-semibold font-family-2 transition-all ${
                      selectedSize === size
                        ? "border-[#01497C] bg-[#01497C] text-white shadow-lg"
                        : "border-gray-300 hover:border-[#01497C] hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-pressed={selectedSize === size}
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </motion.button>
                ))}
                {/* Announcement for selected size */}
                {selectedSize && (
                  <span className="sr-only" aria-live="polite">
                    Size {selectedSize} selected.
                  </span>
                )}
              </div>
            </div>
            {/* Quantity */}
            <div className="mt-3">
              <h3
                className="text-xl font-semibold font-family-2 mb-2"
                id={`${QUANTITY_LABEL_ID}-mobile`}
              >
                Quantity
              </h3>
              <div
                className="inline-flex items-center border-2 border-gray-300 rounded-xl overflow-hidden"
                role="group"
                aria-labelledby={`${QUANTITY_LABEL_ID}-mobile`}
              >
                <motion.button
                  className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold text-lg"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Decrease quantity"
                >
                  -
                </motion.button>
                <span
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  aria-label={`Current quantity: ${quantity}`}
                  className="px-6 py-2 text-lg font-semibold border-x-2 border-gray-300 min-w-[80px] text-center"
                >
                  {quantity}
                </span>
                <motion.button
                  className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold text-lg"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Increase quantity"
                >
                  +
                </motion.button>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="mt-4 flex flex-col gap-3">
              <motion.button
                className="w-full bg-[#01497C] text-white py-3 rounded-xl font-semibold text-lg font-family-2 hover:bg-[#013A63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-live={isAddingToCart ? "assertive" : "off"}
                aria-label={
                  isAddingToCart ? "Adding to Cart..." : "Add To Cart"
                }
              >
                {isAddingToCart ? "Adding to Cart..." : "Add To Cart"}
              </motion.button>

              <motion.button
                className="w-full bg-white border-2 border-[#01497C] text-[#01497C] py-3 rounded-xl font-semibold text-lg font-family-2 hover:bg-[#01497C] hover:text-white transition-colors"
                onClick={() => {
                  if (!selectedSize) {
                    setAlert({
                      message: "Please select a size before purchasing.",
                      type: "warning",
                    });
                    return;
                  }
                  navigate("/checkout", {
                    state: {
                      productId: product._id,
                      title: product.title,
                      price: product.price,
                      size: selectedSize,
                      quantity: quantity,
                      image: product.thumbnail || "",
                    },
                  });
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <OfferForYou />

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        role="region"
        aria-label="Shopping Benefits and Policies"
        className="text-[#808080] mt-8 font-family-2 grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 mx-center px-12 max-w-7xl mx-auto "
      >
        <div className="flex flex-col lg:flex-row gap-3 items-center text-center lg:text-left">
          <img
            src="/bef1.svg"
            alt="Delivery Truck Icon"
            className="w-16 h-16"
          />
          <div>
            <h2 className="text-lg lg:text-sm xl:text-lg font-bold text-gray-900">
              Fast & Free Shipping
            </h2>
            <p className="text-sm lg:text-xs xl:text-sm mt-2">
              Every single order ships for free. No extra credit needed.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 items-center text-center lg:text-left lg:border-x md:border-gray-300 md:px-6">
          <img src="/bef2.svg" alt="Returns Policy" className="w-16 h-16" />
          <div>
            <h2 className="text-lg lg:text-sm xl:text-lg font-bold text-gray-900">
              30 Days Returns Policy
            </h2>
            <p className="text-sm lg:text-xs xl:text-sm mt-2">
              Product returns are accepted within 30 days.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 items-center text-center lg:text-left">
          <img src="/bef3.svg" alt="Quality Badge Icon" className="w-16 h-16" />
          <div>
            <h2 className="text-lg lg:text-sm xl:text-lg font-bold text-gray-900">
              Top Quality Products
            </h2>
            <p className="text-sm lg:text-xs xl:text-sm mt-2">
              We always provide high quality shoes.
            </p>
          </div>
        </div>
      </motion.div>

      <Subscribe />
    </>
  );
};

export default AddToCart;
