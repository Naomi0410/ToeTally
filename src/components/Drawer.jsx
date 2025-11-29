import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { IoIosMenu } from "react-icons/io";
import { navItems } from "../utils";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const Drawer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("userId");
        console.log("Token:", token);
        console.log("ID:", id);

        if (!token || !id) {
          setUser(null);
          return;
        }
        const response = await axios.get(
          `https://backend-toetally-1.onrender.com/api/auth/getUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response:", response);
        console.log("User:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
        console.log("Component finished rendering");
      }
    };
    fetchUser();
  }, []);

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

  if (loading) {
    return null;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="bg-transparent border-0 p-0 cursor-pointer"
        aria-label="Open navigation menu"
        aria-expanded={show}
        aria-controls="mobile-navigation-drawer"
      >
        <IoIosMenu size="30px" aria-hidden="true" />
      </button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        className="w-75"
        id="mobile-navigation-drawer"
        aria-labelledby="mobile-navigation-title"
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <nav
            className="gap-4 flex-column d-flex text-base font-family-2"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-customDarkBlue fw-bold no-underline"
                    : "text-customVeryDarkBlue no-underline"
                }
                onClick={handleClose}
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                {item.name}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/cart"
                className="no-underline text-black"
                onClick={handleClose}
                aria-label="Shopping cart"
              >
                <span className="font-family-2 text-base">Cart</span>
              </NavLink>
            )}
          </nav>
          <hr aria-hidden="true" />
          {user && (
            <>
              <div
                className="d-flex align-items-center gap-2 mt-2"
                role="region"
                aria-label="User profile information"
              >
                <span
                  className="text-navIcon font-family-2 text-base bg-[#E3F5F6] rounded-5 p-3"
                  style={{ color: "#147C84" }}
                  aria-hidden="true"
                >
                  {user.user.firstName.charAt(0).toUpperCase()}
                  {user.user.lastName.charAt(0).toUpperCase()}
                </span>
                <div className="d-flex flex-column">
                  <span className="font-family-2 text-sm">
                    {user.user.firstName.charAt(0).toUpperCase() +
                      user.user.firstName.slice(1).toLowerCase()}{" "}
                    {user.user.lastName.charAt(0).toUpperCase() +
                      user.user.lastName.slice(1).toLowerCase()}
                  </span>
                  <span className="font-family-2 text-sm">
                    {user.user.email}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
                className="d-flex align-items-center gap-2 mt-2 logout-button"
                aria-label="Logout from account"
              >
                <MdLogout
                  color="red"
                  size="60px"
                  style={{ backgroundColor: "#FCF0EF" }}
                  className="rounded-5 p-3"
                  aria-hidden="true"
                />
                <span className="font-family-2 text-sm text-[red]">Logout</span>
              </button>
            </>
          )}
          {!user && (
            <div
              className="d-flex flex-column gap-2"
              role="navigation"
              aria-label="Authentication links"
            >
              <Link
                to="/login"
                className="no-underline text-black font-family-2 text-lg"
                aria-label="Login to your account"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="no-underline text-black font-family-2 text-lg"
                aria-label="Create a new account"
              >
                Sign up
              </Link>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      {showLogoutModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-logout-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLogoutModal(false);
          }}
        >
          <div className="relative flex flex-col gap-4 py-12 w-4/5 mx-auto bg-white rounded-4 shadow-lg p-6 text-center">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              aria-label="Close logout modal"
            >
              <FaTimes size={20} />
            </button>
            <h1
              id="drawer-logout-modal-title"
              className="text-xl font-bold font-family-2"
            >
              Confirm Logout
            </h1>
            <p className="-mt-4 text-base font-family-2">
              Are you sure to logout of this account ?
            </p>
            <div className="flex gap-4 justify-content-center">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={logoutLoading}
                className="bg-[#01497C] py-2 rounded-lg text-white w-36 font-family-2"
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
                  <span role="status" aria-live="polite">
                    <ClipLoader color="white" size="20px" />
                    <span className="visually-hidden">Logging out...</span>
                  </span>
                ) : (
                  "Proceed"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
