import { Card, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { formatCurrency } from "../utils";
import ActionButton from "./ActionButton";
import { discountBadge } from "../assets";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Discount = () => {
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
    navigate(`/addtocart/${productId}`);
  };

  return (
    <>
      {/* Large screen */}
      <div className="mt-20 hidden lg:block pl-12">
        <motion.h1 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-family-3 lg:text-4xl xl:text-5xl text-black"
        >
          DISCOUNT OFFERS
        </motion.h1>
        <div className="mt-4 flex gap-8 items-center text-sm font-family-2 overflow-x-auto overflow-y-hidden hide-scrollbar">
          {loading && <Spinner animation="border" />}
          {error && <p className="text-danger">{error}</p>}
          {!loading &&
            !error &&
            products.slice(7, 12).map((item, index) => (
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
                  className="border-0 pb-2 hover-brightness position-relative"
                  style={{
                    width: "18rem",
                    minHeight: "27rem",
                    backgroundColor: "#B5B5B51A",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="font-family-4 text-4xl position-absolute"
                    style={{
                      width: "75%",
                      height: "70px",
                      left: "-20px",
                      top: "10px",
                      backgroundImage: `url(${discountBadge})`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      color: "white",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    10% OFF
                  </motion.div>
                  <motion.div 
                    style={{ height: "15rem", width: "auto" }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card.Img
                      variant="top"
                      src={item.thumbnail}
                      className="object-fit-contain pt-5 p-2"
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
                      <Card.Text className="font-family-2 fw-bold text-lg mb-0">
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
                        />
                      </motion.div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
      
      {/* Small screen */}
      <div className="mt-4 p-3 d-block d-lg-none">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-family-3 text-2xl md:text-3xl text-black"
        >
          DISCOUNT OFFERS
        </motion.h1>
        {loading && <Spinner animation="border" />}
        {error && <p className="text-danger">{error}</p>}
        <div className="mt-2 flex gap-4 align-items-center text-sm font-family-2 overflow-x-auto overflow-y-hidden hide-scrollbar">
          {!loading &&
            !error &&
            products.slice(7, 12).map((item, index) => (
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
                  className="border-0 pb-2 hover-brightness position-relative"
                  style={{
                    width: "13rem",
                    minHeight: "15rem",
                    backgroundColor: "#B5B5B51A",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, x: -20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    className="font-family-4 text-2xl position-absolute"
                    style={{
                      width: "75%",
                      height: "50px",
                      left: "-15px",
                      top: "10px",
                      backgroundImage: `url(${discountBadge})`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      color: "white",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    10% OFF
                  </motion.div>
                  <motion.div 
                    style={{ height: "10rem", width: "auto" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card.Img
                      variant="top"
                      src={item.thumbnail}
                      className="object-fit-contain p-2 pt-5"
                      style={{ height: "10rem" }}
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
                    <Card.Text className="font-family-2 fw-medium text-xs mt-1" style={{ height: "1rem", width: "auto" }}>
                      {item.productTag} | {item.color}
                    </Card.Text>
                    <hr className="border-2" />
                    <div className="flex mt-3 justify-between items-center">
                      <Card.Text className="font-family-2 fw-bold text-xs mb-0">
                        {formatCurrency(item.price)}
                      </Card.Text>
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                      >
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
                      </motion.div>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Discount;