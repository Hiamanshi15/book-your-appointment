import React from "react";
import Logo from "../assets/logo-removebg-preview.png";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <div style={{display: 'flex', gap: '15px'}}>
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>
      <div className="logo">
         <img src={Logo} className="App-logo" alt="logo" height={75}/>
      </div>
      </div>
      <input type="text" className="search-bar" placeholder="Search..." />
    </header>
  );
};

export default Header;