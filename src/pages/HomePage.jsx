import React from 'react';
import './HomePage.css';
import NavbarHome from '../components/NavbarHome';
import { useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import backgroundImage from '../assets/back 2.png';


const HomePage = () => {
  const navigate = useNavigate();

  const handleProtectedClick = (route) => {
  const user = localStorage.getItem("user");
  if (!user || user === 'null' || user === 'undefined') {
    navigate("/login");
  } else {
    navigate(route);
  }
};

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <NavbarHome />

      <div className="home-content">
        <h1 className="offer-title">
          What we offer <FaLeaf className="offer-icon" />
        </h1>

        <div className="offer-links">
          <button onClick={() => navigate('/pregnancy')}>Learn about pregnancy</button>
          <button onClick={() => handleProtectedClick('/login')}>Find Donors</button>
          <button onClick={() => navigate('/ivf')}>Learn about IVF</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
