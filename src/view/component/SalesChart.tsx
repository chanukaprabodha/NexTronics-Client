import React from 'react';

const SalesChart: React.FC = () => {
    const data = [
        { day: 'Mon', sales: 65 },
        { day: 'Tue', sales: 78 },
        { day: 'Wed', sales: 52 },
        { day: 'Thu', sales: 94 },
        { day: 'Fri', sales: 88 },
        { day: 'Sat', sales: 76 },
        { day: 'Sun', sales: 82 },
    ];

    const maxValue = Math.max(...data.map(item => item.sales));

    return (
        <div className="w-full">
            <div className="flex items-end justify-between h-64 px-2">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        <div
                            className="bg-blue-500 hover:bg-blue-600 rounded-t-md w-8 transition-all duration-300 cursor-pointer relative group"
                            style={{ height: `${(item.sales / maxValue) * 200}px` }}
                        >
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                ${item.sales}k
                            </div>
                        </div>
                        <span className="text-xs text-gray-600 mt-2">{item.day}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-4 px-2">
                <span>$0</span>
                <span>${Math.round(maxValue / 2)}k</span>
                <span>${maxValue}k</span>
            </div>
        </div>
    );
};

export default SalesChart;