import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CircularProgress, Alert, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Path from '../Services/Path';
import Navbar from '../Components/Navbar';
import '../Css/Dashboard.css';
import { useNavigate } from 'react-router-dom';

// Create a dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0a0a',
      paper: '#1E1E1E',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
  },
});

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        if (!token) {
          setError('You are not logged in');
          setLoading(false);
          navigate('/login'); // Redirect to login if not authenticated
        } else {
          const response = await Path.get('/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data.data);
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <div className="background">
        <div className="content">
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          {userData && (
            <Card sx={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', boxShadow: '20px 20px #fff' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Details
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {userData.username}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {userData.email}
                </Typography>
                {/* Add more user details as needed */}
              </CardContent>
            </Card>
          )}
          <Button variant="contained" color="primary">
            Join the waitlist
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;