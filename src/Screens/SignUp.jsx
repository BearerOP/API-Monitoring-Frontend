import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from '../Services/Path';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import '../Css/SignUp.css'; // Ensure this path is correct
import { WavyBackground } from '@/Components/ui/wavy-background';
import { EyeIcon, EyeOff } from 'lucide-react';
import MinimalLoaderComponent from '@/Components/MinimalLoader';

const SignUp = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoader(true);
        setMessage(''); // Clear previous messages
        try {
            const response = await Path.post('/api/register', {
                username,
                email,
                password
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
    const isValidPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const isFormValid = () => username && isValidEmail(email) && isValidPassword(password);

    const passwordErrorClass = !isValidPassword(password) && password ? 'text-rose-800 text-sm delay-100 duration-500 transition opacity-100' : 'collapse opacity-0 text-sm text-rose-800 ';

    return (
        <div className='relative dark'>
            <div className="w-full lg:grid h-screen lg:grid-cols-2">
                <div className="flex items-center justify-center py-12 z-10 bg-background/70 border-r">
                    <form className="mx-auto grid w-[350px] gap-6" onSubmit={handleSignUp}>
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Sign Up</h1>
                            <p className="text-balance text-muted-foreground">
                                Create your account to get started
                            </p>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Full Name</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
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
                                {!isValidEmail(email) && email && (
                                    <p className="text-rose-800 text-sm">
                                        Please enter a valid email address.
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={passwordVisible ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='tracking-wider'
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
                                <p className="text-muted-foreground text-sm">
                                    Password must be at least 8 characters long, include a number, and a special character.*
                                </p>
                                <p className={passwordErrorClass}>
                                    Ensure your password meets the required criteria.
                                </p>
                            </div>
                            {message && (
                                <div className="text-rose-800 text-sm" role="alert">
                                    {message}
                                </div>
                            )}
                            <Button
                                type="submit"
                                disabled={!isFormValid() || loader}
                                className="w-full"
                            >
                                {loader ? (
                                    <>
                                                  <MinimalLoaderComponent barColor="rgb(255,255,255)" />
                                    </>
                                ) : (
                                    'Sign Up'
                                )}
                            </Button>
                            <Button variant="outline" className="w-full">
                                Sign Up with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/login" className="underline">
                                Login
                            </a>
                        </div>
                    </form>
                </div>
                <div className="absolute inset-0 -z-20">
                    <WavyBackground />
                </div>
            </div>
        </div>
    );
};

export default SignUp;