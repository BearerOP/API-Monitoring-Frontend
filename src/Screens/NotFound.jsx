import { Button } from '@/Components/ui/button';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='h-screen w-full dark relative' style={{ background: 'linear-gradient(to right, #a8c0ff, #000)' }}>
            <main className="flex flex-col h-full justify-center items-start px-6 py-24 sm:py-32 lg:px-8">
                <div className="">
                    <h3 className="font-bold text-violet-600">404</h3>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
                    <p className="mt-6 text-base leading-7">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center gap-x-6">
                        <Button>
                            <Link
                                to="/"
                                className="flex rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
                            >
                                <p>Go back home</p>
                                <ArrowLeft className='h-5 ml-2' />
                            </Link>
                        </Button>
                        <Link to={'/dashboard'} className=" text-sm font-semibold text-gray-900 hover:text-violet-900 transition-colors">
                            Dashboard <span aria-hidden="true">&rarr;</span>
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