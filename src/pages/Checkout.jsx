import { Col, Form, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { formatCurrency, validateFields } from "../utils";
import { Subscribe } from "../components";
import Alert from "../components/alert/Alert";
const API_BASE_URL = "https://backend-toetally.onrender.com/api";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [alert, setAlert] = useState(null);

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
      <div style={{ backgroundColor: "#EBEBEB" }} className="">
        <div className="px-16 py-3 lg:flex gap-3 hidden">
          <Link
            to="/"
            className="text-customLightGray font-semibold lg:text-xl font-family-2 no-underline"
          >
            Home
          </Link>
          <span className="font-semibold font-family-1 lg:text-xl text-customLightGray">
            /
          </span>
          <Link
            to="/cart"
            className="font-semibold font-family-2 lg:text-xl text-customLightGray no-underline"
          >
            Cart
          </Link>
          <span className="font-semibold font-family-1 lg:text-xl text-customLightGray">
            /
          </span>
          <span className="font-semibold font-family-2 lg:text-xl">
            Checkout
          </span>
        </div>

        <div className="px-3 block lg:hidden py-2 flex gap-2 ">
          <Link
            to="/"
            className="text-customLightGray font-semibold text-sm font-family-2 no-underline"
          >
            Home
          </Link>
          <span className="font-semibold font-family-1 text-sm text-customLightGray">
            /
          </span>
          <Link
            to="/cart"
            className="font-semibold font-family-2 text-sm text-customLightGray no-underline"
          >
            Cart
          </Link>
          <span className="font-semibold font-family-1 text-sm text-customLightGray">
            /
          </span>
          <span className="font-semibold font-family-2 text-sm">
            Checkout
          </span>
        </div>
      </div>

      <Row className="py-4 md:w-full lg:w-11/12 flex flex-col lg:flex-row lg:justify-between mx-auto">
        {/* Billing Details - Visible on all screens */}
        <Col xs={12} lg={6} className="mt-4">
          <h1 className="font-family-3 text-3xl lg:text-5xl text-black">
            Billing Details
          </h1>
          <Form className="mt-4">
            <div className="d-flex gap-3">
              <Form.Control
                {...register("firstName", validateFields.name)}
                placeholder="First Name"
                type="text"
                size="lg"
                className="font-family-2 ps-4"
                defaultValue={userData.firstName}
              />
              <Form.Control
                {...register("lastName", validateFields.name)}
                placeholder="Last Name"
                type="text"
                size="lg"
                className="font-family-2 ps-4 "
                defaultValue={userData.lastName}
              />
            </div>
            <Form.Control
              {...register("email", validateFields.email)}
              placeholder="Email Address"
              type="text"
              size="lg"
              className="font-family-2 ps-4 mt-4"
              defaultValue={userData.email}
            />
            <Form.Control
              {...register("country", validateFields.country)}
              placeholder="Country/region"
              type="text"
              size="lg"
              className="font-family-2 ps-4 mt-4"
            />
            <Form.Control
              {...register("address", validateFields.address)}
              placeholder="Street Address"
              type="text"
              size="lg"
              className="font-family-2 ps-4 mt-4"
            />
            <Form.Control
              {...register("city", validateFields.city)}
              placeholder="Town/city"
              type="text"
              size="lg"
              className="font-family-2 ps-4 mt-4"
            />
            <Form.Control
              {...register("state", validateFields.state)}
              placeholder="State"
              type="text"
              size="lg"
              className="font-family-2 ps-4 mt-4"
            />
            <Form.Control
              {...register("phone", validateFields.phone)}
              placeholder="Phone"
              type="text"
              size="lg"
              className="font-family-2 ps-4 mt-4"
            />
          </Form>
        </Col>

        {/* Order Summary - Visible on all screens */}
        <Col xs={12} lg={5} className="mt-5">
          <h1 className="font-family-3 text-3xl lg:text-4xl text-black">
            Your Order
          </h1>
          <hr />
          {loading ? (
            <p>Loading cart items...</p>
          ) : cartData.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="d-flex justify-content-between font-family-2 font-bold">
                <p>Product</p>
                <p>SubTotal</p>
              </div>
              {cartData.map((item) => (
                <div
                  key={item.product?._id || Math.random()}
                  className="d-flex justify-content-between font-family-2"
                >
                  <p className="text-[#808080]">
                    {item.product?.title || "Unnamed Product"} x{item.quantity}
                  </p>
                  <p className="font-bold">
                    {formatCurrency(item.product?.price * item.quantity)}
                  </p>
                </div>
              ))}

              <hr />
              <div className="d-flex justify-content-between font-family-2 font-normal">
                <p className="font-bold">Subtotal</p>
                <p>{formatCurrency(totalPrice)}</p>
              </div>
              <div className="d-flex font-family-2 font-normal">
                <p className="font-bold">Shipping</p>
                <span className="ms-auto">
                  <span className="text-[#808080] inline">
                    (Regular Shipping)
                  </span> {" "}
                  {formatCurrency(5000)}
                </span>
              </div>

              <hr />
              <div className="d-flex justify-content-between text-lg font-bold font-family-2">
                <p>Total</p>
                <p>{formatCurrency(totalPrice + 5000)}</p>
              </div>
            </>
          )}
        </Col>
      </Row>

      <div className="tom-container md:w-6/12 lg:w-5/12">
        <h1 className="font-medium  font-family-3">Payment Method</h1>
        <div>
          <div className="rounded-lg">
            <div className="bg-[#F5F5F5] px-3 py-2">
              <input type="radio" name="payment" id="bank-transfer" />
              <label htmlFor="bank-transfer" className="ml-[2px]">
                Direct Bank Transfer
              </label>
            </div>

            <p className="py-3 px-3 font-family-2">
              Make your payment into our bank account. Please use your Order ID
              as the payment reference. Your order will not be shipped until the
              funds have cleared in our account.
            </p>

            <div className="bg-[#F5F5F5] px-3 py-2">
              <input type="radio" name="payment" id="paypal" />
              <label htmlFor="paypal" className="ml-[2px]">
                Paypal
              </label>
            </div>
          </div>

          <div className="">
            <img src="/allpay.svg" alt="all payment platform" className="" />
          </div>
        </div>

        <button
          onClick={handlePayWithPaystack}
          className=" text-white rounded-3 py-2  bg-[#01497C] w-100 mt-4"
        >
          Pay with Paystack
        </button>
      </div>

      <div className="mx-auto lg:w-11/12">
        <Subscribe />
      </div>
    </>
  );
};

export default Checkout;
