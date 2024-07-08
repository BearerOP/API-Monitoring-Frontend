import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '../Css/Navbar.css';
import logoImage from '../../public/uptimeLogo.png';
import Path from '../Services/Path';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const { isAuthenticated, token } = auth;
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const response = await Path.get('/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);

          if (response) {
            setUserDetails(response.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" >
          <img src={logoImage} alt="UpStatus" />
        </Link>
        <Link to="/" >
          <span>UpStatus</span>
        </Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/solutions">Solution & Services</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
      </ul>
      <div className="navbar-buttons">
        {isAuthenticated ? (
          <>
            {loading ? (
              <span>Loading...</span>
            ) : (
              <span className="username">Welcome, {userDetails.data?.username || "User"}</span>
            )}
            {location.pathname === '/' && (
              <Link to="/dashboard" className="btn dashboard">Dashboard</Link>
            )}
            <button className="btn logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="btn signup">Sign up</Link>
            <Link to="/login" className="btn login">Log in</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;