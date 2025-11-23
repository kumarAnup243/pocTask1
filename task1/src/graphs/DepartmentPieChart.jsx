import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { useTheme } from "../context/ThemeContext";

const DepartmentPieChart = ({ data, totalCount }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [centerText, setCenterText] = useState(`Total: ${totalCount}`);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { theme } = useTheme();

    const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']; // blue-500, emerald-500, amber-500, red-500

    // Custom function to "lift" the hovered pie slice
    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 5} // Lift the hovered segment
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

    const onPieEnter = (_, index) => {
        if (data[index]) {
            const { department, total } = data[index];
            setActiveIndex(index)
            setCenterText(`${department}: ${total}`);
        }
    };

    const onPieLeave = () => {
        setActiveIndex(null);
        setCenterText(`Total: ${totalCount}`);
    };

    const getRadius = () => {
        if (windowWidth >= 1024) { // For large screens
            return { innerRadius: 90, outerRadius: 110 };
        }
        return { innerRadius: 70, outerRadius: 90 };
    };

    const { innerRadius, outerRadius } = getRadius();

    return (
        <div className="rounded-lg">
            {data.length > 0 ? <div className="rounded-lg p-4">
                <h2 className="md:text-xl text-center font-bold mb-4 text-gray-900 dark:text-white">Department Pie Chart</h2>
                <div className="flex flex-col md:flex-row items-center space-x-6">
                    {/* Pie Chart */}
                    <div className="relative w-full md:w-1/2 flex items-center justify-center h-[250px] lg:h-[345px]">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={innerRadius}
                                    outerRadius={outerRadius}
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    dataKey="total"
                                    onMouseEnter={onPieEnter}
                                    onMouseLeave={onPieLeave}
                                    stroke={theme === 'dark' ? '#18181b' : '#fff'} // zinc-900 : white
                                    strokeWidth={2}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Centered text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <p className="md:text-xl font-bold text-gray-800 dark:text-white transition-colors duration-200">{centerText}</p>
                        </div>
                    </div>

                    {/* List of devices and colors */}
                    <div className="flex flex-col justify-center items-start space-y-3">
                        <ul className="space-y-2">
                            {data.map((entry, index) => (
                                <li key={index} className="flex items-center space-x-3">
                                    <span
                                        className="inline-block w-3 h-3 rounded-full shadow-sm"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    ></span>
                                    <span className="font-medium text-gray-700 dark:text-zinc-300 text-sm">{entry.department}</span>
                                    <span className="font-bold text-gray-900 dark:text-white text-sm">{entry.total}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div> : <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-4 h-96 flex items-center justify-center border border-dashed border-gray-300 dark:border-zinc-700">
                <p className="text-lg font-medium text-gray-500 dark:text-zinc-400">
                    No data available.
                </p>
            </div>}
        </div>
    );
};

export default DepartmentPieChart;