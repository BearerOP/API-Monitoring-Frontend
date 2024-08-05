import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import FloatingNav from "../Components/ui/floating-navbar"; // Ensure this path is correct
import Loader from "./Loader";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const { isAuthenticated, token } = auth;
  const [userDetails, setUserDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const response = await Path.get('/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserDetails(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [token]);

  return (
    <>
      <FloatingNav className="dark" />
    </>
  );
};

export default Navbar;