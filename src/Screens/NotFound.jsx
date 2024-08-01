import { Button } from '@/Components/ui/button';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/NotFound.css'

export default function NotFound() {
    return (
        <div className='h-screen w-full dark relative' style={{ background: 'linear-gradient(to right, #a8c0ff, #000)' }}>
            <main className="flex flex-col h-full justify-center items-start px-6 py-24 sm:py-32 lg:px-8">
                <div className="">
                    <h3 className="font-bold text-violet-600">404</h3>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
                    <p className="mt-6 text-base leading-7">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center gap-x-6">
                        <div>
                            {/* <Link
                                to="/"
                                className="flex rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
                            >
                                <p>Go back home</p>
                                <ArrowLeft className='h-5 ml-2' />
                            </Link> */}
                            <Link to={'/'} class="Btn-Container">
                                <span class="text">go home!</span>
                                <span class="icon-Container">
                                    <svg
                                        width="16"
                                        height="19"
                                        viewBox="0 0 16 19"
                                        fill="nones"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
                                        <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
                                        <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
                                        <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
                                        <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
                                        <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
                                        <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
                                        <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
                                        <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
                                        <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
                                    </svg>
                                </span>
                            </Link>

                        </div>
                        <Link to={'/dashboard'} className="mt-4 underline text-sm font-semibold text-gray-900 hover:text-violet-900 transition-colors ">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </main>
            <Link to="/login" className="absolute top-8 right-12 px-4 py-2 text-sm font-bold text-white underline-offset-2 hover:text-indigo-300 hover:underline transition-colors">
                Login
            </Link>
        </div>
    )
}