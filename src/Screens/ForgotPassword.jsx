import React, { useState } from "react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import AuroraBackgroundDisplay from "@/Components/AuroraBackgroundDisplay";
import Path from "@/Services/Path"; // Import your API service

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Path.post('/api/forgot-password', { email });
      if (response.data.success) {
        setSuccess(response.data.message);
        setError("");
      } else {
        setError(response.data.message);
        setSuccess("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  return (
    <AuroraBackgroundDisplay
      content={
        <div className="flex min-h-screen flex-col items-center justify-center max-w-sm py-12 px-4">
          <div className="mx-auto w-full max-w-sm space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Forgot your password?
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Enter the email address associated with your account and we'll send you a link to reset your password.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6" method="POST">
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='text-slate-600'
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500 text-center">{success}</p>}
              <Button type="submit" className="w-full">
                Reset password
              </Button>
            </form>
            <div className="flex justify-center">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      }
    />
  );
}