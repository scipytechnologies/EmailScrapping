
import { toast } from "react-toastify";
import React from 'react';
import { logout } from '../../store/loginedUser';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import './appbar.css'


function NavBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate()


    const handleLogout = async (e) => {
        e.preventDefault()
        toast.success("Logged out successfully");
        localStorage.clear()
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            <div className="appbar p-2">
                <div>Email Extraction System</div>
                <div>
                    <>
                        <NavLink to="/Scrap">Email Scrap</NavLink>
                        <NavLink to="/Multiurl">Emails Scrap</NavLink>
                        <NavLink to="/EmailValidator">Email Validation</NavLink>
                        <NavLink to="/MultiEmail">Emails Validation</NavLink>
                        <NavLink to="/Pdfscrap">PDF Scraper</NavLink>
                        <button className="btn btn-dark m-3" onClick={handleLogout}>Logout</button>
                    </>
                </div>
            </div>
        </>
    );
}

export default NavBar;