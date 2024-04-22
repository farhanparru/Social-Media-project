import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from './Search'
import Logo from '../../images/logo.png'
import { useSelector } from 'react-redux'

const Header = () => {
  const { theme } = useSelector(state => state);

  return (
    <div className="header bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
        <Link to="/" className="text-decoration-none">
          <div className="d-flex align-items-center">
            <img
              src={Logo}
              alt="World-Network Logo"
              className="navbar-brand m-0"
              style={{
                maxHeight: '50px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                filter: theme ? 'invert(1)' : 'invert(0)'
              }}
              onClick={() => window.scrollTo({ top: 0 })}
            />
            <h1 className="navbar-brand uppercase p-0 m-0" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }} onClick={() => window.scrollTo({ top: 0 })}>
              World-Network
            </h1>
          </div>
        </Link>

        <Search />
        <Menu />
      </nav>
    </div>
  );
};

export default Header;
