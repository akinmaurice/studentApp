import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-inverse fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand py-0">Student-App </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link__color">Go Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Header;
