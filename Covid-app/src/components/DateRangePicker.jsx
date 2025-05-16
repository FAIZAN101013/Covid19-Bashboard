import React, { useState } from 'react';

const DateRangePicker = () => {
    const [dateRange, setDateRange] = useState('24-10-2022 - 08-12-2023');

    return (
        <div className="w-full">
            <div className="bg-white rounded-md p-2">
                <div className="text-sm text-gray-500 mb-1">Filter by Date Range</div>
                <div className="flex justify-between items-center cursor-pointer">
                    <span>{dateRange}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-400" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default DateRangePicker;