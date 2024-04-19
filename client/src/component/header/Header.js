import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from './Search'
const Header = () => {
  

  return (
  <div className="header bg-light">
  <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
    <Link to="/" className="text-decoration-none">
  <h1 className="navbar-brand uppercase p-0 m-0" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }} onClick={()=> window.scrollTo({top:0})}>
  World-Network
  </h1>
</Link>

     <Search />
      <Menu/>
    </nav>
  </div>

  
  );
};

export default Header;
