import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from '../Services/Path';
import { AuthContext } from '../Context/AuthContext';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "@/Components/ui/use-toast";
import SocialCard from '@/Components/SocialCard';
import '../Css/Login.css'; // Assuming you want to keep the same CSS
import { Toaster } from '@/Components/ui/toaster';

export default function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);

  const isValidEmail = (email) => {
    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setMessage('Invalid email format. Please check your email address.');
      return;
    }

    setLoader(true);
    setMessage(''); // Clear previous messages

    try {
      const response = await Path.post('/api/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        login(response.data.token); // Assuming login function sets isLoggedIn state to true
        toast({
          title: 'Login successful!',
          description: response.data.message,
          style: {
            backgroundColor: '#70e000', // Green for success
            color: '#000',
            borderRadius: '10px',
            padding: '10px 15px',
            border: 'solid #000 2px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.6)',
            height: '90px'
          }
        });
        navigate('/');
      } else {
        setMessage(response.data.message); // Server-side error message
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        style: {
          backgroundColor: '#ba181b',
          color: '#000',
          border: 'solid #000 2px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.6)',
          height: '90px',
        }
      });
    } finally {
      setLoader(false);
    }
  };

  const isFormValid = () => email && password && isValidEmail(email);

  return (
    <div className='dark'>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] dark">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {message && (
                <div className="error-message">
                  {message}
                </div>
              )}
              <Button
                onClick={handleLogin}
                disabled={!isFormValid() || loader}
                className="w-full"
              >
                {loader ? (
                  <>
                    Logging In
                    <span className="spinner"></span>
                  </>
                ) : (
                  'Login'
                )}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline">
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <div className="w-full h-full flex justify-center items-center" style={{ background: 'linear-gradient(to left, #20002c, #cbb4d4)' }}>
            <SocialCard />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}