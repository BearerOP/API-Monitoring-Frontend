import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Update this import
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Button } from '@/Components/ui/button';
import Path from '@/Services/Path';
import { GridBackgroundDisplay } from '@/Components/GridBackgroundDisplay';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await Path.post('/api/reset-password', {
        token,
        newPassword,
        email,
      });

      // Directly use response.data instead of calling response.json()
      const data = response.data;

      if (response.status === 200) {
        setSuccess(data.message);
        setError(null);
        navigate('/login'); // Redirect to login page
      } else {
        setError(data.message);
        setSuccess(null);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <GridBackgroundDisplay
      content={
        <div className="dark flex h-screen justify-center items-center">
          <div className="space-y-6 w-full max-w-sm mx-auto">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <span>
                <p className="text-muted-foreground px-10">
                  Enter your email and a new password to reset your account
                  password.
                </p>
              </span>
            </div>
            <Card>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4 mt-6">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  {success && <p className="text-green-500">{success}</p>}
                  <CardFooter className="p-0">
                    <Button type="submit" className="mt-8 w-full">
                      Reset Password
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
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
};

export default ResetPassword;
