import { Dropdown, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import { navItems } from "../utils";
import { CgProfile } from "react-icons/cg";
import { TbShoppingBag } from "react-icons/tb";
import Drawer from "./Drawer";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import ActionButton from "./ActionButton";
import { ClipLoader } from "react-spinners";

const Nav = () => {
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("userId");

        // If no token/id, immediately set user to null and return
        if (!token || !id) {
          setUser(null);
          return;
        }

        // Fetch user with 10 second timeout
        const response = await axios.get(
          `https://backend-toetally-1.onrender.com/api/auth/getUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            timeout: 10000, // 10 second timeout
          }
        );

        console.log("User fetched successfully:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);

        // If unauthorized or token expired, clear storage
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log("Token invalid, clearing localStorage");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        }

        // If timeout error
        if (error.code === "ECONNABORTED") {
          console.log("Request timed out after 10 seconds");
        }

        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Handle scroll behavior - show nav when user stops scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // If near top, show normal nav
      if (scrollPosition <= 100) {
        setIsSticky(false);
        setIsVisible(true);
        return;
      }

      // Hide nav immediately when scrolling past 100px
      setIsVisible(false);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set new timeout to show nav when user stops scrolling
      const newTimeout = setTimeout(() => {
        if (window.scrollY > 100) {
          setIsSticky(true);
          setIsVisible(true);
        }
      }, 1000);

      setScrollTimeout(newTimeout);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setUser(null);
      setLogoutLoading(false);
      setTimeout(() => {
        setShowLogoutModal(false);
      }, 100);
    }, 2000);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showLogoutModal) {
        setShowLogoutModal(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showLogoutModal]);

  return (
    <>
      <header
        className={`border-b-2 d-none d-md-block ${
          isSticky ? "fixed top-0 left-0 right-0 bg-white shadow-md z-40" : ""
        }`}
        style={{
          transition:
            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
          transform:
            isSticky && isVisible
              ? "translateY(0)"
              : isSticky
              ? "translateY(-100%)"
              : "none",
          opacity: isSticky && isVisible ? "1" : isSticky ? "0" : "1",
        }}
        role="banner"
      >
        <nav
          className="flex justify-between items-center md:px-3 lg:px-12 py-4"
          role="navigation"
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            className="no-underline"
            aria-label="TOETALLY home page"
          >
            <div className="d-flex align-items-center gap-2">
              <Image src={logo} alt="TOETALLY logo" />
              <span className="font-family-1 text-black font-bold text-base">
                TOETALLY
              </span>
            </div>
          </NavLink>
          <div
            className="flex md:gap-3 lg:gap-6 items-center md:text-xs lg:text-sm font-family-2"
            role="menubar"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                role="menuitem"
                className={({ isActive }) =>
                  isActive
                    ? "text-customDarkBlue underline"
                    : "text-customLightGray no-underline"
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="d-flex gap-3 align-items-center">
            {user && (
              <NavLink to="/cart" aria-label="Shopping cart">
                <TbShoppingBag
                  className="text-navIcon text-2xl"
                  aria-hidden="true"
                />
              </NavLink>
            )}
            {user && (
              <div>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="none"
                    id="dropdown-basic"
                    className="d-flex align-items-center"
                    aria-label="User profile menu"
                    aria-haspopup="true"
                  >
                    <CgProfile
                      className="text-navIcon text-2xl me-2"
                      aria-hidden="true"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu role="menu">
                    <Dropdown.Item
                      className="d-flex align-items-center gap-2"
                      style={{ pointerEvents: "none", cursor: "default" }}
                      role="menuitem"
                      aria-label={`User profile: ${user.user.firstName} ${user.user.lastName}`}
                    >
                      <span
                        className="text-navIcon font-family-2 text-lg bg-[#E3F5F6] rounded-5 p-3"
                        style={{ color: "#147C84" }}
                        aria-hidden="true"
                      >
                        {user.user.firstName.charAt(0).toUpperCase()}
                        {user.user.lastName.charAt(0).toUpperCase()}
                      </span>
                      <div className="d-flex flex-column">
                        <span className="font-family-2 text-lg">
                          {user.user.firstName.charAt(0).toUpperCase() +
                            user.user.firstName.slice(1).toLowerCase()}{" "}
                          {user.user.lastName.charAt(0).toUpperCase() +
                            user.user.lastName.slice(1).toLowerCase()}
                        </span>
                        <span className="font-family-2 text-sm">
                          {user.user.email}
                        </span>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/logout"
                      onClick={handleLogout}
                      className="d-flex align-items-center gap-2 logout-button"
                      role="menuitem"
                    >
                      <MdLogout
                        color="red"
                        size="60px"
                        style={{ backgroundColor: "#FCF0EF" }}
                        className="rounded-5 p-3"
                        aria-hidden="true"
                      />
                      <span className="font-family-2 text-lg text-[red]">
                        Logout
                      </span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            {showLogoutModal && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm z-50"
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-modal-title"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setShowLogoutModal(false);
                }}
              >
                <div className="relative flex flex-col gap-4 py-12 w-2/5 mx-auto bg-white rounded-4 shadow-lg p-6 text-center">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    aria-label="Close logout modal"
                  >
                    <FaTimes size={20} />
                  </button>
                  <h1
                    id="logout-modal-title"
                    className="text-xl font-bold font-family-2"
                  >
                    Confirm Logout
                  </h1>
                  <p className="-mt-4 lg:text-lg md:text-base font-family-2">
                    Are you sure you want to logout of this account?
                  </p>
                  <div className="flex gap-4 justify-content-center">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      disabled={logoutLoading}
                      className="bg-[#01497C] lg:py-3 md:py-2 rounded-lg text-white w-36 font-family-2"
                      aria-label="Cancel logout"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmLogout}
                      disabled={logoutLoading}
                      type="button"
                      className="bg-[#DC3545] lg:py-3 md:py-2 rounded-lg text-white w-36 font-family-2"
                      aria-label="Confirm logout"
                    >
                      {logoutLoading ? (
                        <ClipLoader color="white" size="20px" />
                      ) : (
                        "Proceed"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!user && (
              <>
                <NavLink to="/login">
                  <ActionButton
                    variant="none"
                    size="sm"
                    text="Login"
                    style={{
                      backgroundColor: "white",
                      fontFamily: "Alexandria variable",
                      color: "black",
                    }}
                    hoverStyle={{
                      backgroundColor: "white",
                      fontFamily: "Alexandria variable",
                      color: "#01497C",
                    }}
                    className="font-family-2 rounded-3 p-2"
                    aria-label="Login to your account"
                  />
                </NavLink>
                <NavLink to="/signup">
                  <ActionButton
                    variant="none"
                    size="sm"
                    text="Sign Up"
                    style={{
                      backgroundColor: "#01497C",
                      fontFamily: "Alexandria variable",
                      color: "white",
                    }}
                    hoverStyle={{
                      backgroundColor: "white",
                      fontFamily: "Alexandria variable",
                      color: "#01497C",
                      border: "1px solid #01497C",
                    }}
                    className="font-family-2 rounded-3 p-2 w-20"
                    aria-label="Create a new account"
                  />
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content jump when nav becomes fixed */}
      {isSticky && (
        <div className="d-none d-md-block" style={{ height: "73px" }} />
      )}

      {/* small screen */}
      <header
        className={`d-block d-md-none ${
          isSticky ? "fixed top-0 left-0 right-0 bg-white shadow-md z-40" : ""
        }`}
        style={{
          transition:
            "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
          transform:
            isSticky && isVisible
              ? "translateY(0)"
              : isSticky
              ? "translateY(-100%)"
              : "none",
          opacity: isSticky && isVisible ? "1" : isSticky ? "0" : "1",
        }}
        role="banner"
      >
        <nav
          className="d-flex justify-content-between align-items-center p-3"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <NavLink
            to="/"
            className="no-underline"
            aria-label="TOETALLY home page"
          >
            <div className="d-flex align-items-center gap-2">
              <Image src={logo} alt="TOETALLY logo" />
              <span className="font-family-1 text-black font-bold text-sm">
                TOETALLY
              </span>
            </div>
          </NavLink>
          <Drawer />
        </nav>
      </header>

      {/* Spacer for mobile sticky nav */}
      {isSticky && (
        <div className="d-block d-md-none" style={{ height: "60px" }} />
      )}
    </>
  );
};

export default Nav;
