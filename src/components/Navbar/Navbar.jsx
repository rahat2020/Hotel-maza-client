import React from 'react';
import { Link } from 'react-router-dom';
import './Navabr.css';

const Navbar = () => {
  return (
    <div className="container navcolor">
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <div className="container-fluid bg-none">
          <Link to="/" className="navbar-brand">Hotel Mazan</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span>
              <i className="fa-solid fa-bars-staggered bars"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                </li>
              </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar