import { Link, useNavigate } from "react-router-dom";
import { ActionButton, Discount, Subscribe } from "../components";
import { Card, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../utils";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedBrand, setDisplayedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setProductsPerPage(10);
      } else if (width >= 1024) {
        setProductsPerPage(8);
      } else if (width >= 768) {
        setProductsPerPage(6);
      } else {
        setProductsPerPage(6);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend-toetally-1.onrender.com/api/products"
        );
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBrandDropdownClick = () => {
    setShowBrandDropdown(!showBrandDropdown);
  };

  const handleBrandClick = (brand) => {
    if (brand === "All") {
      setFilteredProducts(products);
      setDisplayedBrand("All");
      setSelectedBrands([]);
    } else {
      const filteredProducts = products.filter(
        (product) => product.productTag === brand
      );
      setFilteredProducts(filteredProducts);
      setDisplayedBrand(brand);
      setSelectedBrands([brand]);
    }
    setCurrentPage(1);
    if (window.innerWidth < 992) {
      setShowBrandDropdown(false);
    }
  };

  const handleSortByChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
    let filteredProducts;

    if (newSortBy === "All") {
      filteredProducts = products;
    } else {
      filteredProducts = products;
      if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedBrands.includes(product.productTag)
        );
      }

      if (newSortBy === "New Arrivals") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === "newarrivals"
        );
      } else if (newSortBy === "Offers") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === "offers"
        );
      }
    }
    setFilteredProducts(filteredProducts);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = (productId) => {
    if (!productId) {
      console.error("Product ID is missing!");
      return;
    }
    navigate(`/addtocart/${productId}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: "#EBEBEB" }}
      >
        <div className="px-12 lg:py-2 xl:py-3 lg:flex gap-3 hidden mb-5">
          <Link
            to="/"
            className="text-customLightGray font-semibold text-base font-family-2 no-underline  hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <span className="font-semibold text-customLightGray font-family-1 text-base">
            /
          </span>
          <span className="font-semibold font-family-2 text-base text-black">
            Shop Now
          </span>
        </div>

        <div className="px-3 py-2 flex gap-2 lg:hidden mb-3">
          <Link
            to="/"
            className="text-customLightGray font-semibold text-xs font-family-2 no-underline  hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <span className="font-semibold text-customLightGray font-family-1 text-xs">
            /
          </span>
          <span className="font-semibold font-family-2 text-xs text-black">
            Shop Now
          </span>
        </div>
      </motion.div>

      <div className="lg:px-12 md:px-4">
        <div className="h-100 hidden md:flex gap-6">
          <div className="border-2 py-12 px-3 rounded-3 h-100 md:w-1/4 lg:w-1/5">
            <p className="text-[#2C6892] text-xl font-family-2 font-medium">
              Filters
            </p>
            <ActionButton
              variant="none"
              size="md"
              text="All"
              style={{
                backgroundColor:
                  selectedBrands.length === 0 ? "#2C6892" : "white",
                fontFamily: "Alexandria variable",
                color: selectedBrands.length === 0 ? "white" : "black",
              }}
              hoverStyle={{
                backgroundColor: "#2C6892",
                color: "white",
              }}
              onClick={() => handleBrandClick("All")}
              className="font-family-2 rounded-2 w-100 text-start font-medium"
            />
            <hr className="gradient-hr" />
            <ActionButton
              variant="none"
              size="md"
              text="ADIDAS"
              style={{
                backgroundColor: selectedBrands.includes("ADIDAS")
                  ? "#2C6892"
                  : "white",
                fontFamily: "Alexandria variable",
                color: selectedBrands.includes("ADIDAS") ? "white" : "black",
              }}
              hoverStyle={{
                backgroundColor: "#2C6892",
                color: "white",
              }}
              onClick={() => handleBrandClick("ADIDAS")}
              className="font-family-2 rounded-2 w-100 text-start font-medium"
            />
            <hr className="gradient-hr" />
            <ActionButton
              variant="none"
              size="md"
              text="BALENCIAGA"
              style={{
                backgroundColor: selectedBrands.includes("BALENCIAGA")
                  ? "#2C6892"
                  : "white",
                fontFamily: "Alexandria variable",
                color: selectedBrands.includes("BALENCIAGA")
                  ? "white"
                  : "black",
              }}
              hoverStyle={{
                backgroundColor: "#2C6892",
                color: "white",
              }}
              onClick={() => handleBrandClick("BALENCIAGA")}
              className="font-family-2 rounded-2 w-100 text-start font-medium"
            />
            <hr className="gradient-hr" />
            <ActionButton
              variant="none"
              size="md"
              text="LOUBOUTIN"
              style={{
                backgroundColor: selectedBrands.includes("Christian Louboutin")
                  ? "#2C6892"
                  : "white",
                fontFamily: "Alexandria variable",
                color: selectedBrands.includes("Christian Louboutin")
                  ? "white"
                  : "black",
              }}
              hoverStyle={{
                backgroundColor: "#2C6892",
                color: "white",
              }}
              onClick={() => handleBrandClick("Christian Louboutin")}
              className="font-family-2 rounded-2 w-100 text-start font-medium"
            />
            <hr className="gradient-hr" />
            <ActionButton
              variant="none"
              size="md"
              text="LOUIS VUITTON"
              style={{
                backgroundColor: selectedBrands.includes("LOUIS VUITTON")
                  ? "#2C6892"
                  : "white",
                fontFamily: "Alexandria variable",
                color: selectedBrands.includes("LOUIS VUITTON")
                  ? "white"
                  : "black",
              }}
              hoverStyle={{
                backgroundColor: "#2C6892",
                color: "white",
              }}
              onClick={() => handleBrandClick("LOUIS VUITTON")}
              className="font-family-2 rounded-2 w-100 text-start font-medium"
            />
            <hr className="gradient-hr" />
            <ActionButton
              variant="none"
              size="md"
              text="SKETCHERS"
              style={{
                backgroundColor: selectedBrands.includes("Skechers")
                  ? "#2C6892"
                  : "white",
                fontFamily: "Alexandria variable",
                color: selectedBrands.includes("Skechers") ? "white" : "black",
              }}
              hoverStyle={{
                backgroundColor: "#2C6892",
                color: "white",
              }}
              onClick={() => handleBrandClick("Skechers")}
              className="font-family-2 rounded-2 w-100 text-start font-medium"
            />
          </div>

          <div className="h-100 md:w-3/4 lg:w-4/5">
            <div className="font-family-2 mb-2 d-flex align-items-center justify-content-between">
              <h1 className="text-xl xl:text-2xl font-bold">
                {" "}
                {displayedBrand === "All"
                  ? "All"
                  : displayedBrand.charAt(0).toUpperCase() +
                    displayedBrand.slice(1).toLowerCase()}
              </h1>

              <div className="font-family-2 flex gap-2 items-center">
                <span>
                  {indexOfFirstProduct + 1} -{" "}
                  {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                  {filteredProducts.length} Products
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                  className="font-family-2 font-bold"
                >
                  Sort by:{" "}
                  <span
                    onClick={handleDropdownClick}
                    className="font-family-2 font-bold"
                  >
                    {" "}
                    {sortBy}
                  </span>
                  <span onClick={handleDropdownClick}>
                    <RiArrowDropDownLine style={{ marginLeft: 5 }} />
                  </span>
                  {showDropdown && (
                    <ul
                      style={{
                        position: "absolute",
                        top: "100%",
                        width: "150px",
                        left: 0,
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        padding: 10,
                        zIndex: 1,
                      }}
                      onClick={(e) => {
                        if (e.target.tagName === "LI") {
                          handleSortByChange(e.target.textContent);

                          handleDropdownClick();
                        }
                      }}
                    >
                      <li className="mb-3">All</li>
                      <li className="mb-3">New Arrivals</li>
                      <li>Offers</li>
                    </ul>
                  )}
                </span>
              </div>
            </div>
            {loading && <Spinner animation="border" />}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-3 lg:gap-4">
                {currentProducts.length === 0 ? (
                  <p>No products found for the selected brand.</p>
                ) : (
                  currentProducts.map((item) => (
                    <div
                      key={item._id || item.id}
                      className="flex-shrink-0 border-0 transition-all hover:brightness-110"
                      style={{
                        backgroundColor: "#B5B5B51A",
                      }}
                    >
                      <div className="w-auto">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                          style={{ height: "7rem" }}
                        />
                      </div>
                      <div className="px-3">
                        <p
                          className="font-bold text-base mb-2"
                          style={{ height: "0.5rem" }}
                        >
                          {item.title.length > 10
                            ? `${item.title.substring(0, 10)}...`
                            : item.title}
                        </p>
                        <p
                          className="font-medium text-sm mb-2"
                          style={{ height: "1.5rem" }}
                        >
                          {item.productTag.length > 6
                            ? `${item.productTag.substring(0, 6)}...`
                            : item.productTag}{" "}
                          |{" "}
                          {item.color.length > 6
                            ? `${item.color.substring(0, 6)}...`
                            : item.color}
                        </p>
                        <hr className="border-t-2 my-2" />
                        <div className="flex justify-between items-center mb-3">
                          <p className="font-bold text-xs mb-0">
                            {formatCurrency(item.price)}
                          </p>
                          <button
                            className="rounded py-2 px-2 xl:text-sm md:text-xs transition-all hover:bg-white hover:text-black hover:border hover:border-black"
                            style={{
                              backgroundColor: "#01497C",
                              color: "white",
                            }}
                            onClick={() => handleClick(item._id || item.id)}
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            <div className="pagination d-flex justify-content-center align-items-center gap-4 mt-3">
              {currentPage > 1 && (
                <button
                  className="pagination-button font-family-2 font-bold text-sm"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Prev
                </button>
              )}
              {Array(
                Math.min(
                  3,
                  Math.ceil(filteredProducts.length / productsPerPage)
                )
              )
                .fill()
                .map((_, index) => {
                  const pageNumber = Math.max(1, currentPage - 2) + index;
                  return (
                    <button
                      key={pageNumber}
                      className={`pagination-button font-family-2 text-base ${
                        currentPage === pageNumber
                          ? "active bg-[#01497C] text-white px-3 py-2 rounded-5 text-sm font-semibold"
                          : ""
                      }`}
                      onClick={() => paginate(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              {currentPage <
                Math.ceil(filteredProducts.length / productsPerPage) && (
                <button
                  className="pagination-button font-family-2 font-bold text-sm"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-3 md:hidden">
        <div style={{ position: "relative" }}>
          <span className="font-family-2 text-base font-bold flex">
            {" "}
            {displayedBrand === "All"
              ? "All"
              : displayedBrand.charAt(0).toUpperCase() +
                displayedBrand.slice(1).toLowerCase()}
            <RiArrowDropDownLine
              style={{ marginLeft: 1 }}
              size="25px"
              onClick={handleBrandDropdownClick}
            />
          </span>
          {showBrandDropdown && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                width: "150px",
                left: 0,
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: 10,
                zIndex: 1,
              }}
            >
              <ActionButton
                variant="none"
                size="sm"
                text="All"
                style={{
                  backgroundColor:
                    selectedBrands.length === 0 ? "#2C6892" : "white",
                  fontFamily: "Alexandria variable",
                  color: selectedBrands.length === 0 ? "white" : "black",
                }}
                hoverStyle={{
                  backgroundColor: "#2C6892",
                  color: "white",
                }}
                onClick={() => handleBrandClick("All")}
                className="font-family-2 rounded-2 w-100 text-start font-medium"
              />
              <hr className="gradient-hr" />
              <ActionButton
                variant="none"
                size="sm"
                text="ADIDAS"
                style={{
                  backgroundColor: selectedBrands.includes("ADIDAS")
                    ? "#2C6892"
                    : "white",
                  fontFamily: "Alexandria variable",
                  color: selectedBrands.includes("ADIDAS") ? "white" : "black",
                }}
                hoverStyle={{
                  backgroundColor: "#2C6892",
                  color: "white",
                }}
                onClick={() => handleBrandClick("ADIDAS")}
                className="font-family-2 rounded-2 w-100 text-start font-medium"
              />
              <hr className="gradient-hr" />
              <ActionButton
                variant="none"
                size="sm"
                text="BALENCIAGA"
                style={{
                  backgroundColor: selectedBrands.includes("BALENCIAGA")
                    ? "#2C6892"
                    : "white",
                  fontFamily: "Alexandria variable",
                  color: selectedBrands.includes("BALENCIAGA")
                    ? "white"
                    : "black",
                }}
                hoverStyle={{
                  backgroundColor: "#2C6892",
                  color: "white",
                }}
                onClick={() => handleBrandClick("BALENCIAGA")}
                className="font-family-2 rounded-2 w-100 text-start font-medium"
              />
              <hr className="gradient-hr" />
              <ActionButton
                variant="none"
                size="sm"
                text="LOUBOUTIN"
                style={{
                  backgroundColor: selectedBrands.includes(
                    "Christian Louboutin"
                  )
                    ? "#2C6892"
                    : "white",
                  fontFamily: "Alexandria variable",
                  color: selectedBrands.includes("Christian Louboutin")
                    ? "white"
                    : "black",
                }}
                hoverStyle={{
                  backgroundColor: "#2C6892",
                  color: "white",
                }}
                onClick={() => handleBrandClick("Christian Louboutin")}
                className="font-family-2 rounded-2 w-100 text-start font-medium"
              />
              <hr className="gradient-hr" />
              <ActionButton
                variant="none"
                size="sm"
                text="LOUIS VUITTON"
                style={{
                  backgroundColor: selectedBrands.includes("LOUIS VUITTON")
                    ? "#2C6892"
                    : "white",
                  fontFamily: "Alexandria variable",
                  color: selectedBrands.includes("LOUIS VUITTON")
                    ? "white"
                    : "black",
                }}
                hoverStyle={{
                  backgroundColor: "#2C6892",
                  color: "white",
                }}
                onClick={() => handleBrandClick("LOUIS VUITTON")}
                className="font-family-2 rounded-2 w-100 text-start font-medium"
              />
              <hr className="gradient-hr" />
              <ActionButton
                variant="none"
                size="sm"
                text="SKETCHERS"
                style={{
                  backgroundColor: selectedBrands.includes("Skechers")
                    ? "#2C6892"
                    : "white",
                  fontFamily: "Alexandria variable",
                  color: selectedBrands.includes("Skechers")
                    ? "white"
                    : "black",
                }}
                hoverStyle={{
                  backgroundColor: "#2C6892",
                  color: "white",
                }}
                onClick={() => handleBrandClick("Skechers")}
                className="font-family-2 rounded-2 w-100 text-start font-medium"
              />
            </ul>
          )}
        </div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            color: "grey",
          }}
          className="font-family-2 text-sm"
        >
          Sort by:{" "}
          <span
            onClick={handleDropdownClick}
            className="font-family-2 text-black"
          >
            {" "}
            {sortBy}
          </span>
          <span onClick={handleDropdownClick}>
            <RiArrowDropDownLine
              style={{ marginLeft: 1, color: "black" }}
              size="25px"
            />
          </span>
          {showDropdown && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                width: "150px",
                left: 0,
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: 10,
                zIndex: 1,
              }}
              onClick={(e) => {
                if (e.target.tagName === "LI") {
                  handleSortByChange(e.target.textContent);

                  handleDropdownClick();
                }
              }}
            >
              <li className="mb-3">All</li>
              <li className="mb-3">New Arrivals</li>
              <li>Offers</li>
            </ul>
          )}
        </span>
      </div>
      <div className="md:hidden block">
        {loading && <Spinner animation="border" />}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <div className="px-3 grid grid-cols-2 gap-2">
            {currentProducts.length === 0 ? (
              <p>No products found for the selected brand.</p>
            ) : (
              currentProducts.map((item) => (
                <Card
                  key={item._id || item.id}
                  className="border-0 pb-2 hover-brightness card"
                  style={{
                    backgroundColor: "#B5B5B51A",
                  }}
                >
                  <div style={{ width: "auto" }}>
                    <Card.Img
                      variant="top"
                      src={item.thumbnail}
                      className="object-fit-contain p-2"
                      style={{ height: "7rem" }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Text
                      className="font-family-2 fw-bold text-xs"
                      style={{ height: "0" }}
                    >
                      {item.title.length > 10
                        ? `${item.title.substring(0, 10)}...`
                        : item.title}
                    </Card.Text>
                    <Card.Text
                      className="font-family-2 fw-medium text-xs"
                      style={{ height: "0.75rem" }}
                    >
                      {item.productTag.length > 7
                        ? `${item.productTag.substring(0, 7)}...`
                        : item.productTag}{" "}
                      |
                      {item.color.length > 4
                        ? `${item.color.substring(0, 4)}...`
                        : item.color}
                    </Card.Text>
                    <hr className="border-2" />
                    <div className="flex justify-between items-center">
                      <Card.Text className="font-family-2 fw-bold text-xs mb-0">
                        {formatCurrency(item.price)}
                      </Card.Text>
                      <button
                        className="font-family-2 rounded-1 py-1 px-1 text-xs"
                        style={{
                          backgroundColor: "#01497C",
                          color: "white",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "white";
                          e.target.style.color = "black";
                          e.target.style.border = "1px solid black";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#01497C";
                          e.target.style.color = "white";
                          e.target.style.border = "";
                        }}
                        onClick={() => handleClick(item._id || item.id)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        )}
        <div className="pagination flex justify-center items-center gap-3 mt-3">
          {currentPage > 1 && (
            <button
              className="pagination-button font-family-2 text-sm font-bold"
              onClick={() => paginate(currentPage - 1)}
            >
              Prev
            </button>
          )}
          {Array(
            Math.min(3, Math.ceil(filteredProducts.length / productsPerPage))
          )
            .fill()
            .map((_, index) => {
              const pageNumber = Math.max(1, currentPage - 2) + index;
              return (
                <button
                  key={pageNumber}
                  className={`pagination-button font-family-2 text-sm ${
                    currentPage === pageNumber
                      ? "active bg-[#01497C] text-white px-2 py-1 rounded-5 text-xs font-semibold"
                      : ""
                  }`}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
          {currentPage <
            Math.ceil(filteredProducts.length / productsPerPage) && (
            <button
              className="pagination-button font-family-2 text-sm font-bold"
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <Discount />
      <div className="mx-auto lg:w-11/12">
        <Subscribe />
      </div>
    </div>
  );
};
export default Shop;
