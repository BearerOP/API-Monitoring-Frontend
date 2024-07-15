import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Path from '../Services/Path';
import {
    Card, CardContent
} from '../Components/ui/card';
import { Button } from '@/Components/ui/button';
import { MoreHorizontalIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/Components/ui/table';
import '../Css/Monitor.css';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuContent } from '@/Components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/Components/ui/dialog'; // Ensure correct import paths


const ViewAllApi = () => {
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
                    console.log(response.data.data);
                    if (response && response.data && response.data.data) {
                        const logs = response.data.data;
                        setApiLogs(logs);

                        // Find the latest timestamp from all logs
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
                    console.log(error);
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
                    // Remove the deleted log from the state
                    setApiLogs((prevLogs) => prevLogs.filter(log => log._id !== selectedLogId));
                } else {
                    console.error('Failed to delete log:', response.data.message);
                }
            } catch (error) {
                console.error('Error deleting log:', error.message);
            } finally {
                setSelectedLogId(null); // Reset selected log id
                setIsDialogOpen(false); // Close the dialog
            }
        }
    };

    const extractDomain = (url) => {
        try {
            const domain = new URL(url).hostname;
            return domain;
        } catch (error) {
            console.error('Invalid URL:', url);
            return url;
        }
    };

    const renderApiLogs = () => {
        return apiLogs.map((log) => {
            // Find the latest log from nested logs
            const lastLog = log.logs[log.logs.length - 1];
            const latestTimestamp = new Date(lastLog.timestamp);
            const timeDifference = formatDistanceToNow(latestTimestamp, { addSuffix: true });
            return (
                <TableRow className='flex items-center justify-between ' key={log._id}>
                    <TableCell className='flex items-center'>
                        <span className={`blinker ${lastLog.status === 'Up' ? 'blinker-up' : 'blinker-down'}`}></span>
                        <div>
                            <div className="">{extractDomain(log.url)}</div>
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
                            <DropdownMenuContent className='dark' align="end">
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
                        <DialogContent className='dark'>
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
                    <Card className="mb-4">
                        <CardContent className="overflow-auto" style={{ maxHeight: '535px' }}>
                            <Table>
                                <TableBody>
                                    {renderApiLogs()}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}

export default ViewAllApi;
