import React, { useState,useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { toast } from '@/Components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Path from '../Services/Path';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

const CreateMonitor = () => {
    const { auth } = useContext(AuthContext);
    const { token } = auth;
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
                title: `Monitor Created Succefully for ${domain}`,
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-10">
      <Input 
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        required
      />
      <Input
        type="text"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        placeholder="Enter Method"
        required
      />
      <Button className='' type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Monitor'}
      </Button>
      </div>
    </form>
  );
};

export default CreateMonitor;