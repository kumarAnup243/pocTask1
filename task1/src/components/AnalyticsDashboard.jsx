import { useEffect, useState, useMemo } from "react";
import SprintPointsChart from "../graphs/SprintPointsChart.jsx";
import DepartmentPieChart from "../graphs/DepartmentPieChart.jsx";
import UserStoriesChart from "../graphs/UserStoriesChart.jsx";
import storyService from "../services/storyService";
import userService from "../services/userService";
import { Loader2, Users, Layers } from "lucide-react";

const AnalyticsDashboard = () => {
    const [stories, setStories] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [storiesData, usersData] = await Promise.all([
                    storyService.getAllStories(),
                    userService.getAllUsers()
                ]);
                setStories(storiesData);
                setUsers(usersData);
            } catch (error) {
                console.error("Failed to load analytics data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const sprintPointsData = useMemo(() => {
        const sprintMap = {};
        stories.forEach(story => {
            if (story.sprint && story.storyPoints) {
                sprintMap[story.sprint] = (sprintMap[story.sprint] || 0) + story.storyPoints;
            }
        });
        return Object.keys(sprintMap).map(sprint => ({
            sprint,
            totalPoints: sprintMap[sprint]
        })).sort((a, b) => a.sprint.localeCompare(b.sprint));
    }, [stories]);

    const departmentData = useMemo(() => {
        const deptMap = {};
        stories.forEach(story => {
            if (story.department) {
                deptMap[story.department] = (deptMap[story.department] || 0) + 1;
            }
        });
        return Object.keys(deptMap).map(department => ({
            department,
            total: deptMap[department]
        }));
    }, [stories]);

    const userStoriesData = useMemo(() => {
        const userMap = {};
        stories.forEach(story => {
            const assignee = story.assignedTo || "Unassigned";
            userMap[assignee] = (userMap[assignee] || 0) + 1;
        });
        return Object.keys(userMap).map(username => ({
            username,
            count: userMap[username]
        }));
    }, [stories]);

    const totalCountOfDepartments = useMemo(() => {
        return departmentData.length;
    }, [departmentData]);

    const totalMembers = users.length;

    console.log("Analytics Debug - Total Members:", totalMembers);
    console.log("Analytics Debug - Users List:", users);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white tracking-tight">Analytics Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Total Members</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalMembers}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 flex items-center space-x-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                        <Layers className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">Total Departments</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCountOfDepartments}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                    <SprintPointsChart data={sprintPointsData} />
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300">
                    <DepartmentPieChart data={departmentData} totalCount={departmentData.reduce((acc, curr) => acc + curr.total, 0)} />
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 md:col-span-2">
                    <UserStoriesChart data={userStoriesData} />
                </div>
            </div>
        </div >
    );
}

export default AnalyticsDashboard;