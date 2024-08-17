import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Path from '../Services/Path';
import Dashboard2 from './Dashboard2';
import Loader from '@/Components/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';

const ViewApi = () => {
    const { logId } = useParams();
    const { auth } = useContext(AuthContext);
    const { token } = auth;
    const [logDetails, setLogDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogDetails = async () => {
            if (token) {
                try {
                    const response = await Path.get(`/api/getLogs`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            logId: logId,
                        },
                    });
                    setLogDetails(response.data);
                } catch (error) {
                    console.error('Error fetching log details:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchLogDetails();
    }, [token, logId]);

    if (loading) {
        return <Loader />;
    }

    if (!logDetails) {
        return <p>No log details found.</p>;
    }

    return (
        <div className='flex flex-col gap-y-2'>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <h2>Log Details</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-full justify-center  overflow-hidden w-full">
                    <span className=''>
                        Api Route: <span className='text-foreground/40'>
                            {logDetails.data.url}
                        </span>
                    </span>
                    <span>
                        API Method: <span className='text-foreground/40'>
                            {logDetails.data.method}
                        </span>
                    </span>
                    <span>
                        No. of requests: <span className='text-foreground/40'>
                            {logDetails.data.__v + 1}
                        </span>
                    </span>
                </CardContent>
            </Card>

            {console.log(logDetails)
            }
            {/* Render log details */}
            <Dashboard2 logDetails={logDetails.data} />
            {/* <pre>{JSON.stringify(logDetails, null, 2)}</pre> */}
        </div>
    );
};

export default ViewApi;