import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse } from 'date-fns';

const DateRangePicker = ({ onDateRangeSelect }) => {
    const defaultStartDate = parse('24-10-2022', 'dd-MM-yyyy', new Date());
    const defaultEndDate = parse('08-12-2023', 'dd-MM-yyyy', new Date());

    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    // Call onDateRangeSelect with default dates on mount
    useEffect(() => {
        if (startDate && endDate) {
            onDateRangeSelect([startDate, endDate]);
        }
    }, [startDate, endDate, onDateRangeSelect]);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        // onDateRangeSelect is called in useEffect when dates state updates
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded-md p-2">
                <div className="text-sm text-gray-500 mb-1">Filter by Date Range</div>
                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDateChange}
                    isClearable={true}
                    dateFormat="dd-MM-yyyy"
                    className="cursor-pointer"
                    placeholderText="Select a date range"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;