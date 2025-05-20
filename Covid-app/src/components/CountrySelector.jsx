import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { fetchCountries } from '../services/countriesApi';

const CountrySelector = ({ onCountrySelect }) => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const data = await fetchCountries();
                setCountries(data);
            } catch (error) {
                console.error('Failed to fetch countries:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCountries();
    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCountryClick = (countryCode) => {
        onCountrySelect(countryCode);
        setShowDropdown(false);
        setSearchTerm('');
    };

    return (
        <div className="relative w-full">
            <div className="bg-white rounded-full flex items-center px-4 py-2 shadow">
                <Search size={20} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search Country"
                    className="bg-transparent border-none outline-none w-full px-2"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                />
                <div 
                    className="cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </div>
            </div>

            {showDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center">Loading countries...</div>
                    ) : filteredCountries.length === 0 ? (
                        <div className="p-4 text-center">No countries found</div>
                    ) : (
                        filteredCountries.map((country) => (
                            <div
                                key={country.code}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleCountryClick(country.code)}
                            >
                                {country.name}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CountrySelector;