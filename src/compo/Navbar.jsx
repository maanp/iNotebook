import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import contextValue from '../context/notes/noteContext'
import { useHistory, useLocation } from 'react-router';

const Navbar = () => {
    const context = useContext(contextValue);
    let { getdetails, getdetail } = context;
    let history = useHistory();
    let s = useLocation();
    useEffect(() => {
        if(localStorage.getItem('login-token')){
            getdetails();
        }
        // eslint-disable-next-line
    }, [])
    let handleLogout = () => {
        localStorage.removeItem('login-token');
        history.push("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${s.pathname === '/' ? 'active' : ""} `} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${s.pathname === '/about' ? 'active' : ""} `} to="/about">All Notes</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem('login-token') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" type="submit" to="/login">Login</Link>
                        <Link className="btn btn-outline-primary mx-1" type="submit" to="/signup">Sign Up</Link>
                    </form> :

                        <div className="dropdown me-2">
                            <button className="btn btn-outline-primary dropdown-toggle px-4" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {getdetail.name}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" aria-labelledby="dropdownMenuButton1">
                                <li><Link type="submit" to="/user" className="btn my-1  btn-outline-success mx-2" >Your account</Link></li>
                                <li><button type="submit" className="btn  my-1 btn-outline-success mx-2" onClick={handleLogout}>Log Out</button></li>
                            </ul>
                        </div>
                        // <span>
                        //     <span className="text-light ">{getdetail.name}</span>
                        //     <button type="submit" className="btn btn-outline-success mx-2" onClick={handleLogout}>Log Out</button>
                        // </span>
                    }
                </div>
            </div>
        </nav>
    )
}


export default Navbar
