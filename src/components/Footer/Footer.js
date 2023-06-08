/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

import routes from "routes.js";
import "views/HomePage.css"

function Footer() {
  const [lightMode, setLightMode] = useState(false);
  const handleLightModeToggle = () => {
    setLightMode(!lightMode); // Step 3
  };
    return (
      <footer className="footer px-0 px-lg-3" 
       bg={lightMode ? "light" : "dark"}
      >
        <Container fluid>
          <nav bg={lightMode ? "light" : "dark"}>
            <ul className="footer-menu">
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Home
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Company
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Blog
                </a>
              </li>
            </ul>
            {/* <p className="copyright text-center">
              <a>Abizer</a>
            </p> */}
          </nav>
          <div className="dark-mode-toggle">
            <label htmlFor="darkModeToggle">Light Mode</label>
              <input
                id="darkModeToggle"
                type="checkbox"
                checked={lightMode}
                onChange={() => setLightMode(!lightMode)}
              />
          </div>
        </Container>
      </footer>
    );
  }

export default Footer;
