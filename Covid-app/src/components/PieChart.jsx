
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const PieChartComponent = () => {
    // Sample data for the pie chart
    const pieData = [
        { name: 'Total Population', value: 140, color: '#F7E987' },
        { name: 'Recoveries', value: 4.2, color: '#4CD137' },
        { name: 'Deaths', value: 0.2, color: '#FF5252' },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold mb-4">Pie Chart</h2>
            <div className="h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={90}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </RechartsPieChart>
                </ResponsiveContainer>

                {/* Tooltip */}
                <div className="absolute top-1/2 right-1/4 bg-white p-2 rounded-md shadow-md">
                    <div className="text-xs">140 M Total Population</div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center mt-4">
                <div className="w-4 h-4 bg-yellow-200 mr-2"></div>
                <span className="text-sm">Total Population</span>
            </div>
        </div>
    );
};

export default PieChartComponent;