import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell} from "recharts";
import {useState} from "react";

const SprintPointsChart = ({ data }) => {
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-300 p-2 rounded shadow-md text-center">
                    <p className="font-medium">{label}</p>
                    <p>{`Total Story Points: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {data.length > 0 ? <div className="p-2 rounded-lg mx-auto w-full" style={{width: '100%', height: '345px'}}>
                <h2 className="md:text-xl mb-4 font-bold text-center">Story Points Graph</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{top: 10, right: 5, left: -18, bottom: 25}}
                        barGap={5} // Reduce gap between bars
                        barSize={60} // Increase bar width
                        animationDuration={800}
                    >
                        <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false}/>
                        <XAxis
                            dataKey="sprint"
                            tickFormatter={(value) => value.length > 8 && window.innerWidth < 768 ? `${value.substring(0, 6)}..` : value}
                            tick={{
                                fontSize: window.innerWidth < 768 ? 8 : 12,
                                dy: 6,
                                textAnchor: 'middle',
                            }}
                            tickMargin={4}
                            interval={0}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickCount={6}
                        />
                        <Tooltip
                            content={<CustomTooltip/>}
                            cursor={false} // Disable background highlight on hover
                        />
                        <Bar
                            dataKey="totalPoints"
                            onMouseEnter={(data, index) => setHoveredBarIndex(index)}
                            onMouseLeave={() => setHoveredBarIndex(null)}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index === hoveredBarIndex ? "#00C49F" : "#0088FE"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div> : <div className="bg-gray-200 rounded-lg p-4 h-96 flex items-center justify-center">
                <p className="text-lg font-semibold">
                    No data available.
                </p>
            </div>}
        </>

    );
};

export default SprintPointsChart;
