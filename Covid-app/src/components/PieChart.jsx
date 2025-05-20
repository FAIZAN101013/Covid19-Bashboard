import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const PieChartComponent = ({ data }) => {
    if (!data) return null;

    const lastDate = Object.keys(data.cases).pop();
    const totalCases = data.cases[lastDate];
    const totalRecovered = data.recovered[lastDate];
    const totalDeaths = data.deaths[lastDate];
    const activeCases = totalCases - totalRecovered - totalDeaths;

    const chartData = {
        labels: ['Active Cases', 'Recovered', 'Deaths'],
        datasets: [
            {
                data: [activeCases, totalRecovered, totalDeaths],
                backgroundColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 99, 132)',
                ],
                borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 99, 132)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'COVID-19 Distribution',
            },
        },
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChartComponent;