import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const SprintPointsChart = ({ data }) => {
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
    const { theme } = useTheme();

    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 p-3 rounded-lg shadow-lg text-center transition-colors duration-200">
                    <p className="font-bold text-gray-900 dark:text-white mb-1">{label}</p>
                    <p className="text-sm text-gray-600 dark:text-zinc-300">{`Total Story Points: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    const axisColor = theme === 'dark' ? '#E4E4E7' : '#374151'; // zinc-200 : gray-700

    return (
        <>
            {data.length > 0 ? <div className="p-2 rounded-lg mx-auto w-full" style={{ width: '100%', height: '345px' }}>
                <h2 className="md:text-xl mb-4 font-bold text-center text-gray-900 dark:text-white">Story Points Graph</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 5, left: -18, bottom: 25 }}
                        barGap={5}
                        barSize={60}
                        animationDuration={800}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#3f3f46' : '#e5e7eb'} />
                        <XAxis
                            dataKey="sprint"
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
                            tickCount={6}
                            tick={{ fill: axisColor, fontSize: 12 }}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                        />
                        <Bar
                            dataKey="totalPoints"
                            onMouseEnter={(data, index) => setHoveredBarIndex(index)}
                            onMouseLeave={() => setHoveredBarIndex(null)}
                            radius={[4, 4, 0, 0]}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === hoveredBarIndex ? "#2563EB" : "#3B82F6"} // blue-600 : blue-500
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div> : <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-4 h-96 flex items-center justify-center border border-dashed border-gray-300 dark:border-zinc-700">
                <p className="text-lg font-medium text-gray-500 dark:text-zinc-400">
                    No data available.
                </p>
            </div>}
        </>

    );
};

export default SprintPointsChart;
