import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "./localStorage";
import { handleAuth } from "./authSlice";
import { setUserData } from "../../pages/login/feature/LoginSlice";

const PrivateRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = async () => {
    const userToken = await getLocalStorage("user");
    if (!userToken || userToken === "undefined") {
      dispatch(handleAuth(false));
      setIsLoggedIn(false);
      return navigate("/login");
    } else {
      dispatch(handleAuth(true));
      dispatch(setUserData(JSON.parse(localStorage.getItem("user"))));
      setIsLoggedIn(true);
      return navigate("/appointment");
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return children;
};

export default PrivateRoutes;
