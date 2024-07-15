import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Path from '../Services/Path';
import {
  Card, CardContent, CardHeader, CardTitle,
  CardDescription
} from '../Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link, Outlet } from 'react-router-dom';
import { MoreHorizontalIcon, PlusCircleIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/Components/ui/table';
import '../Css/Monitor.css';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuContent } from '@/Components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/Components/ui/dialog';

const Monitor = () => {
  const { auth } = useContext(AuthContext);
  const { token } = auth;
  const [apiLogs, setApiLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedLogId, setSelectedLogId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchApiLogs = async () => {
      if (token) {
        try {
          const response = await Path.get('/api/getAllLogs', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response && response.data && response.data.data) {
            const logs = response.data.data;
            setApiLogs(logs);

            let latestTimestamp = null;
            logs.forEach(log => {
              log.logs.forEach(nestedLog => {
                const timestamp = new Date(nestedLog.timestamp);
                if (!latestTimestamp || timestamp > new Date(latestTimestamp)) {
                  latestTimestamp = nestedLog.timestamp;
                }
              });
            });
            setLastUpdated(latestTimestamp);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApiLogs();
  }, [token]);

  const handleDeleteClick = async () => {
    if (token && selectedLogId) {
      try {
        const response = await Path.delete(`/api/deleteLog`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            logId: selectedLogId,
          },
        });
        if (response && response.data && response.data.success) {
          setApiLogs(prevLogs => prevLogs.filter(log => log._id !== selectedLogId));
        } else {
          console.error('Failed to delete log:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting log:', error.message);
      } finally {
        setSelectedLogId(null);
        setIsDialogOpen(false);
      }
    }
  };

  const extractDomain = url => {
    try {
      return new URL(url).hostname;
    } catch (error) {
      console.error('Invalid URL:', url);
      return url;
    }
  };

  const renderApiLogs = () => {
    return apiLogs.map(log => {
      const lastLog = log.logs[log.logs.length - 1];
      const latestTimestamp = new Date(lastLog.timestamp);
      const timeDifference = formatDistanceToNow(latestTimestamp, { addSuffix: true });
      return (
        <TableRow className='flex items-center justify-between' key={log._id}>
          <TableCell className='flex items-center'>
            <span className={`blinker ${lastLog.status === 'Up' ? 'blinker-up' : 'blinker-down'}`}></span>
            <div>
              <div>{extractDomain(log.url)}</div>
              <div className='text-gray-400'>{lastLog.status} • {timeDifference}</div>
            </div>
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-haspopup="true"
                  size="icon"
                  variant="ghost"
                >
                  <MoreHorizontalIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setSelectedLogId(log._id); setIsDialogOpen(true); }}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete the log and remove it from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button variant="destructive" onClick={handleDeleteClick}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>API Logs</CardTitle>
              <CardDescription>
                {lastUpdated && (
                  <span className="mb-4">Overall Last Checked: {new Date(lastUpdated).toLocaleString()}</span>
                )}
              </CardDescription>
            </div>
            <Button asChild variant='outline' size="sm" className="ml-auto gap-1">
              <Link to="createMonitor">
                Create Monitor
                <PlusCircleIcon className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Monitor;