import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

function CustomNavbar(args) {
    // const navigate = useNavigate();
    return (
        <nav
            class="navbar navbar-expand-sm navbar-dark bg-dark px-4 sticky-top"
        >
            <Link class="navbar-brand" to="/">Express Pay</Link>
            <button
                class="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            ></button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <Link class="nav-link text-white" to="/" aria-current="page">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link text-white" to="/payment" aria-current="page">Payment</Link>
                    </li>
                </ul>
                <div className="ms-auto">
                    {
                        Cookies.get("token") ? null : (
                            <>
                                <Link to="/login" className='btn btn-primary shadow-none'>Login</Link>
                                <Link to="/register" className='btn btn-success shadow-none ms-0 ms-lg-2'>Register</Link>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>

    );
}

export default CustomNavbar;