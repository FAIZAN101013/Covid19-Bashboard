import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartComponent = () => {
    // Sample data for the line chart
    const lineData = [
        { year: 2019, cases: 0, recoveries: 0, deaths: 0 },
        { year: 2020, cases: 0.5, recoveries: 0.2, deaths: 0.1 },
        { year: 2021, cases: 0.8, recoveries: 0.5, deaths: 0.4 },
        { year: 2022, cases: 0.8, recoveries: 0.4, deaths: 0.2 },
        { year: 2023, cases: 0.2, recoveries: 0.1, deaths: 0.1 },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold mb-4">Line Chart</h2>
            <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="cases" stroke="#8884d8" strokeWidth={2} />
                        <Line type="monotone" dataKey="recoveries" stroke="#4CD137" strokeWidth={2} />
                        <Line type="monotone" dataKey="deaths" stroke="#FF5252" strokeWidth={2} />
                    </RechartsLineChart>
                </ResponsiveContainer>

                {/* Tooltip */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-md shadow-md">
                    <div className="text-xs">0.8 M Cases</div>
                    <div className="text-xs">2022</div>
                </div>
            </div>
        </div>
    );
};

export default LineChartComponent;