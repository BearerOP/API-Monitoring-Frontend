import { useState, useEffect } from 'react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Link } from 'react-router-dom';
import AuroraBackgroundDisplay from '@/Components/AuroraBackgroundDisplay';
import Path from '@/Services/Path'; // Import your API service
import { toast } from '@/Components/ui/use-toast'; // Import your custom toast
import { Toaster } from '@/Components/ui/toaster'; // Import your custom Toaster

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(0); // State for time countdown
  success;
  useEffect(() => {
    const storedTimestamp = localStorage.getItem('forgotPasswordAttemptTime');
    const cooldownPeriod = 10 * 60 * 1000; // 10 minutes in milliseconds

    if (storedTimestamp) {
      const currentTime = Date.now();
      const timePassed = currentTime - parseInt(storedTimestamp, 10);
      const remainingTime = Math.max(0, cooldownPeriod - timePassed);

      if (remainingTime > 0) {
        setTimeLeft(Math.ceil(remainingTime / 1000)); // Convert to seconds
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
      }
    }
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if we are within the cooldown period
    if (timeLeft > 0) {
      toast({
        title: 'Try again later',
        className: 'dark',
        description: `Please wait ${formatTime(timeLeft)} before trying again.`,
      });
      return;
    }

    try {
      // Save the current timestamp to local storage
      localStorage.setItem('forgotPasswordAttemptTime', Date.now().toString());

      const response = await Path.post('/api/forgot-password', { email });
      if (response.data.success) {
        setSuccess(response.data.message);
        setError('');
        toast({
          title: 'Reset link sent',
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
      } else {
        setError(response.data.message);
        setSuccess('');
        toast({
          title: 'Request failed',
          description: response.data.message,
          style: {
            backgroundColor: '#ba181b', // Red for error
            color: '#fff',
            borderRadius: '10px',
            padding: '10px 15px',
            border: 'solid #000 2px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.6)',
            height: '90px',
          },
        });
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess('');
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        style: {
          backgroundColor: '#ba181b', // Red for error
          color: '#fff',
          borderRadius: '10px',
          padding: '10px 15px',
          border: 'solid #000 2px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.6)',
          height: '90px',
        },
      });
    }
  };

  return (
    <>
      <AuroraBackgroundDisplay
        content={
          <div className="flex min-h-screen flex-col items-center justify-center max-w-sm py-12 px-4">
            <div className="mx-auto w-full max-w-sm space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                  Forgot your password?
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                  Enter the email address associated with your account and
                  we&apos;ll send you a link to reset your password.
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
                    className="text-slate-600"
                  />
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
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
      <Toaster className="dark" />
    </>
  );
}
