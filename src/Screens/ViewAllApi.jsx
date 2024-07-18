import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Path from '../Services/Path';
import {
    Card, CardContent
} from '../Components/ui/card';
import { Button } from '@/Components/ui/button';
import { ArrowUpRightIcon, MoreHorizontalIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from '@/Components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuContent } from '@/Components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/Components/ui/dialog'; // Ensure correct import paths

import '../Css/Monitor.css';

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
                <TableRow className='flex items-center justify-between' key={log._id}>
                    <TableCell className='flex items-center'>
                        <span className={`blinker w-1/2 h-1/2  ${lastLog.status === 'Up' ? 'blinker-up' : 'blinker-down'}`}>
                            <span className={`blinkerChild ${lastLog.status === 'Up' ? 'blinker-up' : 'blinker-down'}`}>
                            </span>
                        </span>
                        <div>
                            <div className='flex gap-1.5 ml-4 align-bottom '>
                                <Link to={`/dashboard/monitor/viewApi/${log._id}`} className=" hover:cursor-pointer hover:underline  hover:underline-offset-4 place-self-center">
                                    {extractDomain(log.url)}
                                </Link>
                                {/* <Link to={`/dashboard/monitor/viewApi/${log._id}`} className='flex align-super justify-center  ' > */}
                                    <Link to={`/dashboard/monitor/viewApi/${log._id}`} className="flex align-center justify-center buttonArrow" >
                                        <span className="button__icon-wrapper">
                                            <svg width="10" className="button__icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 15">
                                                <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
                                            </svg>

                                            <svg className="button__icon-svg  button__icon-svg--copy" xmlns="http://www.w3.org/2000/svg" width="10" fill="none" viewBox="0 0 14 15">
                                                <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
                                            </svg>
                                        </span>
                                </Link>
                                    {/* </Link> */}
                            </div>
                            <div className='text-gray-400 ml-4'>{lastLog.status} • {timeDifference}</div>
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
                    <Card className="mb-4" style={{ padding: 0 }}>
                        <CardContent className="overflow-auto" style={{ maxHeight: '535px', padding: 0 }}>
                            <Table style={{ padding: 0 }}>
                                <TableBody style={{ padding: 0 }}>
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