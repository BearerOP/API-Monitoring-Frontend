import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from '../Services/Path';
import { AuthContext } from '../Context/AuthContext';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import SocialCard from '@/Components/SocialCard';
import '../Css/Login.css'; // Assuming you want to keep the same CSS
import { toast } from '@/Components/ui/use-toast';
import { Toaster } from '@/Components/ui/toaster';
import { EyeIcon, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
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
            height: '90px',
          },
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
        },
      });
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    handleLogin(); // Call the login function
  };

  const isFormValid = () => email && password && isValidEmail(email);

  return (
    <div className="dark">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-slate-800 lg:block z-50 no-underline group cursor-pointer shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
          <svg
            className="rotate-180"
            fill="none"
            height="16"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.75 8.75L14.25 12L10.75 15.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
          <span>Back to Home</span>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-violet-400/90 to-violet-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] dark">
        <div className="flex items-center justify-center py-12">
          <form
            className="mx-auto grid w-[350px] gap-6"
            onSubmit={handleSubmit}
          >
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
                <div className="relative">
                  <Input
                    id="password"
                    type={passwordVisible ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-2"
                  >
                    {passwordVisible ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              {message && <div className="error-message">{message}</div>}
              <Button
                type="submit"
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
              Don&apos;t have an account?{' '}
              <a href="/signup" className="underline">
                Sign up
              </a>
            </div>
          </form>
        </div>
        <div className="hidden bg-muted lg:block">
          <div
            className="w-full h-full flex justify-center items-center"
            style={{ background: 'linear-gradient(to left, #20002c, #cbb4d4)' }}
          >
            <SocialCard />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
