import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Path from '../Services/Path';
import {
    Card, CardContent, CardHeader, CardTitle,
    CardDescription,
} from '../Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link } from 'react-router-dom';
import { MoreHorizontalIcon, PlusCircleIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import '../Css/Monitor.css';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuContent } from '@/Components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

const Monitor = () => {
    const { auth } = useContext(AuthContext);
    const { token } = auth;
    const [apiLogs, setApiLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

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
            console.log(timeDifference);
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
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
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
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>API Logs</CardTitle>
                            <CardDescription>
                                {lastUpdated && (
                                    <p className="mb-4">Overall Last Checked: {new Date(lastUpdated).toLocaleString()}</p>
                                )}
                            </CardDescription>
                        </div>
                        <Button asChild variant='outline' size="sm" className="ml-auto gap-1">
                            <Link to="#">
                                Create Monitor
                                <PlusCircleIcon className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
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
    );
};

export default Monitor;