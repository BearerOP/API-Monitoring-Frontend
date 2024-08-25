import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Path from "../Services/Path";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import "../Css/SignUp.css"; // Ensure this path is correct
import { WavyBackground } from "@/Components/ui/wavy-background";
import { EyeIcon, EyeOff, CheckIcon } from "lucide-react";
import { Circle } from "lucide-react";
import MinimalLoaderComponent from "@/Components/MinimalLoader";

const SignUp = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
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
        setMessage(""); // Clear previous messages
        try {
            const response = await Path.post("/api/register", {
                username,
                email,
                password,
            });
            if (response.data.success) {
                alert(response.data.message);
                navigate("/login");
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage("Sign Up failed. Please try again.");
        } finally {
            setLoader(false);
        }
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = () =>
        hasUpperLower && hasMinLength && hasNumber;

    const isFormValid = () =>
        username && isValidEmail(email) && isValidPassword();

    const passwordErrorClass =
        !isValidPassword() && password
            ? "text-rose-800 text-sm delay-100 duration-500 transition opacity-100"
            : "collapse opacity-0 text-sm text-rose-800 ";

    return (
        <div className="relative dark">
            <button onClick={() => navigate("/")} className="absolute top-4 left-4 bg-slate-800 lg:block z-50 no-underline group cursor-pointer shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
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
                    <span>
                        Back to Home
                    </span>

                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-violet-400/90 to-violet-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>

            <div className="w-full lg:grid h-screen lg:grid-cols-2">
                <div className="flex items-center justify-center py-12 z-10 bg-background/70 border-r">
                    <form
                        className="mx-auto grid w-[350px] gap-6"
                        onSubmit={handleSignUp}
                    >
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
                                        type={passwordVisible ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            validatePassword(e.target.value);
                                        }}
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
                                <p className="text-muted-foreground text-sm">
                                    <ul>
                                        <li className="flex gap-x-2 pl-1">
                                            {hasUpperLower ? (
                                                <CheckIcon
                                                    width={"14px"}
                                                    className="text-green-600"
                                                />
                                            ) : (
                                                <Circle width={"8px"} />
                                            )}
                                            <p>Mix of uppercase & lowercase letters</p>
                                        </li>
                                        <li className="flex gap-x-2 pl-1">
                                            {hasMinLength ? (
                                                <CheckIcon
                                                    width={"14px"}
                                                    className="text-green-600"
                                                />
                                            ) : (
                                                <Circle width={"8px"} />
                                            )}
                                            <p>Minimum 8 characters long</p>
                                        </li>
                                        <li className="flex gap-x-2 pl-1">
                                            {hasNumber ? (
                                                <CheckIcon
                                                    width={"14px"}
                                                    className="text-green-600"
                                                />
                                            ) : (
                                                <Circle width={"8px"} />
                                            )}
                                            <p>Contain at least 1 number</p>
                                        </li>
                                    </ul>
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
                                    "Sign Up"
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
