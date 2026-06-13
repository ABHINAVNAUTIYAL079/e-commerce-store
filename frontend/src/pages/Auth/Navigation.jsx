import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";



const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const disPatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      disPatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [showsideBar, setshowsideBar] = useState(false);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const toggleSideBar = () => {
    setshowsideBar(!showsideBar);
  };

  const closeSideBar = () => {
    setshowsideBar(false);
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${showsideBar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000000] w-[4%] hover:w-[15%] h-[100vh]  fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-12" size={26} />
          <span className="hidden nav-item-name mt-12">HOME</span>{" "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-12" size={26} />
          <span className="hidden nav-item-name mt-12">SHOP</span>{" "}
        </Link>

        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-12" size={26} />
          <span className="hidden nav-item-name mt-12">CART</span>{" "}
        </Link>

        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-12" size={26} />
          <span className="hidden nav-item-name mt-12">FAVORITES</span>{" "}
        </Link>
      </div>
      <div className="relative">
        <button onClick={toggleDropDown} className="flex items-center text-gray-8000 focus:outline-none">
          {userInfo ? (
            <span className="text-white">{userInfo.name}</span>
          ) : (
            <></>
          )}
        </button>
      </div>
      <ul>
        <li>
          <Link
            to="/login"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineLogin className="mr-2 mt-12" size={26} />
            <span className="hidden nav-item-name mt-12">Login</span>{" "}
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineUserAdd className="mr-2 mt-12" size={26} />
            <span className="hidden nav-item-name mt-12">Sign Up</span>{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
