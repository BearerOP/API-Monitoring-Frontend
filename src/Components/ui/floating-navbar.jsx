import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils"; // Ensure this utility handles class names properly
import { Link, useLocation } from "react-router-dom";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { AuthContext } from "../../Context/AuthContext";
import Path from "../../Services/Path";
import Loader from "./../Loader";
import HoverBorderGradient from "./hover-border-gradient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"


const FloatingNav = ({ className }) => {
  const { auth, logout } = useContext(AuthContext);
  const { isAuthenticated, token } = auth;
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Initial visibility state
  const location = useLocation();

  useEffect(() => {
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = scrollY.get();
      const viewportHeight = window.innerHeight;

      // Show the nav if scrolling up, otherwise hide if scrolling down past 100vh
      setVisible(scrollPosition < viewportHeight || scrollY.getPrevious() > scrollPosition);
    };

    handleScroll(); // Initial check
    const unsubscribe = scrollY.onChange(handleScroll);

    return () => unsubscribe();
  }, [scrollY]);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={location.pathname} // Use location.pathname to trigger animation on route change
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "flex w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-[#000000a0] backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4 overflow-hidden",
            className // Apply additional custom classes
          )}
        >
          {navItems.length > 0 ? (
            navItems.map((navItem, idx) => (
              <Link
                key={navItem.link || idx}
                to={navItem.link}
                className={cn(
                  "relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
                )}
              >
                <span className="block sm:hidden">{navItem.icon}</span>
                <span className="hidden sm:block text-sm">{navItem.name}</span>
              </Link>
            ))
          ) : (
            <div>No Navigation Items</div> // Fallback content if navItems is empty
          )}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {location.pathname === '/dashboard' && (
                  <>
                    {loading ? (
                      <Loader />
                    ) : (
                      <span className="username">Welcome, {userDetails?.data?.username || "User"}</span>
                    )}
                  </>
                )}
                {location.pathname === '/' && (
                  <Link to="/dashboard">
                    <HoverBorderGradient
                      className="btn dashboard text-white hover:text-sky-300 transition-all duration-1500 "
                      containerClassName="border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-white rounded-full"
                    >
                      Dashboard
                    </HoverBorderGradient>
                  </Link>
                )}
                <AlertDialog>
                  <AlertDialogTrigger > <button
                    className="flex border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-white px-4 py-2 rounded-full transition-colors duration-300 hover:text-red-600 hover:border-red-800 hover:border"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M9 12h12l-3 -3" />
                      <path d="M18 15l3 -3" />
                    </svg>
                    <span>Logout</span>
                  </button></AlertDialogTrigger>
                  <AlertDialogContent className="dark w-96 h-60">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className='inline-flex'>
                        <pre className=" text-wrap ">
                          This action cannot be undone. This will
                          <span className="text-destructive font-bold mx-1">log you out</span>
                          your account
                          from the website.
                        </pre>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={logout}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>


              </>
            ) : (
              <>
                <Link to="/signup" className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-white px-4 py-2 rounded-full">
                  Sign up
                </Link>

                <Link to="/login">
                  <HoverBorderGradient
                    className="btn dashboard"
                    containerClassName="border text-sm font-medium border-white/[0.2] px-2 text-white rounded-full"
                  >
                    Log in
                  </HoverBorderGradient>
                </Link>
              </>
            )}
            {/* Decorative elements */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-1/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-2/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px w-1/4" />
            <div className="absolute inset-x-20 bottom-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-1/4 blur-sm" />
            <div className="absolute inset-x-20 bottom-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-1/2" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-[5px] w-3/4 blur-sm" />
            <div className="absolute inset-x-10 bottom-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px w-1/2" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

FloatingNav.propTypes = {
  className: PropTypes.string, // Optional custom class name
};

export default FloatingNav;