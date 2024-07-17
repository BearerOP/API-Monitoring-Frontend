import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Path from '../Services/Path';
import Dashboard2 from './Dashboard2';

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
        return <p>Loading...</p>;
    }

    // if (!logDetails) {
    //     return <p>No log details found.</p>;
    // }

    return (
        <div>
            <h1>Log Details for {logDetails.data.url}</h1>
            {/* Render log details */}
            <Dashboard2/>
            {/* <pre>{JSON.stringify(logDetails, null, 2)}</pre> */}
        </div>
    );
};

export default ViewApi;