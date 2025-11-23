import { useEffect, useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";

import { useUserContext } from "../context/UserContext";
import StoryForm from "./StoryForm.jsx";
import StoryTable from "./StoryTable";
import AnalyticsDashboard from "./AnalyticsDashboard.jsx";
import Navbar from "./Navbar.jsx";
import storyService from "../services/storyService";
import userService from "../services/userService";

const Dashboard = () => {
    const [stories, setStories] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingStory, setEditingStory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showMyStories, setShowMyStories] = useState(false);
    const { currentUser, logout } = useUserContext();

    const loadStories = useCallback(async () => {
        try {
            const data = await storyService.getAllStories();
            setStories(data);
        } catch (error) {
            console.error("Failed to load stories", error);
            toast.error("Failed to load stories");
        }
    }, []);

    const loadUsers = useCallback(async () => {
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to load users", error);
        }
    }, []);

    useEffect(() => {
        loadStories();
        loadUsers();
    }, [loadStories, loadUsers]);

    const handleAdd = useCallback(async (story) => {
        try {
            await storyService.createStory(story);
            toast.success("Story added successfully");
            setShowModal(false);
            loadStories();
        } catch (error) {
            console.error("Failed to add story", error);
            toast.error("Failed to add story");
        }
    }, [loadStories]);

    const handleUpdate = useCallback(async (story) => {
        try {
            await storyService.updateStory(story.id, story);
            toast.success("Story updated successfully");
            setEditingStory(null);
            setShowModal(false);
            loadStories();
        } catch (error) {
            console.error("Failed to update story", error);
            toast.error("Failed to update story");
        }
    }, [loadStories]);

    const handleDelete = useCallback(async (id) => {
        if (window.confirm("Are you sure you want to delete this story?")) {
            try {
                await storyService.deleteStory(id);
                toast.success("Story deleted successfully");
                loadStories();
            } catch (error) {
                console.error("Failed to delete story", error);
                toast.error("Failed to delete story");
            }
        }
    }, [loadStories]);

    const filteredStories = useMemo(() => {
        let filtered = stories;

        if (showMyStories && currentUser) {
            filtered = filtered.filter(story => story.assignedTo === currentUser.username);
        }

        return filtered.filter(story => {
            const query = searchQuery.toLowerCase();
            return (
                story.name.toLowerCase().includes(query) ||
                story.sprint.toLowerCase().includes(query) ||
                story.department.toLowerCase().includes(query) ||
                story.story.toLowerCase().includes(query) ||
                (story.assignedTo && story.assignedTo.toLowerCase().includes(query))
            );
        }).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }, [stories, searchQuery, showMyStories, currentUser]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-200">
            <Navbar
                onSearch={setSearchQuery}
                onAddStory={() => {
                    setEditingStory(null);
                    setShowModal(true);
                }}
                showAnalytics={showAnalytics}
                setShowAnalytics={setShowAnalytics}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setShowMyStories(!showMyStories)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border ${showMyStories
                                ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                                : "bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                            }`}
                    >
                        {showMyStories ? "Show All Stories" : "My Stories"}
                    </button>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 transition-colors duration-200">
                    {!showAnalytics && <StoryTable stories={filteredStories} onEdit={(story) => {
                        setEditingStory(story);
                        setShowModal(true);
                    }} onDelete={handleDelete} />}

                    {showAnalytics && <AnalyticsDashboard />}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl p-8 transform transition-all scale-100">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-zinc-800 pb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {editingStory ? "Edit Story" : "New Story"}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <StoryForm onSubmit={editingStory ? handleUpdate : handleAdd} editingStory={editingStory} users={users} />
                    </div>
                </div>
            )}
        </div>
    );

};

export default Dashboard;
