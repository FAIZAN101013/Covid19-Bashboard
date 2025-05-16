import React from 'react';

const StatCard = ({ type, value, percentage, bgColor }) => {
    let cardStyles = '';

    switch (type) {
        case 'Total Cases':
            cardStyles = 'bg-blue-200';
            break;
        case 'Recoveries':
            cardStyles = 'bg-green-400';
            break;
        case 'Deaths':
            cardStyles = 'bg-red-400';
            break;
        default:
            cardStyles = 'bg-gray-200';
    }

    return (
        <div className="flex">
            <div className={`${bgColor || cardStyles} rounded-l-lg p-4 flex-1`}>
                <div className="font-bold">{type}</div>
                <div className="text-xs text-gray-600">{percentage || '0.00%'}</div>
            </div>
            <div className="bg-white rounded-r-lg p-4 flex items-center justify-center">
                <span className="font-bold text-xl">{value}</span>
            </div>
        </div>
    );
};

export default StatCard;