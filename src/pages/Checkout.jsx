import { Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { formatCurrency, validateFields } from "../utils";
import { Subscribe } from "../components";
import Alert from "../components/alert/Alert";
import { motion } from "framer-motion";

const API_BASE_URL = "https://backend-toetally-1.onrender.com/api";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [alert, setAlert] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData({
        firstName: storedUser.firstName || "",
        lastName: storedUser.lastName || "",
        email: storedUser.email || "",
      });
    }
  }, []);

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
      console.log("Cart data:", data);
      setCartData(data.items?.filter((item) => item.product) || []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const totalPrice = cartData.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  const handlePayWithPaystack = () => {
    const publicKey = "pk_test_b34e179f628c1e53a55bf8ecd6c02e21a0b38d0b";
    const email = userData.email || "toetallytsa@gmail.com";
    const amountInKobo = (totalPrice + 5000) * 100;
    const currency = "NGN";
    const reference = `ref_${Math.floor(Math.random() * 1000000000)}`;

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: email,
      amount: amountInKobo,
      currency: currency,
      ref: reference,
      callback: function (response) {
        console.log("Payment successful:", response);
        setAlert({
          message: `Payment successful! Transaction reference: ${response.reference}`,
          type: "success",
        });
        setTimeout(() => navigate("/OrderConfirmation"), 3000);
      },
      onClose: function () {
        console.log("Payment window closed.");
        setAlert({ message: "Payment was not completed.", type: "error" });
      },
    });

    handler.openIframe();
  };

  return (
    <>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: "#EBEBEB" }}
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
            to="/cart"
            className="text-customLightGray font-semibold text-base font-family-2 no-underline hover:text-gray-600 transition-colors"
          >
            Cart
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
            Checkout
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
            to="/cart"
            className="text-customLightGray font-semibold text-xs font-family-2 no-underline hover:text-gray-600 transition-colors"
          >
            Cart
          </Link>
          <span
            aria-hidden="true"
            className="font-semibold text-customLightGray font-family-1 text-xs"
          >
            /
          </span>
          <span
            aria-current="page"
            className="font-semibold font-family-2 text-xs"
          >
            Checkout
          </span>
        </div>
      </motion.nav>

      {/* large screens */}
      <Row className="py-4 px-12 d-none d-lg-flex justify-between ">
        {/* Billing Details - Visible on all screens */}
        <Col xs={12} lg={6} className="mt-4">
          <h1 className="font-family-3 text-3xl lg:text-4xl xl:text-5xl text-black">
            Billing Details
          </h1>
          <Form className="mt-4" aria-label="Billing information form">
            <div className="d-flex gap-3">
              <Form.Group className="flex-fill">
                <Form.Label htmlFor="firstName" className="visually-hidden">
                  First Name
                </Form.Label>
                <Form.Control
                  id="firstName"
                  {...register("firstName", validateFields.name)}
                  placeholder="First Name"
                  type="text"
                  size="lg"
                  className="font-family-2 ps-4"
                  defaultValue={userData.firstName}
                  aria-required="true"
                  aria-invalid={errors.firstName ? "true" : "false"}
                  aria-describedby={
                    errors.firstName ? "firstName-error" : undefined
                  }
                />
                {errors.firstName && (
                  <span
                    id="firstName-error"
                    className="text-danger small"
                    role="alert"
                  >
                    {errors.firstName.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group className="flex-fill">
                <Form.Label htmlFor="lastName" className="visually-hidden">
                  Last Name
                </Form.Label>
                <Form.Control
                  id="lastName"
                  {...register("lastName", validateFields.name)}
                  placeholder="Last Name"
                  type="text"
                  size="lg"
                  className="font-family-2 ps-4"
                  defaultValue={userData.lastName}
                  aria-required="true"
                  aria-invalid={errors.lastName ? "true" : "false"}
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                />
                {errors.lastName && (
                  <span
                    id="lastName-error"
                    className="text-danger small"
                    role="alert"
                  >
                    {errors.lastName.message}
                  </span>
                )}
              </Form.Group>
            </div>
            <Form.Group>
              <Form.Label htmlFor="email" className="visually-hidden">
                Email Address
              </Form.Label>
              <Form.Control
                id="email"
                {...register("email", validateFields.email)}
                placeholder="Email Address"
                type="email"
                size="lg"
                className="font-family-2 ps-4 mt-4"
                defaultValue={userData.email}
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span
                  id="email-error"
                  className="text-danger small"
                  role="alert"
                >
                  {errors.email.message}
                </span>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="country" className="visually-hidden">
                Country/Region
              </Form.Label>
              <Form.Control
                id="country"
                {...register("country", validateFields.country)}
                placeholder="Country/region"
                type="text"
                size="lg"
                className="font-family-2 ps-4 mt-4"
                aria-required="true"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="address" className="visually-hidden">
                Street Address
              </Form.Label>
              <Form.Control
                id="address"
                {...register("address", validateFields.address)}
                placeholder="Street Address"
                type="text"
                size="lg"
                className="font-family-2 ps-4 mt-4"
                aria-required="true"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="city" className="visually-hidden">
                Town/City
              </Form.Label>
              <Form.Control
                id="city"
                {...register("city", validateFields.city)}
                placeholder="Town/city"
                type="text"
                size="lg"
                className="font-family-2 ps-4 mt-4"
                aria-required="true"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="state" className="visually-hidden">
                State
              </Form.Label>
              <Form.Control
                id="state"
                {...register("state", validateFields.state)}
                placeholder="State"
                type="text"
                size="lg"
                className="font-family-2 ps-4 mt-4"
                aria-required="true"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="phone" className="visually-hidden">
                Phone Number
              </Form.Label>
              <Form.Control
                id="phone"
                {...register("phone", validateFields.phone)}
                placeholder="Phone"
                type="tel"
                size="lg"
                className="font-family-2 ps-4 mt-4"
                aria-required="true"
              />
            </Form.Group>
          </Form>
        </Col>

        {/* Order Summary - Visible on all screens */}
        <Col xs={12} lg={5} className="mt-5">
          <section aria-labelledby="order-summary-heading">
            <h2
              id="order-summary-heading"
              className="font-family-3 text-3xl lg:text-4xl text-black"
            >
              Your Order
            </h2>
            <hr />
            {loading ? (
              <div role="status" aria-live="polite">
                <p>Loading cart items...</p>
              </div>
            ) : cartData.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <div className="d-flex justify-content-between font-family-2 font-bold">
                  <span>Product</span>
                  <span>SubTotal</span>
                </div>
                {cartData.map((item) => (
                  <div
                    key={item.product?._id || Math.random()}
                    className="d-flex justify-content-between font-family-2"
                  >
                    <span className="text-[#808080]">
                      {item.product?.title || "Unnamed Product"} x
                      {item.quantity}
                    </span>
                    <span className="font-bold">
                      {formatCurrency(item.product?.price * item.quantity)}
                    </span>
                  </div>
                ))}

                <hr />
                <div className="d-flex justify-content-between font-family-2 font-normal">
                  <span className="font-bold">Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="d-flex font-family-2 font-normal">
                  <span className="font-bold">Shipping</span>
                  <span className="ms-auto">
                    <span className="text-[#808080] inline">
                      (Regular Shipping)
                    </span>{" "}
                    {formatCurrency(5000)}
                  </span>
                </div>

                <hr />
                <div className="d-flex justify-content-between text-lg font-bold font-family-2">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice + 5000)}</span>
                </div>
              </>
            )}
          </section>
        </Col>
      </Row>

      {/* medium and small screens */}
      <Row className="py-2 d-lg-none px-3 flex flex-col ">
        {/* Billing Details - Visible on all screens */}
        <Col xs={12} className="mt-4">
          <h1 className="font-family-3 text-2xl md:text-3xl text-black">
            Billing Details
          </h1>
          <Form className="mt-3" aria-label="Billing information form">
            <div className="d-flex gap-3">
              <Form.Group className="flex-fill">
                <Form.Label
                  htmlFor="firstName-mobile"
                  className="visually-hidden"
                >
                  First Name
                </Form.Label>
                <Form.Control
                  id="firstName-mobile"
                  {...register("firstName", validateFields.name)}
                  placeholder="First Name"
                  type="text"
                  size="md"
                  className="font-family-2 ps-3"
                  defaultValue={userData.firstName}
                  aria-required="true"
                />
              </Form.Group>
              <Form.Group className="flex-fill">
                <Form.Label
                  htmlFor="lastName-mobile"
                  className="visually-hidden"
                >
                  Last Name
                </Form.Label>
                <Form.Control
                  id="lastName-mobile"
                  {...register("lastName", validateFields.name)}
                  placeholder="Last Name"
                  type="text"
                  size="md"
                  className="font-family-2 ps-3"
                  defaultValue={userData.lastName}
                  aria-required="true"
                />
              </Form.Group>
            </div>
            <Form.Group>
              <Form.Label htmlFor="email-mobile" className="visually-hidden">
                Email Address
              </Form.Label>
              <Form.Control
                id="email-mobile"
                {...register("email", validateFields.email)}
                placeholder="Email Address"
                type="email"
                size="md"
                className="font-family-2 ps-3 mt-3"
                defaultValue={userData.email}
                aria-required="true"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="country-mobile" className="visually-hidden">
                Country/Region
              </Form.Label>
              <Form.Control
                id="country-mobile"
                {...register("country", validateFields.country)}
                placeholder="Country/region"
                type="text"
                size="md"
                className="font-family-2 ps-3 mt-3"
                aria-required="true"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="address-mobile" className="visually-hidden">
                Street Address
              </Form.Label>
              <Form.Control
                id="address-mobile"
                {...register("address", validateFields.address)}
                placeholder="Street Address"
                type="text"
                size="md"
                className="font-family-2 ps-3 mt-3"
                aria-required="true"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="city-mobile" className="visually-hidden">
                Town/City
              </Form.Label>
              <Form.Control
                id="city-mobile"
                {...register("city", validateFields.city)}
                placeholder="Town/city"
                type="text"
                size="md"
                className="font-family-2 ps-3 mt-3"
                aria-required="true"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="state-mobile" className="visually-hidden">
                State
              </Form.Label>
              <Form.Control
                id="state-mobile"
                {...register("state", validateFields.state)}
                placeholder="State"
                type="text"
                size="md"
                className="font-family-2 ps-3 mt-3"
                aria-required="true"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="phone-mobile" className="visually-hidden">
                Phone Number
              </Form.Label>
              <Form.Control
                id="phone-mobile"
                {...register("phone", validateFields.phone)}
                placeholder="Phone"
                type="tel"
                size="md"
                className="font-family-2 ps-3 mt-3"
                aria-required="true"
              />
            </Form.Group>
          </Form>
        </Col>
        {/* Order Summary - Visible on all screens */}
        <Col xs={12} className="mt-5">
          <section aria-labelledby="order-summary-heading-mobile">
            <h2
              id="order-summary-heading-mobile"
              className="font-family-3 text-3xl lg:text-4xl text-black"
            >
              Your Order
            </h2>
            <hr />
            {loading ? (
              <div role="status" aria-live="polite">
                <p>Loading cart items...</p>
              </div>
            ) : cartData.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <div className="d-flex justify-content-between font-family-2 font-bold">
                  <span>Product</span>
                  <span>SubTotal</span>
                </div>
                {cartData.map((item) => (
                  <div
                    key={item.product?._id || Math.random()}
                    className="d-flex justify-content-between font-family-2"
                  >
                    <span className="text-[#808080]">
                      {item.product?.title || "Unnamed Product"} x
                      {item.quantity}
                    </span>
                    <span className="font-bold">
                      {formatCurrency(item.product?.price * item.quantity)}
                    </span>
                  </div>
                ))}

                <hr />
                <div className="d-flex justify-content-between font-family-2 font-normal">
                  <span className="font-bold">Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
                <div className="d-flex font-family-2 font-normal">
                  <span className="font-bold">Shipping</span>
                  <span className="ms-auto">
                    <span className="text-[#808080] inline">
                      (Regular Shipping)
                    </span>{" "}
                    {formatCurrency(5000)}
                  </span>
                </div>

                <hr />
                <div className="d-flex justify-content-between text-lg font-bold font-family-2">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice + 5000)}</span>
                </div>
              </>
            )}
          </section>
        </Col>
      </Row>

      <div className="tom-container md:w-6/12 lg:w-5/12">
        <h2 className="font-medium font-family-3">Payment Method</h2>
        <fieldset>
          <legend className="visually-hidden">Choose a payment method</legend>
          <div>
            <div className="rounded-lg">
              <div className="bg-[#F5F5F5] px-3 py-2">
                <input
                  type="radio"
                  name="payment"
                  id="bank-transfer"
                  value="bank-transfer"
                  checked={selectedPayment === "bank-transfer"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  aria-describedby="bank-transfer-description"
                />
                <label htmlFor="bank-transfer" className="ml-[2px]">
                  Direct Bank Transfer
                </label>
              </div>

              <p
                id="bank-transfer-description"
                className="py-3 px-3 text-sm lg:text-base font-family-2"
              >
                Make your payment into our bank account. Please use your Order
                ID as the payment reference. Your order will not be shipped
                until the funds have cleared in our account.
              </p>

              <div className="bg-[#F5F5F5] px-3 py-2">
                <input
                  type="radio"
                  name="payment"
                  id="paypal"
                  value="paypal"
                  checked={selectedPayment === "paypal"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                <label htmlFor="paypal" className="ml-[2px]">
                  Paypal
                </label>
              </div>
            </div>

            <div className="">
              <img
                src="/allpay.svg"
                alt="Accepted payment methods: Visa, Mastercard, American Express, and PayPal"
                className=""
              />
            </div>
          </div>
        </fieldset>

        <button
          onClick={handlePayWithPaystack}
          className="text-white rounded-3 py-2 bg-[#01497C] w-100 mt-4"
          aria-label="Proceed to payment with Paystack"
        >
          Pay with Paystack
        </button>
      </div>

      <Subscribe />
    </>
  );
};

export default Checkout;
