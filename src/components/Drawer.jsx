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
          `https://backend-toetally.onrender.com/api/auth/getUser/${id}`,
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

  if (loading) {
    return null;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <IoIosMenu onClick={handleShow} size="30px" className="cursor-pointer" />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="gap-4 flex-column d-flex text-lg font-family-2">
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
              >
                {item.name}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/cart"
                className="no-underline text-black"
                onClick={handleClose}
              >
                <span className="font-family-2 text-xl">Cart</span>
              </NavLink>
            )}
          </div>
          <hr />
          {user && (
            <>
              <div className="d-flex align-items-center gap-2 mt-2">
                <span
                  className="text-navIcon font-family-2 text-lg bg-[#E3F5F6] rounded-5 p-3"
                  style={{ color: "#147C84" }}
                >
                  {user.user.firstName.charAt(0).toUpperCase()}
                  {user.user.lastName.charAt(0).toUpperCase()}
                </span>
                <div className="d-flex flex-column">
                  <span className="font-family-2 text-xl">
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
              <div
                href="#/action-2"
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
                className="d-flex align-items-center gap-2 mt-2 logout-button"
              >
                <MdLogout
                  color="red"
                  size="60px"
                  style={{ backgroundColor: "#FCF0EF" }}
                  className="rounded-5 p-3"
                />
                <span className="font-family-2 text-lg text-[red]">Logout</span>
              </div>
            </>
          )}
          {!user && (
            <div className="d-flex flex-column gap-2">
              <Link
                to="/login"
                className="no-underline text-black font-family-2 text-xl"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="no-underline text-black font-family-2 text-xl"
              >
                Sign up
              </Link>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm z-50">
          <div className="relative flex flex-col gap-4 py-12 w-4/5 mx-auto bg-white rounded-4 shadow-lg p-6 text-center">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
            <h1 className="text-xl font-bold font-family-2">Confirm Logout</h1>
            <h1 className="-mt-4 text-base font-family-2">
              Are you sure to logout of this account ?
            </h1>
            <div className="flex gap-4 justify-content-center">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={logoutLoading}
                className="bg-[#01497C] py-2 rounded-lg text-white w-36 font-family-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                disabled={logoutLoading}
                type="button"
                className="bg-[#DC3545] lg:py-3 md:py-2 rounded-lg text-white w-36 font-family-2"
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
    </>
  );
};

export default Drawer;
