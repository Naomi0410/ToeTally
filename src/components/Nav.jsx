import { Dropdown, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import { navItems } from "../utils";
import { CgProfile } from "react-icons/cg";
import { TbShoppingBag } from "react-icons/tb";
import Drawer from "./Drawer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import ActionButton from "./ActionButton";
import { FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";


const Nav = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  return (
    <>
      <header className="border-b-2 d-none d-md-block">
        <div className="d-flex justify-content-between align-items-center md:px-3 lg:px-16 py-4 ">
          <NavLink to="/" className="no-underline">
            <div className="d-flex align-items-center gap-2">
              <Image src={logo} />
              <span className="font-family-1 text-black font-bold text-xl">
                TOETALLY
              </span>
            </div>
          </NavLink>
          <div className="d-flex gap-4 align-items-center text-sm font-family-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-customDarkBlue underline"
                    : "text-customLightGray no-underline"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="d-flex gap-3 align-items-center">
            {user && (
              <NavLink to="/cart">
                <TbShoppingBag className="text-navIcon text-2xl" />
              </NavLink>
            )}
            {user && (
              <div>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="none"
                    id="dropdown-basic"
                    className="d-flex align-items-center"
                  >
                    <CgProfile className="text-navIcon text-2xl me-2" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="d-flex align-items-center gap-2"
                      style={{ pointerEvents: "none", cursor: "default" }}
                    >
                      <span
                        className="text-navIcon font-family-2 text-2xl bg-[#E3F5F6] rounded-5 p-3"
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
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/logout"
                      onClick={handleLogout}
                      className="d-flex align-items-center gap-2 logout-button"
                    >
                      <MdLogout
                        color="red"
                        size="60px"
                        style={{ backgroundColor: "#FCF0EF" }}
                        className="rounded-5 p-3"
                      />
                      <span className="font-family-2 text-xl text-[red]">
                        Logout
                      </span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            {showLogoutModal  && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/25 backdrop-blur-sm z-50">
                <div className="relative flex flex-col gap-4 py-12 w-2/5 mx-auto bg-white rounded-4 shadow-lg p-6 text-center">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                  >
                    <FaTimes size={20} />
                  </button>
                  <h1 className="text-xl font-bold font-family-2">
                    Confirm Logout
                  </h1>
                  <h1 className="-mt-4 lg:text-lg md:text-base font-family-2">
                    Are you sure to logout of this account ?
                  </h1>
                  <div className="flex gap-4 justify-content-center">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      disabled={logoutLoading}
                      className="bg-[#01497C] lg:py-3 md:py-2 rounded-lg text-white w-36 font-family-2"
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

            {!user && (
              <>
                <NavLink to="/login">
                  <ActionButton
                    variant="none"
                    size="md"
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
                  />
                </NavLink>
                <NavLink to="/signup">
                  <ActionButton
                    variant="none"
                    size="md"
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
                    className="font-family-2 rounded-3 p-2 w-32"
                  />
                </NavLink>
              </>
            )}
          </div>
        </div>
      </header>

      {/* small screen */}
      <header className="d-block d-md-none">
        <div className="d-flex justify-content-between align-items-center p-3 ">
          <NavLink to="/" className="no-underline">
            <div className="d-flex align-items-center gap-2">
              <Image src={logo} />
              <span className="font-family-1 text-black font-bold text-base">
                TOETALLY
              </span>
            </div>
          </NavLink>
          <Drawer />
        </div>
      </header>
    </>
  );
};

export default Nav;
