import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineUserAdd, AiOutlineShopping, AiOutlineLogin, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/UsersApiSlice';
import { logout } from '../../redux/features/auth/AuthSlice';

const Navigation = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };
};


    return (
        <>
        <div 
            className={`${
                showSidebar ? 'hidden' : 'flex'
            } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed z-index-999`}
            id="navigation-container"
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link
                    to="/"
                    className="flex items-center transition-transform transform hover:translate-x-2 mt-12"
                >
                    <AiOutlineHome className="mr-2" size={26} />
                    <span className="hidden nav-item-name">HOME</span>
                </Link>

                <Link
                    to="/shop"
                    className="flex items-center transition-transform transform hover:translate-x-2 mt-12"
                >
                    <AiOutlineShopping className="mr-2" size={26} />
                    <span className="hidden nav-item-name">SHOP</span>
                </Link>

                <Link
                    to="/cart"
                    className="flex items-center transition-transform transform hover:translate-x-2 mt-12"
                >
                    <AiOutlineShoppingCart className="mr-2" size={26} />
                    <span className="hidden nav-item-name">CART</span>
                </Link>

                <Link
                    to="/favorite"
                    className="flex items-center transition-transform transform hover:translate-x-2 mt-12"
                >
                    <FaHeart className="mr-2" size={26} />
                    <span className="hidden nav-item-name">FAVORITE</span>
                </Link>
            </div>
        </div>
        
        
        <div div className="relative" >
                <button
                    onClick={toggleDropdown}
                    className="flex items-center text-white focus:outline-none"
                >
                    {userInfo ? (
                        <span>{userInfo.username}</span>
                    ) : null}
                    {userInfo && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 ${
                                dropdownOpen ? 'transform rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={dropdownOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                            />
                        </svg>
                    )}
                </button>

            {dropdownOpen && userInfo && (
                <ul className="absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600">
                    {userInfo.isAdmin && (
                        <>
                            <li>
                                <Link to ="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100">
                                    Products
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-gray-100">
                                    Category
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100">
                                    Orders
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100">
                                    Users
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/profile" className="block px-4 py-2 hover:bg-gray-100">
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/logout" 
                                onClick={logoutHundler} 
                                className="block px-4 py-2 hover:bg-gray-100">
                                    Logout
                                </Link>
                            </li>

                        </>
                    )}; 
                </ul>
            )}
        </div>
            
                    
        
        

            {!userInfo && (
                <ul>
                    <li>
                        <Link to="/login" className="flex items-center transition-transform transform hover:translate-x-2 mt-12">
                            <AiOutlineLogin className="mr-2" size={26} />
                            <span className="hidden nav-item-name">Login</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/register" className="flex items-center transition-transform transform hover:translate-x-2 mt-12">
                            <AiOutlineUserAdd className="mr-2" size={26} />
                            <span className="hidden nav-item-name">Register</span>
                        </Link>
                    </li>
                </ul>
            )}
         
        </>
    );
};



export default Navigation;
