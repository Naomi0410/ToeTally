import { Link, useNavigate } from "react-router-dom";
import { ActionButton, Discount, Subscribe } from "../components";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../utils";
import { RiArrowDropDownLine } from "react-icons/ri";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [displayedBrand, setDisplayedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend-toetally.onrender.com/api/products"
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
      const filteredProducts = products.filter((product) => product.productTag === brand);
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
    navigate(`/addtocart/${productId}`); // Navigate with product ID
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
      <div style={{ backgroundColor: "#EBEBEB" }}>
        <div className="px-16 py-3 lg:flex gap-3 hidden mb-5">
          <Link
            to="/"
            className="text-customLightGray font-semibold text-xl font-family-2 no-underline"
          >
            Home
          </Link>
          <span className="font-semibold text-customLightGray font-family-1 text-xl">
            /
          </span>
          <span className="font-semibold font-family-2 text-xl">Shop Now</span>
        </div>
      </div>
      <div className="lg:px-20 md:px-8 md:mt-10">
        <Row className="h-100 d-none d-lg-flex">
          <Col xl={2} lg={3} className="border-2 py-16 px-3 rounded-3 h-100">
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

          </Col>
          <Col xl={10} lg={9} className="h-100">
            <div className="font-family-2 mb-8 d-flex align-items-center justify-content-between">
              <h1>
                {" "}
                {displayedBrand === "All"
                  ? "All"
                  : displayedBrand.charAt(0).toUpperCase() +
                    displayedBrand.slice(1).toLowerCase()}
              </h1>

              <div className="font-family-2 d-flex gap-2 align-items-center">
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
              <div className="grid lg:grid-cols-3 md:grid-cols-2 md:gap-10 lg:gap-4 xl:gap-10 justify-content-between">
                {currentProducts.length === 0 ? (
                  <p>No products found for the selected brand.</p>
                ) : (
                  currentProducts.map((item) => (
                    <Card
                      key={item._id || item.id}
                      className="flex-shrink-0 border-0 hover-brightness card"
                      style={{
                        backgroundColor: "#B5B5B51A",
                      }}
                    >
                      <div style={{ width: "auto" }}>
                        <Card.Img
                          variant="top"
                          src={item.thumbnail}
                          className="object-fit-contain p-2"
                          style={{ height: "15vw" }}
                        />
                      </div>
                      <Card.Body>
                        <Card.Text
                          className="font-family-2 fw-bold xl:text-xl lg:text-base"
                          style={{ height: "0.75rem" }}
                        >
                          {item.title.length > 15
                            ? `${item.title.substring(0, 15)}...`
                            : item.title}
                        </Card.Text>
                        <Card.Text
                          className="font-family-2 fw-medium xl:text-lg lg:text-sm"
                          style={{ height: "1.5rem" }}
                        >
                          {item.productTag.length > 15
                            ? `${item.productTag.substring(0, 15)}...`
                            : item.productTag}{" "}
                          | {item.color}
                        </Card.Text>
                        <hr className="border-2" />
                        <div className="d-flex justify-content-between align-items-center">
                          <Card.Text className="font-family-2 fw-bold xl:text-xl lg:text-sm mb-0">
                            {formatCurrency(item.price)}
                          </Card.Text>
                          <button
                            className="font-family-2 rounded-1 py-2 xl:px-4 lg:px-3 md:px-4 xl:text-lg lg:text-xs"
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
            <div className="pagination d-flex justify-content-center align-items-center gap-5 mt-3">
              {currentPage > 1 && (
                <button
                  className="pagination-button font-family-2"
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
                      className={`pagination-button font-family-2 ${
                        currentPage === pageNumber
                          ? "active bg-[#01497C] text-white p-3 rounded-5"
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
                  className="pagination-button font-family-2"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-between align-items-center px-3 d-lg-none">
        <div style={{ position: "relative" }}>
          <span className="font-family-2 text-sm d-flex">
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
      <div className="d-lg-none d-block">
      {loading && <Spinner animation="border" />}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="px-3 grid grid-cols-2 lg:hidden gap-3">
          {currentProducts.length === 0 ? (
            <p>No products found for the selected brand.</p>
          ) : (
            currentProducts.map((item) => (
              <Card
                key={item._id || item.id}
                className="border-0 pb-2 hover-brightness card"
                style={{
                  backgroundColor: "#B5B5B51A",
                  width: "45vw",
                }}
              >
                <div style={{ width: "auto" }}>
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    className="object-fit-contain p-2"
                    style={{ height: "8rem" }}
                  />
                </div>
                <Card.Body>
                  <Card.Text
                    className="font-family-2 fw-bold text-xs"
                    style={{ height: "1rem" }}
                  >
                    {item.title.length > 15
                      ? `${item.title.substring(0, 15)}...`
                      : item.title}
                  </Card.Text>
                  <Card.Text
                    className="font-family-2 fw-medium text-xs"
                    style={{ height: "1rem" }}
                  >
                    {item.productTag} | {item.color}
                  </Card.Text>
                  <hr className="border-2" />
                  <div className="d-flex justify-content-between align-items-center">
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
      </div>
      <Discount />
      <div className="mx-auto lg:w-11/12">
        
        <Subscribe/>
  
        </div>
    </div>
  );
};
export default Shop;
