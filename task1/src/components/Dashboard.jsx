import { useEffect, useReducer, useState, useMemo, useCallback } from "react";
import { storyReducer } from "../reducers/storyReducer";
import { mockStories } from "../data/dummyData.js";
import { useUserContext } from "../context/UserContext";
import StoryForm from "./StoryFrom.jsx";
import StoryTable from "./StoryTable";

const Dashboard = () => {
    const [stories, dispatch] = useReducer(storyReducer, []);
    const [editingStory, setEditingStory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { currentUser, logout } = useUserContext();

    useEffect(() => {
        dispatch({ type: "LOAD_STORIES", payload: mockStories });
    }, []);

    const handleAdd = useCallback((story) => {
        dispatch({
            type: "ADD_STORY",
            payload: { ...story, id: Date.now(), createdBy: currentUser?.username || "unknown" }
        });
        setShowModal(false);
    }, [currentUser]);

    const handleUpdate = useCallback((story) => {
        dispatch({ type: "UPDATE_STORY", payload: story });
        setEditingStory(null);
        setShowModal(false);
    }, []);

    const handleDelete = useCallback((id) => {
        dispatch({ type: "DELETE_STORY", payload: id });
    }, []);

    const sortedStories = useMemo(() => [...stories].sort((a, b) => new Date(a.startDate) - new Date(b.startDate)), [stories]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">Team Story Board</h1>
                    <button
                        onClick={() => {
                            logout();
                        }}
                        className="bg-blue-600 text-white px-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        Logout
                    </button>
                </div>

                <button
                    onClick={() => {
                        setEditingStory(null);
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    Add Story
                </button>
            </div>

            <StoryTable stories={sortedStories} onEdit={(story) => {
                setEditingStory(story);
                setShowModal(true);
            }} onDelete={handleDelete} />

            {showModal && (
                <div className="fixed inset-0 bg-opacity-40 backdrop-blur-md flex items-center justify-center z-50 border-0 border-amber-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 animate-fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {editingStory ? "Edit Story" : "Add Story"}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-white text-xl bg-blue-600 cursor-pointer rounded-full w-8 h-8"
                            >
                                &times;
                            </button>
                        </div>
                        <StoryForm onSubmit={editingStory ? handleUpdate : handleAdd} editingStory={editingStory} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
