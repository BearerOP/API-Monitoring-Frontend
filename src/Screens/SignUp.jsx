import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from '../Services/Path';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import '../Css/SignUp.css'; // Ensure this path is correct
import { EyeIcon, EyeOff, CheckIcon } from 'lucide-react';
import { Circle } from 'lucide-react';
import MinimalLoaderComponent from '@/Components/MinimalLoader';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const SignUp = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // States for password validation
  const [hasUpperLower, setHasUpperLower] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Validate password conditions
  const validatePassword = (password) => {
    const upperLowerRegex = /^(?=.*[a-z])(?=.*[A-Z])/;
    const minLengthRegex = /^.{8,}$/;
    const numberRegex = /^(?=.*\d)/;

    setHasUpperLower(upperLowerRegex.test(password));
    setHasMinLength(minLengthRegex.test(password));
    setHasNumber(numberRegex.test(password));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoader(true);
    setMessage(''); // Clear previous messages
    try {
      const response = await Path.post('/api/register', {
        username,
        email,
        password,
      });
      if (response.data.success) {
        alert(response.data.message);
        navigate('/login');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Sign Up failed. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = () => hasUpperLower && hasMinLength && hasNumber;

  const isFormValid = () =>
    username && isValidEmail(email) && isValidPassword();

  return (
    <div className="dark">
      <div className="min-h-screen flex items-center justify-center relative gradient-shadow">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-slate-800 lg:block z-50 no-underline group cursor-pointer shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
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

        <div className="relative bg-white dark:bg-transparent border border-gray-500/30 rounded-xl w-[35rem] shadow-xl p-10 max-w-lg text-black dark:text-white backdrop-blur-md">
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div className="text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-muted-foreground dark:text-gray-400">
                Create your account to get started
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="dark:text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border-gray-500/30 text-white placeholder-purple-300"
                />
              </div>

              <div>
                <Label htmlFor="email" className="dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border-gray-500/30 text-white placeholder-purple-300"
                />
                {!isValidEmail(email) && email && (
                  <p className="text-red-600 text-sm">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={passwordVisible ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    className="tracking-wider w-full bg-white/5 border-gray-500/30 text-white placeholder-purple-300"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-2"
                  >
                    {passwordVisible ? (
                      <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                    )}
                  </button>
                </div>
                <div className="text-muted-foreground text-sm mt-2 dark:text-gray-400">
                  <ul className=" pl-2">
                    <li className="flex gap-x-2">
                      {hasUpperLower ? (
                        <CheckIcon className="text-green-600 w-3" />
                      ) : (
                        <Circle className="text-gray-400 w-3" />
                      )}
                      <span>Mix of uppercase & lowercase letters</span>
                    </li>
                    <li className="flex gap-x-2">
                      {hasMinLength ? (
                        <CheckIcon className="text-green-600 w-3" />
                      ) : (
                        <Circle className="text-gray-400 w-3" />
                      )}
                      <span>Minimum 8 characters long</span>
                    </li>
                    <li className="flex gap-x-2">
                      {hasNumber ? (
                        <CheckIcon className="text-green-600 w-3" />
                      ) : (
                        <Circle className="text-gray-400 w-3" />
                      )}
                      <span>Contain at least 1 number</span>
                    </li>
                  </ul>
                </div>
              </div>

              {message && (
                <div className="text-red-600 text-sm" role="alert">
                  {message}
                </div>
              )}

              <Button
                type="submit"
                disabled={!isFormValid() || loader}
                className="w-full dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"
              >
                {loader ? (
                  <MinimalLoaderComponent barColor="rgb(255,255,255)" />
                ) : (
                  'Sign Up'
                )}
              </Button>

              <div className="flex justify-between gap-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-gray-500/30 text-white hover:bg-white/10 transition-all duration-300 ease-in-out"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign Up with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-gray-500/30 text-white hover:bg-white/10 transition-all duration-300 ease-in-out"
                >
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  Sign Up with Github
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm dark:text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="underline dark:text-violet-400">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
