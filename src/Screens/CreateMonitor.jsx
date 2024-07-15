import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { toast } from '@/Components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Path from '../Services/Path';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';

const CreateMonitor = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { token } = auth;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(token){
        try {
            const response = await Path.post(
                '/api/addLog',
                { url, method },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
          if (response.data.success) {
            const domain = new URL(url).hostname;
            const date = new Date()
            toast({
                title: `Monitor Created Successfully for ${domain}`,
                description: `${date}`,
              })
            navigate('/dashboard/monitor');
          } else {
            toast('Failed to create monitor');
          }
        } catch (error) {
          console.error(error);
          toast('An error occurred while creating the monitor');
        } finally {
          setLoading(false);
        }
    } else {
      toast('No token found, please login');
    }
  };

  return (
    <>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Adding a Monitor</CardTitle>
          <CardDescription>Provide the URL with method to monitor.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col justify-around content-around" onSubmit={handleSubmit}>
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              required
              className="mb-4 max-w-md"
            />
            <Input
              type="text"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              placeholder="Enter Method"
              required
              className="mb-4 max-w-md"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating...' : 'Create Monitor'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateMonitor;