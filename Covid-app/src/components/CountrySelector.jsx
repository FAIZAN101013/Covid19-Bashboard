import React from 'react';
import { Search } from 'lucide-react';

const CountrySelector = () => {
    return (
        <div className="relative w-full">
            <div className="bg-white rounded-full flex items-center px-4 py-2 shadow">
                <Search size={20} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search Country"
                    className="bg-transparent border-none outline-none w-full px-2"
                />
                <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default CountrySelector;