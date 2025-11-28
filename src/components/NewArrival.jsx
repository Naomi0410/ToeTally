import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";
import ActionButton from "./ActionButton";
import { formatCurrency } from "../utils";
import {
  ProductCardSkeletonLarge,
  ProductCardSkeletonSmall,
} from "./ProductSkeletons";

const NewArrival = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend-toetally-1.onrender.com/api/products"
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
    navigate(`/addtocart/${productId}`);
  };

  return (
    <>
      {/* Large screen */}
      <section
        className="xl:mt-24 lg:mt-20 hidden lg:block pl-12"
        aria-labelledby="new-arrivals-heading"
      >
        <motion.h1
          id="new-arrivals-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-family-3 lg:text-4xl xl:text-5xl text-black"
        >
          NEW ARRIVALS
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-family-4 lg:text-2xl xl:text-3xl"
        >
          Fresh Looks, New Moves.
        </motion.h2>

        {error && (
          <div role="alert" className="text-danger" aria-live="polite">
            {error}
          </div>
        )}

        <div className="mt-4 flex gap-8 items-center text-sm font-family-2 overflow-x-auto overflow-y-hidden hide-scrollbar">
          {loading
            ? // Show 7 skeleton loaders
              Array(7)
                .fill(0)
                .map((_, index) => (
                  <ProductCardSkeletonLarge key={`skeleton-${index}`} />
                ))
            : !error &&
              products.slice(0, 7).map((item, index) => (
                <motion.div
                  key={item._id || item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="flex-shrink-0"
                >
                  <Card
                    className="border-0 pb-2 hover-brightness"
                    style={{
                      width: "18rem",
                      minHeight: "27rem",
                      backgroundColor: "#B5B5B51A",
                    }}
                    as="article"
                    aria-label={`${item.title} product card`}
                  >
                    <motion.div
                      style={{ height: "15rem", width: "auto" }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card.Img
                        variant="top"
                        src={item.thumbnail}
                        alt={`${item.title} - ${item.color} ${item.productTag}`}
                        className="object-fit-contain p-2"
                        style={{ height: "15rem" }}
                      />
                    </motion.div>
                    <Card.Body>
                      <Card.Text
                        className="font-family-2 fw-bold text-lg"
                        style={{ height: "1rem" }}
                      >
                        {item.title.length > 20
                          ? `${item.title.substring(0, 20)}...`
                          : item.title}
                      </Card.Text>

                      <Card.Text
                        className="font-family-2 fw-medium text-base"
                        style={{ height: "2rem" }}
                      >
                        {item.productTag} | {item.color}
                      </Card.Text>
                      <hr className="border-2" />
                      <div className="flex mt-3 justify-between items-center">
                        <Card.Text
                          className="font-family-2 fw-bold text-lg mb-0"
                          aria-label={`Price: ${formatCurrency(item.price)}`}
                        >
                          {formatCurrency(item.price)}
                        </Card.Text>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
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
                            aria-label={`Buy ${item.title}`}
                          />
                        </motion.div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
        </div>
      </section>

      {/* Small screen */}
      <section
        className="mt-4 p-3 d-block d-lg-none"
        aria-labelledby="new-arrivals-heading-mobile"
      >
        <motion.h1
          id="new-arrivals-heading-mobile"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-family-3 text-2xl md:text-3xl text-black"
        >
          NEW ARRIVALS
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-family-4 text-lg md:text-xl"
        >
          Fresh Looks, New Moves.
        </motion.h2>
        {error && (
          <div role="alert" className="text-danger" aria-live="polite">
            {error}
          </div>
        )}

        <div className="mt-2 flex gap-3 items-center text-sm font-family-2 overflow-x-auto overflow-y-hidden hide-scrollbar">
          {loading
            ? // Show 7 skeleton loaders
              Array(7)
                .fill(0)
                .map((_, index) => (
                  <ProductCardSkeletonSmall key={`skeleton-mobile-${index}`} />
                ))
            : !error &&
              products.slice(0, 7).map((item, index) => (
                <motion.div
                  key={item._id || item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0"
                >
                  <Card
                    className="border-0 pb-2 hover-brightness"
                    style={{
                      width: "13rem",
                      minHeight: "15rem",
                      backgroundColor: "#B5B5B51A",
                    }}
                    as="article"
                    aria-label={`${item.title} product card`}
                  >
                    <motion.div
                      style={{ height: "8rem", width: "auto" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card.Img
                        variant="top"
                        src={item.thumbnail}
                        className="object-fit-contain p-2"
                        alt={`${item.title} - ${item.color} ${item.productTag}`}
                        style={{ height: "8rem" }}
                      />
                    </motion.div>
                    <Card.Body>
                      <div style={{ height: "1rem", width: "auto" }}>
                        <Card.Text className="font-family-2 fw-bold text-sm">
                          {item.title.length > 18
                            ? `${item.title.substring(0, 18)}...`
                            : item.title}
                        </Card.Text>
                      </div>
                      <Card.Text
                        className="font-family-2 fw-medium text-xs mt-1"
                        style={{ height: "1rem", width: "auto" }}
                      >
                        {item.productTag} | {item.color}
                      </Card.Text>
                      <hr className="border-2" />
                      <div className="flex mt-3 justify-between items-center">
                        <Card.Text
                          className="font-family-2 fw-bold text-xs mb-0"
                          aria-label={`Price: ${formatCurrency(item.price)}`}
                        >
                          {formatCurrency(item.price)}
                        </Card.Text>
                        <motion.div whileTap={{ scale: 0.9 }}>
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
                            aria-label={`Buy ${item.title}`}
                          />
                        </motion.div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              ))}
        </div>
      </section>
    </>
  );
};

export default NewArrival;
