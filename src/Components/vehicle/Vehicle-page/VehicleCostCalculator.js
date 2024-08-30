import React, { useState } from 'react';

const suvData = [
    { state: "Florida", calculatedRate: 500 },
    { state: "Georgia", calculatedRate: 660 },
    { state: "South Carolina", calculatedRate: 500 },
    // Add more SUV data here
];

const atvData = [
    { state: "Alabama", calculatedRate: 640 },
    { state: "North Carolina", calculatedRate: 700 },
    { state: "Tennessee", calculatedRate: 950 },
    // Add more ATV data here
];

const heavyMachineryData = [
    { state: "Kentucky", calculatedRate: 950 },
    { state: "Mississippi", calculatedRate: 850 },
    { state: "Louisiana", calculatedRate: 900 },
    // Add more Heavy Machinery data here
];

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [finalBid, setFinalBid] = useState('');
    const [category, setCategory] = useState('SUV');

    const handleSelection = (item) => {
        setSelectedItem(item);
        // setIsOpen(false); // Close the dropdown after selection
    };

    const handleBidChange = (e) => {
        const bid = parseFloat(e.target.value) || 0;
        setFinalBid(bid || "");
    };

     const calculateTotal = () => {
        const rate = selectedItem ? selectedItem.calculatedRate : 0;
        return rate + finalBid;
    };

    const getCategoryData = () => {
        switch (category) {
            case 'ATV':
                return atvData;
            case 'Heavy Machinery':
                return heavyMachineryData;
            case 'SUV':
            default:
                return suvData;
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto mt-8">
            <div className="flex justify-between mb-4">
                <button
                    onClick={() => setCategory('SUV')}
                    className={`px-4 py-2 rounded ${category === 'SUV' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    SUV
                </button>
                <button
                    onClick={() => setCategory('ATV')}
                    className={`px-4 py-2 rounded ${category === 'ATV' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    ATV
                </button>
                <button
                    onClick={() => setCategory('Heavy Machinery')}
                    className={`px-4 py-2 rounded ${category === 'Heavy Machinery' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Heavy Machinery
                </button>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-500 text-white py-2 px-4 rounded w-full text-left focus:outline-none"
            >
                {isOpen ? `Close Rates ${selectedItem.state ? selectedItem.state : "" }` : `open Rates ${selectedItem.state ? selectedItem.state : "" }` }
            </button>

            {isOpen && (
                <div className="mt-2 bg-white shadow-lg rounded-lg overflow-hidden">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-4 py-2">State</th>
                                <th className="text-left px-4 py-2">Calculated Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getCategoryData().map((item, index) => (
                                <tr
                                    key={index}
                                    className={`border-t cursor-pointer ${selectedItem === item ? 'bg-blue-100' : ''}`}
                                    onClick={() => handleSelection(item)}
                                >
                                    <td className="px-4 py-2">{item.state}</td>
                                    <td className="px-4 py-2">${item.calculatedRate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

<div className="mt-4 bg-gray-100 p-4 rounded">
                <h3 className="text-lg font-bold">Total Price: ${calculateTotal()}</h3>
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Enter Your Final Bid</label>
                    <input
                        type="number"
                        value={finalBid}
                        onChange={handleBidChange}
                        placeholder="Enter bid amount"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
