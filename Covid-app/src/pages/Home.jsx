import React, { useState, useEffect } from 'react';
import CountrySelector from '../components/CountrySelector';
import StatCard from '../components/StatCard';
import LineChartComponent from '../components/LineChart';
import PieChartComponent from '../components/PieChart';
import DateRangePicker from '../components/DateRangePicker';
import { fetchCovidHistory } from '../services/covidApi';

const Home = () => {
    const [selectedCountry, setSelectedCountry] = useState('usa');
    const [covidData, setCovidData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCovidData = async () => {
            try {
                setLoading(true);
                const data = await fetchCovidHistory(selectedCountry);
                setCovidData(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch COVID-19 data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCovidData();
    }, [selectedCountry]);

    const handleCountryChange = (countryCode) => {
        setSelectedCountry(countryCode);
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div className="bg-blue-100 min-h-screen p-8">
            <h1 className="text-2xl font-bold text-center mb-8">COVID-19 and Population Dashboard</h1>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
                <div className="w-full md:w-1/2">
                    <CountrySelector onCountrySelect={handleCountryChange} />
                </div>
                <div className="w-full md:w-1/3">
                    <DateRangePicker />
                </div>
            </div>

            {/* Stats Cards */}
            {covidData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <StatCard 
                        type="Total Cases" 
                        value={covidData.timeline.cases[Object.keys(covidData.timeline.cases).pop()].toLocaleString()} 
                        percentage="0.00%" 
                    />
                    <StatCard 
                        type="Recoveries" 
                        value={covidData.timeline.recovered[Object.keys(covidData.timeline.recovered).pop()].toLocaleString()} 
                        percentage="0.00%" 
                    />
                    <StatCard 
                        type="Deaths" 
                        value={covidData.timeline.deaths[Object.keys(covidData.timeline.deaths).pop()].toLocaleString()} 
                        percentage="0.00%" 
                    />
                </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <LineChartComponent data={covidData?.timeline} />
                <PieChartComponent data={covidData?.timeline} />
            </div>
            
            {/*Footer*/}
            <div className="mt-8 text-center">
                <p>Created By Faizan</p>
            </div>
        </div>
    );
};

export default Home;