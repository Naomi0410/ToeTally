import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";
import ActionButton from "./ActionButton";
import { formatCurrency } from "../utils";

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend-toetally.onrender.com/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (productId) => {
    if (!productId) {
      console.error("Product ID is missing!");
      return;
    }
    navigate(`/addtocart/${productId}`); // Navigate with product ID
  };

  return (
    <>
      <div className="xl:mt-24 lg:mt-20 d-none d-lg-block pl-16">
        <h1 className="font-family-3 text-5xl text-black">NEW ARRIVALS</h1>
        <h2 className="font-family-4 text-4xl">Fresh Looks, New Moves.</h2>
        {loading && <Spinner animation="border" />}
        {error && <p className="text-danger">{error}</p>}

        <div className="mt-4 d-flex gap-8 align-items-center text-sm font-family-2 overflow-x-auto overflow-y-hidden hide-scrollbar">
          {!loading &&
            !error &&
            products.slice(0, 7).map((item) => (
              <Card
                key={item._id || item.id}
                className="flex-shrink-0 border-0 pb-2 hover-brightness"
                style={{
                  width: "22rem",
                  minHeight: "27rem",
                  backgroundColor: "#B5B5B51A",
                }}
              >
                <div style={{ height: "15rem", width: "auto" }}>
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    className="object-fit-contain p-2"
                    style={{ height: "15rem" }}
                  />
                </div>
                <Card.Body>
                  <Card.Text
                    className="font-family-2 fw-bold text-xl"
                    style={{ height: "1rem" }}
                  >
                    {item.title.length > 25
                      ? `${item.title.substring(0, 25)}...`
                      : item.title}
                  </Card.Text>

                  <Card.Text
                    className="font-family-2 fw-medium text-lg"
                    style={{ height: "2rem" }}
                  >
                    {item.productTag} | {item.color}
                  </Card.Text>
                  <hr className="border-2" />
                  <div className="d-flex mt-8 justify-content-between align-items-center">
                    <Card.Text className="font-family-2 fw-bold text-xl mb-0">
                      {formatCurrency(item.price)}
                    </Card.Text>
                    <ActionButton
                      variant="none"
                      size="md"
                      text="Buy Now"
                      style={{
                        backgroundColor: "#01497C",
                        fontFamily: "Alexandria variable",
                        color: "white",
                      }}
                      hoverStyle={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid black",
                      }}
                      className="font-family-2 rounded-1 w-32  p-2"
                      onClick={() => handleClick(item._id || item.id)}
                    />
                  </div>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
      {/* small screen */}
      <div className="mt-4 p-3 d-block d-lg-none">
        <h1 className="font-family-3 text-3xl md:text-4xl text-black">
          NEW ARRIVALS
        </h1>
        <h2 className="font-family-4 text-2xl">Fresh Looks, New Moves.</h2>
        {loading && <Spinner animation="border" />}
        {error && <p className="text-danger">{error}</p>}
        <div className="mt-2 d-flex gap-4 align-items-center text-sm font-family-2 overflow-x-auto overflow-y-hidden hide-scrollbar">
          {!loading &&
            !error &&
            products.slice(0, 7).map((item) => (
              <Card
                key={item._id || item.id}
                className="flex-shrink-0 border-0 pb-2 hover-brightness"
                style={{
                  width: "15rem",
                  minHeight: "15rem",
                  backgroundColor: "#B5B5B51A",
                }}
              >
                <div style={{ height: "8rem", width: "auto" }}>
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    className="object-fit-contain p-2"
                    style={{ height: "10rem" }}
                  />
                </div>
                <Card.Body>
                  <div style={{ height: "2rem", width: "auto" }}>
                    <Card.Text className="font-family-2 fw-bold text-base">
                      {item.title.length > 18
                        ? `${item.title.substring(0, 18)}...`
                        : item.title}
                    </Card.Text>
                  </div>
                  <Card.Text className="font-family-2 fw-medium text-base" style={{ height: "2rem", width: "auto" }}>
                    {item.productTag} | {item.color}
                  </Card.Text>
                  <hr className="border-2" />
                  <div className="d-flex mt-4 justify-content-between align-items-center">
                    <Card.Text className="font-family-2 fw-bold text-sm mb-0">
                      {formatCurrency(item.price)}
                    </Card.Text>
                    <ActionButton
                      variant="none"
                      size="sm"
                      text="Buy Now"
                      style={{
                        backgroundColor: "#01497C",
                        fontFamily: "Alexandria variable",
                        color: "white",
                      }}
                      hoverStyle={{
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid black",
                      }}
                      className="font-family-2 rounded-1 w-24"
                      onClick={() => handleClick(item._id || item.id)}
                    />
                  </div>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default NewArrival;
