import React, { useState, useEffect } from 'react';
import CountrySelector from '../components/CountrySelector';
import StatCard from '../components/StatCard';
import LineChartComponent from '../components/LineChart';
import PieChartComponent from '../components/PieChart';
import DateRangePicker from '../components/DateRangePicker';
import { fetchCovidHistory } from '../services/covidApi';
import { fetchCountries } from '../services/countriesApi';
import { parseISO, isWithinInterval, format, parse, startOfDay, endOfDay } from 'date-fns';

const Home = () => {
    const defaultStartDate = parse('24-10-2022', 'dd-MM-yyyy', new Date());
    const defaultEndDate = parse('08-12-2023', 'dd-MM-yyyy', new Date());

    const [selectedCountry, setSelectedCountry] = useState('usa');
    const [covidData, setCovidData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState([defaultStartDate, defaultEndDate]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const data = await fetchCountries();
                setCountries(data);
            } catch (error) {
                console.error('Failed to fetch countries:', error);
            }
        };

        loadCountries();
    }, []);

    useEffect(() => {
        const loadCovidData = async () => {
            try {
                setLoading(true);
                // Fetch all historical data to allow filtering by any date range
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

    const handleDateRangeSelect = (dates) => {
        setDateRange(dates);
    };

    const filterDataByDateRange = (data, startDate, endDate) => {
        if (!data || !data.timeline || !startDate || !endDate) return null;

        const start = startOfDay(startDate);
        const end = endOfDay(endDate);

        const filteredTimeline = {};
        const startDateStats = { cases: 0, recovered: 0, deaths: 0 };
        const endDateStats = { cases: 0, recovered: 0, deaths: 0 };

        for (const key in data.timeline) {
            filteredTimeline[key] = Object.fromEntries(
                Object.entries(data.timeline[key]).filter(([dateString]) => {
                    const date = parseISO(formatDateForParsing(dateString));
                    return isWithinInterval(date, { start: start, end: end });
                })
            );

            const datesInFilteredTimeline = Object.keys(filteredTimeline[key]);
            if (datesInFilteredTimeline.length > 0) {
                // Find the closest date to the start date within the filtered data
                const closestStartDate = datesInFilteredTimeline.reduce((prev, curr) => {
                    const prevDate = parseISO(formatDateForParsing(prev));
                    const currDate = parseISO(formatDateForParsing(curr));
                    return Math.abs(currDate - start) < Math.abs(prevDate - start) ? curr : prev;
                });
                 startDateStats[key] = filteredTimeline[key][closestStartDate];

                // The end date in the filtered data is simply the last key
                const latestDateInFilteredData = datesInFilteredTimeline[datesInFilteredTimeline.length - 1];
                endDateStats[key] = filteredTimeline[key][latestDateInFilteredData];

            } else {
                 // If no data in the range, set stats to 0
                 startDateStats[key] = 0;
                 endDateStats[key] = 0;
            }
        }

         // Calculate percentages
         const percentageChange = {};
         for(const key in endDateStats) {
             const startValue = startDateStats[key];
             const endValue = endDateStats[key];
             if (startValue === 0) {
                 percentageChange[key] = endValue > 0 ? 100 : 0; // Handle division by zero
             } else {
                 percentageChange[key] = ((endValue - startValue) / startValue) * 100;
             }
         }

        return { ...data, timeline: filteredTimeline, startDateStats, endDateStats, percentageChange };
    };

    const formatDateForParsing = (dateString) => {
        // Convert MM/DD/YY to YYYY-MM-DD for reliable parsing
        const [month, day, year] = dateString.split('/');
        const fullYear = parseInt(year) + 2000; // Assuming 20xx years
        return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const [startDate, endDate] = dateRange;
    const filteredCovidData = filterDataByDateRange(covidData, startDate, endDate);

    const selectedCountryName = countries.find(country => country.code === selectedCountry)?.name || selectedCountry;

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    // Determine the stats and percentages to display
    const statsToDisplay = filteredCovidData?.endDateStats || { cases: 0, recovered: 0, deaths: 0 };
    const percentagesToDisplay = filteredCovidData?.percentageChange || { cases: 0, recovered: 0, deaths: 0 };

    console.log('Recovery Stats:', statsToDisplay.recovered);
    console.log('Recovery Percentage:', percentagesToDisplay.recovered);

    return (
        <div className="bg-blue-100 min-h-screen p-8">
            <h1 className="text-2xl font-bold text-center mb-8">COVID-19 and Population Dashboard</h1>

            {/* Selected Country Display */}
            <div className="text-xl font-semibold text-center mb-4">{selectedCountryName}</div>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
                <div className="w-full md:w-1/2">
                    <CountrySelector onCountrySelect={handleCountryChange} />
                </div>
                <div className="w-full md:w-1/3">
                    <DateRangePicker onDateRangeSelect={handleDateRangeSelect} />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <StatCard 
                    type="Total Cases" 
                    value={statsToDisplay.cases.toLocaleString()} 
                    percentage={`${percentagesToDisplay.cases.toFixed(2)}%`} 
                />
                <StatCard 
                    type="Recoveries" 
                    value={statsToDisplay.recovered.toLocaleString()} 
                    percentage={`${percentagesToDisplay.recovered.toFixed(2)}%`} 
                />
                <StatCard 
                    type="Deaths" 
                    value={statsToDisplay.deaths.toLocaleString()} 
                    percentage={`${percentagesToDisplay.deaths.toFixed(2)}%`} 
                />
            </div>

            {/* Charts */}
            {filteredCovidData?.timeline && Object.keys(filteredCovidData.timeline.cases).length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <LineChartComponent data={filteredCovidData?.timeline} />
                    <PieChartComponent data={filteredCovidData?.timeline} />
                </div>
            )}

            {/*Footer*/}
            <div className="mt-8 text-center">
                <p>Created By Faizan</p>
            </div>
        </div>
    );
};

export default Home;