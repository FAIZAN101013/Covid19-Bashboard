import React from 'react';
import CountrySelector from '../components/CountrySelector';
import StatCard from '../components/StatCard';
import LineChartComponent from '../components/LineChart';
import PieChartComponent from '../components/PieChart';
import DateRangePicker from '../components/DateRangePicker';

const Home = () => {
    return (
        <div className="bg-blue-100 min-h-screen p-8">
            <h1 className="text-2xl font-bold text-center mb-8">COVID-19 and Population Dashboard</h1>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
                <div className="w-full md:w-1/2">
                    <CountrySelector />
                </div>
                <div className="w-full md:w-1/3">
                    <DateRangePicker />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatCard type="Total Cases" value="5M" percentage="0.00%" />
                <StatCard type="Recoveries" value="4.2M" percentage="0.00%" />
                <StatCard type="Deaths" value="0.2M" percentage="0.00%" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <LineChartComponent />
                <PieChartComponent />
            </div>
        </div>
    );
};

export default Home;