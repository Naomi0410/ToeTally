import { Link, useNavigate } from "react-router-dom";
import { ActionButton, Discount, Subscribe } from "../components";
import { Card } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { formatCurrency } from "../utils";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";
import {
  ShopCardSkeletonMedium,
  ShopCardSkeletonMobile,
} from "../components/ProductSkeletons";

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


  const getProductsCount = () => {
    // Check if window is defined (for safety)
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1280) return 10;
      if (width >= 1024) return 8;
      return 6; 
    }
    return 8;
  };

  // Initialize state using the function (Lazy Initialization)
  const [productsPerPage, setProductsPerPage] = useState(getProductsCount);

  // Update logic on resize
  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(getProductsCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ref for managing focus for accessibility
  const resultsHeadingRef = useRef(null);

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
    
    // Accessibility: Move focus to heading when filter changes
    setTimeout(() => resultsHeadingRef.current?.focus(), 100);

    if (window.innerWidth < 992) {
      setShowBrandDropdown(false);
    }
  };

  const handleSortByChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
    let filteredProductsList;

    if (newSortBy === "All") {
        filteredProductsList = products;
    } else {
        filteredProductsList = products;
      if (selectedBrands.length > 0) {
        filteredProductsList = filteredProductsList.filter((product) =>
          selectedBrands.includes(product.productTag)
        );
      }

      if (newSortBy === "New Arrivals") {
        filteredProductsList = filteredProductsList.filter(
          (product) => product.category === "newarrivals"
        );
      } else if (newSortBy === "Offers") {
        filteredProductsList = filteredProductsList.filter(
          (product) => product.category === "offers"
        );
      }
    }
    setFilteredProducts(filteredProductsList);
    
    // Accessibility: Move focus to heading when sort changes
    setTimeout(() => resultsHeadingRef.current?.focus(), 100);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  // Accessibility: Allow closing dropdown with Escape key
  const handleKeyDown = (e, setDropdownState) => {
    if (e.key === "Escape") {
      setDropdownState(false);
    }
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
    // Accessibility: Focus management
    setTimeout(() => resultsHeadingRef.current?.focus(), 500);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: "#EBEBEB" }}
      >
        <nav
          aria-label="Breadcrumb"
          className="px-12 lg:py-2 xl:py-3 lg:flex gap-3 hidden mb-5"
        >
          <Link
            to="/"
            className="text-customLightGray font-semibold text-base font-family-2 no-underline  hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <span
            className="font-semibold text-customLightGray font-family-1 text-base"
            aria-hidden="true"
          >
            /
          </span>
          <span
            className="font-semibold font-family-2 text-base text-black"
            aria-current="page"
          >
            Shop Now
          </span>
        </nav>

        <nav
          aria-label="Breadcrumb"
          className="px-3 py-2 flex gap-2 lg:hidden mb-3"
        >
          <Link
            to="/"
            className="text-customLightGray font-semibold text-xs font-family-2 no-underline  hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <span
            className="font-semibold text-customLightGray font-family-1 text-xs"
            aria-hidden="true"
          >
            /
          </span>
          <span
            className="font-semibold font-family-2 text-xs text-black"
            aria-current="page"
          >
            Shop Now
          </span>
        </nav>
      </motion.div>

      {/* Desktop/Tablet Layout */}
      <div className="lg:px-12 md:px-4">
        <div className="h-100 hidden md:flex gap-6">
          <aside
            className="border-2 py-12 px-3 rounded-3 h-100 md:w-1/4 lg:w-1/5"
            aria-label="Product filters"
          >
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
              aria-pressed={selectedBrands.length === 0}
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
              aria-pressed={selectedBrands.includes("ADIDAS")}
            />
            {/* ... Other Brand Buttons ... */}
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
              aria-pressed={selectedBrands.includes("BALENCIAGA")}
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
              aria-pressed={selectedBrands.includes("Christian Louboutin")}
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
              aria-pressed={selectedBrands.includes("LOUIS VUITTON")}
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
              aria-pressed={selectedBrands.includes("Skechers")}
            />
          </aside>

          <div className="h-100 md:w-3/4 lg:w-4/5">
            <div className="font-family-2 mb-2 d-flex align-items-center justify-content-between">
              {/* Accessibility: Headings focusable for navigation */}
              <h1 
                className="text-xl xl:text-2xl font-bold outline-none" 
                ref={resultsHeadingRef}
                tabIndex="-1"
              >
                {displayedBrand === "All"
                  ? "All"
                  : displayedBrand.charAt(0).toUpperCase() +
                    displayedBrand.slice(1).toLowerCase()}
              </h1>

              <div className="font-family-2 flex gap-2 items-center">
                <span>
                  {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0} -{" "}
                  {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                  {filteredProducts.length} Products
                </span>
                
                <div className="relative inline-block text-left">
                  <button
                    onClick={handleDropdownClick}
                    onKeyDown={(e) => handleKeyDown(e, setShowDropdown)}
                    aria-haspopup="true"
                    aria-expanded={showDropdown}
                    className="font-family-2 font-bold flex items-center bg-transparent border-0 p-0 text-black hover:text-gray-700"
                    type="button"
                  >
                    Sort by: <span className="mx-1">{sortBy}</span>
                    <RiArrowDropDownLine size={20} />
                  </button>
                  
                  {showDropdown && (
                    <ul
                      className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10 py-1"
                      role="menu"
                    >
                      {["All", "New Arrivals", "Offers"].map((option) => (
                        <li key={option} role="none">
                          <button
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-family-2"
                            role="menuitem"
                            onClick={() => {
                              handleSortByChange(option);
                              handleDropdownClick();
                            }}
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {error && <p className="text-danger" role="alert">{error}</p>}

            <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-3 lg:gap-4">
              {loading ? (
                 // SKELETON LOADER IMPLEMENTATION (Desktop)
                 // This now uses the correctly initialized productsPerPage
                 Array(productsPerPage)
                  .fill(0)
                  .map((_, index) => <ShopCardSkeletonMedium key={index} />)
              ) : currentProducts.length === 0 ? (
                <p className="col-span-full text-center py-5">No products found for the selected brand.</p>
              ) : (
                currentProducts.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="flex-shrink-0 border-0 transition-all hover:brightness-110 flex flex-col h-full"
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
                        loading="lazy" 
                      />
                    </div>
                    <div className="px-3 pb-3 flex flex-col flex-grow">
                      <p
                        className="font-bold text-base mb-2"
                        style={{ height: "0.5rem" }}
                      >
                        {item.title.length > 10
                          ? `${item.title.substring(0, 10)}...`
                          : item.title}
                      </p>
                      <p
                        className="font-medium text-sm mb-2 text-gray-600"
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
                      <hr className="border-t-2 my-2 mt-auto" />
                      <div className="flex justify-between items-center mb-0">
                        <p className="font-bold text-xs mb-0">
                          {formatCurrency(item.price)}
                        </p>
                        <button
                          className="rounded py-2 px-2 xl:text-sm md:text-xs transition-all border border-transparent"
                          style={{
                            backgroundColor: "#01497C",
                            color: "white",
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = "white";
                            e.target.style.color = "black";
                            e.target.style.borderColor = "black";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#01497C";
                            e.target.style.color = "white";
                            e.target.style.borderColor = "transparent";
                          }}
                          onClick={() => handleClick(item._id || item.id)}
                          aria-label={`Buy ${item.title} for ${formatCurrency(item.price)}`}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Desktop */}
            {!loading && (
              <div className="pagination d-flex justify-content-center align-items-center gap-4 mt-3" role="navigation" aria-label="Pagination">
                {currentPage > 1 && (
                  <button
                    className="pagination-button font-family-2 font-bold text-sm bg-transparent border-0"
                    onClick={() => paginate(currentPage - 1)}
                    aria-label="Go to previous page"
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
                    const maxPages = Math.ceil(filteredProducts.length / productsPerPage);
                    if (pageNumber > maxPages) return null;

                    return (
                      <button
                        key={pageNumber}
                        className={`pagination-button font-family-2 text-base border-0 ${
                          currentPage === pageNumber
                            ? "active bg-[#01497C] text-white px-3 py-2 rounded-5 text-sm font-semibold"
                            : "bg-transparent text-black"
                        }`}
                        onClick={() => paginate(pageNumber)}
                        aria-label={`Go to page ${pageNumber}`}
                        aria-current={currentPage === pageNumber ? "page" : undefined}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                {currentPage <
                  Math.ceil(filteredProducts.length / productsPerPage) && (
                  <button
                    className="pagination-button font-family-2 font-bold text-sm bg-transparent border-0"
                    onClick={() => paginate(currentPage + 1)}
                    aria-label="Go to next page"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex justify-between items-center px-3 md:hidden mb-4">
        <div style={{ position: "relative" }}>
          <button
            className="font-family-2 text-base font-bold flex items-center bg-transparent border-0 p-0"
            onClick={handleBrandDropdownClick}
            aria-haspopup="true"
            aria-expanded={showBrandDropdown}
          >
            {displayedBrand === "All"
              ? "All"
              : displayedBrand.charAt(0).toUpperCase() +
                displayedBrand.slice(1).toLowerCase()}
            <RiArrowDropDownLine
              style={{ marginLeft: 1 }}
              size="25px"
            />
          </button>
          
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
                zIndex: 10,
                listStyle: "none"
              }}
              role="menu"
            >
               <li role="none" className="mb-2">
                 <button 
                   onClick={() => handleBrandClick("All")}
                   className="w-full text-left font-family-2 text-sm bg-transparent border-0"
                   style={{ fontWeight: selectedBrands.length === 0 ? "bold" : "normal" }}
                   role="menuitem"
                  >All</button>
               </li>
               <hr className="my-1" />
               <li role="none" className="mb-2">
                 <button 
                   onClick={() => handleBrandClick("ADIDAS")}
                   className="w-full text-left font-family-2 text-sm bg-transparent border-0"
                   style={{ fontWeight: selectedBrands.includes("ADIDAS") ? "bold" : "normal" }}
                   role="menuitem"
                  >ADIDAS</button>
               </li>
               <hr className="my-1" />
               <li role="none" className="mb-2">
                 <button 
                   onClick={() => handleBrandClick("BALENCIAGA")}
                   className="w-full text-left font-family-2 text-sm bg-transparent border-0"
                   style={{ fontWeight: selectedBrands.includes("BALENCIAGA") ? "bold" : "normal" }}
                   role="menuitem"
                  >BALENCIAGA</button>
               </li>
            </ul>
          )}
        </div>

        <div className="relative">
          <button
            onClick={handleDropdownClick}
            className="font-family-2 text-sm flex items-center bg-transparent border-0 text-gray-600 p-0"
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            Sort by:{" "}
            <span className="font-family-2 text-black ml-1 font-bold">
              {sortBy}
            </span>
            <RiArrowDropDownLine
              style={{ marginLeft: 1, color: "black" }}
              size="25px"
            />
          </button>
          
          {showDropdown && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                width: "150px",
                right: 0,
                backgroundColor: "white",
                border: "1px solid #ddd",
                padding: 10,
                zIndex: 10,
                listStyle: "none"
              }}
              role="menu"
            >
                {["All", "New Arrivals", "Offers"].map((option) => (
                    <li key={option} className="mb-2" role="none">
                        <button 
                            className="w-full text-left bg-transparent border-0 font-family-2 text-sm"
                            onClick={() => {
                                handleSortByChange(option);
                                handleDropdownClick();
                            }}
                            role="menuitem"
                        >
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      <div className="md:hidden block">
        {error && <p className="text-danger px-3">{error}</p>}
        
        <div className="px-3 grid grid-cols-2 gap-2">
          {loading ? (
             // SKELETON LOADER IMPLEMENTATION (Mobile)
             // This also uses the corrected productsPerPage
             Array(productsPerPage)
              .fill(0)
              .map((_, index) => <ShopCardSkeletonMobile key={index} />)
          ) : currentProducts.length === 0 ? (
            <p className="col-span-2 text-center">No products found for the selected brand.</p>
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
                    alt={item.title}
                  />
                </div>
                <Card.Body className="p-2 flex flex-col">
                  <Card.Text
                    className="font-family-2 fw-bold text-xs"
                    style={{ height: "auto", minHeight: "2.5em" }}
                  >
                    {item.title.length > 10
                      ? `${item.title.substring(0, 10)}...`
                      : item.title}
                  </Card.Text>
                  <Card.Text
                    className="font-family-2 fw-medium text-xs text-gray-600"
                    style={{ height: "auto", minHeight: "1.5em" }}
                  >
                    {item.productTag.length > 7
                      ? `${item.productTag.substring(0, 7)}...`
                      : item.productTag}{" "}
                    |
                    {item.color.length > 4
                      ? `${item.color.substring(0, 4)}...`
                      : item.color}
                  </Card.Text>
                  <hr className="border-2 mt-auto mb-2" />
                  <div className="flex justify-between items-center">
                    <Card.Text className="font-family-2 fw-bold text-xs mb-0">
                      {formatCurrency(item.price)}
                    </Card.Text>
                    <button
                      className="font-family-2 rounded-1 py-1 px-1 text-xs border border-transparent"
                      style={{
                        backgroundColor: "#01497C",
                        color: "white",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.color = "black";
                        e.target.style.borderColor = "black";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#01497C";
                        e.target.style.color = "white";
                        e.target.style.borderColor = "transparent";
                      }}
                      onClick={() => handleClick(item._id || item.id)}
                      aria-label={`Buy ${item.title}`}
                    >
                      Buy Now
                    </button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>

        {/* Pagination Mobile */}
        {!loading && (
          <div className="pagination flex justify-center items-center gap-3 mt-3 mb-5" role="navigation" aria-label="Mobile Pagination">
            {currentPage > 1 && (
              <button
                className="pagination-button font-family-2 text-sm font-bold bg-transparent border-0"
                onClick={() => paginate(currentPage - 1)}
                aria-label="Previous Page"
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
                const maxPages = Math.ceil(filteredProducts.length / productsPerPage);
                if (pageNumber > maxPages) return null;

                return (
                  <button
                    key={pageNumber}
                    className={`pagination-button font-family-2 text-sm border-0 ${
                      currentPage === pageNumber
                        ? "active bg-[#01497C] text-white px-2 py-1 rounded-5 text-xs font-semibold"
                        : "bg-transparent text-black"
                    }`}
                    onClick={() => paginate(pageNumber)}
                    aria-label={`Page ${pageNumber}`}
                    aria-current={currentPage === pageNumber ? "page" : undefined}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            {currentPage <
              Math.ceil(filteredProducts.length / productsPerPage) && (
              <button
                className="pagination-button font-family-2 text-sm font-bold bg-transparent border-0"
                onClick={() => paginate(currentPage + 1)}
                aria-label="Next Page"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
      <Discount />
      <div className="mx-auto lg:w-11/12">
        <Subscribe />
      </div>
    </div>
  );
};
export default Shop;