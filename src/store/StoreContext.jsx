import { createContext, useEffect, useCallback, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import usePersist from "../hooks/usePersist";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "https://backend-toetally.onrender.com/api";


export const ContextStore = createContext({
  cartItems: [],
  loggedInUser: null,
  token: null,
  increaseCartQuantity: () => {},
  setCartItems: () => {},
  cartQuantity: 0,
  priceTotal: 0,
  removeFromCart: () => {},
  decreaseCartQuantity: () => {},
  setToken: () => {},
  setLoggedInUser: () => {},
  login: () => {},
  logout: () => {},
  loading: false,
  error: null,
});

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = usePersist("cart", []);
  const [loggedInUser, setLoggedInUser] = usePersist("clientLoggedIn", null);
  const [token, setToken] = usePersist("clientToken", null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function isTokenValid(token) {
    if (!token) return false;
    try {
      jwtDecode(token);
      return true;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }

  const increaseCartQuantity = useCallback((id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === id._id) == null) {
        return [...currItems, { ...id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item._id === id._id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }, [setCartItems]);

  const decreaseCartQuantity = useCallback((id) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === id._id)?.quantity === 1) {
        return currItems.filter((item) => item._id !== id._id);
      } else {
        return currItems.map((item) => {
          if (item._id === id._id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }, [setCartItems]);

  const removeFromCart = useCallback((id) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id !== id);
    });
  }, [setCartItems]);

  const cartQuantity = cartItems?.reduce((quantity, item) => item.quantity + quantity, 0);
  const priceTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  const getUser = useCallback(async () => {
    if (!token || !isTokenValid(token)) {
      setLoggedInUser(null);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/getUser/:id`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoggedInUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  }, [setLoggedInUser, token]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      setToken(response.data.token);
      setLoggedInUser(response.data.user);
      getUser();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [getUser, setLoggedInUser, setToken]);

  const logout = useCallback(() => {
    try {
      if (!token) {
        return;
      } else {
        setLoggedInUser(null);
        setToken(null);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [setLoggedInUser, setToken, token]);

  useEffect(() => {
    if (loggedInUser) {
      return;
    } else {
      getUser();
    }
  }, [getUser, loggedInUser, token]);

  const contextData = {
    increaseCartQuantity,
    cartItems,
    setCartItems,
    cartQuantity,
    priceTotal,
    removeFromCart,
    decreaseCartQuantity,
    token,
    setToken,
    loggedInUser,
    setLoggedInUser,
    login,
    logout,
    loading,
    error
};

return (
  <ContextStore.Provider value={contextData}>
    {children}
  </ContextStore.Provider>
);
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreProvider;
