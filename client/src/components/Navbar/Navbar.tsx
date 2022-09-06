import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SidebarData } from './SideBarData';
// import styled from "styled-components";
// import COLORS from "../../styles/styled.constants";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import COLORS from '../../styles/styled.constants';
import { Login } from '../Login/Login';
import logo from '../../assets/DevTrackerLogo.png';
import textLogo from '../../assets/DevTrackerText.png';

const NavbarWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: #242933;
  .logo {
    padding-right: 2rem;
    color: ${COLORS.button};
    @media (max-width: 1006px) { 
      display:none;
     }
    h2 {
      font-size: 2.8em;
      font-weight: bolder;
    }
  }
  .menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
    transition: all 0.5s ease-in-out;
  }

  .close-bars {
    font-size: 1.8rem;
    background: none;
    position: absolute;
    right: 1.3rem;
  }
  .nav-menu {
    z-index: 100;
    border-right: 4px solid rgb(116,255,122);
    width: 14rem;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
  }
  .nav-menu.active {
    z-index: 100;
    left: 0;
    transition: 350ms;
    background-color:#242933;
  }
  .nav-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
    width: 100%;
  }

  .nav-text a {
    text-decoration: none;
    color: white;
    font-size: 1em;
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 4px;
  }

  .nav-text a:hover {
    text-decoration: underline;
  }

  .nav-menu-items {
    width: 80%;
    margin: 0px;
    padding: 0px;
  }

  .navbar-toggle {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  span {
    margin-left: 0.7rem;
  }
`;

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const hideSidebar = () => setSidebar(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.getItem('uid') ? setLoggedIn(true) : setLoggedIn(false);
  }, [loggedIn]);
  const userPhoto = localStorage.getItem('userPhoto');
  const userName = localStorage.getItem('userName');
  const email = localStorage.getItem('email');

  return (
    <NavbarWrapper>
      <Link to='#' className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar} style={{ color: '#75FF7A' }} />
      </Link>
      <div className='logo'>
        <img
          src={textLogo}
          alt='Text logo Dev Tracker'
          style={{ width: '15rem' }}></img>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <div className='logo'></div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <Link to='#' className='close-bars' onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {loggedIn ? (
              <div style={{ textAlign: 'center' }}>
                <img
                  src={userPhoto ? userPhoto : undefined}
                  alt='user'
                  style={{ borderRadius: '100px' }}
                  referrerPolicy="no-referrer" />
                <p
                  style={{ color: 'white', fontSize: '0.8rem', margin: '5px' }}>
                  {userName}
                </p>
                <p
                  style={{
                    color: 'white',
                    fontSize: '0.6rem',
                    marginBottom: '3rem',
                  }}>
                  {email}
                </p>
              </div>
            ) : (
              <div></div>
            )}
            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Login>
            {loggedIn ? (
              SidebarData.map((item, i: number) => {
                return (
                  <li key={i} className={item.cName}>
                    <Link to={item.path} onClick={() => hideSidebar()}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })
            ) : (
              <div style={{ textAlign: 'center' }}>
                <img
                  src={logo}
                  alt='DevTracker Logo'
                  style={{
                    borderRadius: '50px',
                    width: '7rem',
                    marginTop: '30px',
                  }}></img>
                <p style={{ color: 'white', marginTop: '30px' }}>
                  Please log in to see the information of your Dashboard
                </p>
              </div>
            )}
          </ul>
        </nav>
      </nav>
    </NavbarWrapper>
  );
};

export default Navbar;
