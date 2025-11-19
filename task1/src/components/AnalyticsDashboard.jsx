import SprintPointsChart from "../graphs/SprintPointsChart.jsx";
import {departmentData, sprintPointsData, totalCountOfDepartments} from "../data/dummyData.js";
import DepartmentPieChart from "../graphs/DepartmentPieChart.jsx";

const AnalyticsDashboard = () => {
    return (
        <div>
            <h1 className="text-lg font-semibold mb-6 text-center text-gray-800">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <SprintPointsChart data={sprintPointsData}/>
                </div>
                <div className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                    <DepartmentPieChart data={departmentData} totalCount={totalCountOfDepartments}/>
                </div>
            </div>
        </div>

    );
}

export default AnalyticsDashboard;