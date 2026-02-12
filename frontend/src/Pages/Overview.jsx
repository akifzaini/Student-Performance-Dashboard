import React, { useEffect, useState } from 'react';

const Overview = () => {
    const [data, setData] = useState({ total: 0, average_grade: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/stats')
            .then((response) => response.json())
            .then((stats) => {
                setData(stats);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching stats:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading Statistics...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Academic System Overview</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={cardStyle}>
                    <h3>Total Students</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.total}</p>
                </div>
                <div style={cardStyle}>
                    <h3>System Status</h3>
                    <p style={{ color: 'green' }}>Online</p>
                </div>
            </div>
        </div>
    );
};

const cardStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    minWidth: '150px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center'
};

export default Overview;