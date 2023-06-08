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
import React, { useState, useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";

import "views/HomePage.css"; 

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const [lightMode, setLightMode] = useState(false);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);

  useEffect(() => {
    const wrapper = document.querySelector(".wrapper");
    if (lightMode) {
      wrapper.classList.remove("dark-mode");
    } else {
      wrapper.classList.add("dark-mode");
    }
  }, [lightMode]);

  return (
    <>
      
      <div className={`wrapper ${lightMode ? 'light-mode' : 'dark-mode'}`}>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`} data-image={image} data-color={color}>
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
      </div>
        <div className={`main-panel ${lightMode ? 'light-mode' : 'dark-mode'}`} ref={mainPanel}> 
          <AdminNavbar lightMode={lightMode}/>
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
            <Footer lightMode={lightMode}/>
          </div>
        </div>
         {/* <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      /> */}
      <div className="dark-mode-toggle">
        <label htmlFor="darkModeToggle">Light Mode </label>
        <input
          id="darkModeToggle"
          type="checkbox"
          checked={lightMode}
          onChange={() => setLightMode(!lightMode)}
        />
      </div>
      <button className="sidebar-toggle" onClick={toggleCollapse}>
        <i className={`fas ${collapsed ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
      </button>

      
    </>
  );
}

export default Admin;
