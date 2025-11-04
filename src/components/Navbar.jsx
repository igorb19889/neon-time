
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";


export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/acasa",    label: "Acasă"    },
    { to: "/despre",   label: "Despre"   },
    { to: "/servicii", label: "Servicii" },
    { to: "/galerie",  label: "Galerie"  },
    { to: "/contact",  label: "Contact"  },
    { to: "/rezervare",label: "Rezervare" },
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/acasa">
          {/* <span className="logo-nt">NT</span> Neon Time */}
        <img className="neon-time-logo" src="./images/neon-time.jpg" alt="Neon-Time" />
        
        </Link>
        
      </div>

      {/* Buton Burger */}
      <div className="burger" onClick={() => setIsOpen(!isOpen)}>
        <div className={isOpen ? "line open" : "line"}></div>
        <div className={isOpen ? "line open" : "line"}></div>
        <div className={isOpen ? "line open" : "line"}></div>
      </div>

      {/* Linkuri */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={location.pathname === to ? "nav-link active" : "nav-link"}
              onClick={() => setIsOpen(false)} // închide meniul după click
            >
              {label}
              
            </Link>
            
          </li>
        ))}
      </ul>
    </nav>
  );
}

