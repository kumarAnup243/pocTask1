import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const UserStoriesChart = ({ data }) => {
    const { theme } = useTheme();

    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 p-3 rounded-lg shadow-lg text-center transition-colors duration-200">
                    <p className="font-bold text-gray-900 dark:text-white mb-1">{label}</p>
                    <p className="text-sm text-gray-600 dark:text-zinc-300">{`Stories Assigned: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    const axisColor = theme === 'dark' ? '#E4E4E7' : '#374151'; // zinc-200 : gray-700

    return (
        <>
            {data.length > 0 ? <div className="p-2 rounded-lg mx-auto w-full">
                <h2 className="md:text-xl mb-4 font-bold text-center text-gray-900 dark:text-white">Stories per User</h2>
                <div className="overflow-x-auto pb-2 custom-scrollbar">
                    <div style={{ minWidth: '100%', width: `${Math.max(600, data.length * 120)}px`, height: '345px' }}>
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <LineChart
                                data={data}
                                margin={{ top: 10, right: 30, left: 0, bottom: 25 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#3f3f46' : '#e5e7eb'} />
                                <XAxis
                                    dataKey="username"
                                    tickFormatter={(value) => value.length > 8 && window.innerWidth < 768 ? `${value.substring(0, 6)}..` : value}
                                    tick={{
                                        fill: axisColor,
                                        fontSize: window.innerWidth < 768 ? 10 : 12,
                                        dy: 10,
                                        textAnchor: 'middle',
                                    }}
                                    tickMargin={4}
                                    interval={0}
                                    axisLine={{ stroke: theme === 'dark' ? '#52525b' : '#d1d5db' }}
                                    tickLine={false}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                    tick={{ fill: axisColor, fontSize: 12 }}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ stroke: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#8B5CF6" // violet-500
                                    strokeWidth={3}
                                    dot={{ r: 6, fill: "#8B5CF6", strokeWidth: 2, stroke: theme === 'dark' ? '#18181b' : '#fff' }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div> : <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-4 h-96 flex items-center justify-center border border-dashed border-gray-300 dark:border-zinc-700">
                <p className="text-lg font-medium text-gray-500 dark:text-zinc-400">
                    No data available.
                </p>
            </div>}
        </>
    );
};

export default UserStoriesChart;
