import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState = {
    name: "",
    sprint: "",
    story: "",
    storyPoints: "",
    storyLink: "",
    department: "",
    assignedTo: "",
    startDate: "",
    endDate: "",
    reviewDate: "",
    comments: ""
};

const StoryForm = ({ onSubmit, editingStory, users = [] }) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (editingStory) {
            setFormData({ ...initialState, ...editingStory });
        }
    }, [editingStory]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.sprint || !formData.story || !formData.storyPoints || !formData.storyLink || !formData.department || !formData.comments) {
            toast.error("Please fill in all required fields");
            return;
        }
        if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            toast.error("Start date must be before end date");
            return;
        }
        onSubmit(formData);
        setFormData(initialState);
    };

    const departments = ["Backend", "Frontend", "DevOps",];

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 overflow-y-auto h-[450px] px-2 custom-scrollbar"
        >
            {Object.keys(initialState).map((key) => (
                <div key={key} className="flex flex-col">
                    <label
                        htmlFor={key}
                        className="text-sm font-medium text-gray-700 dark:text-zinc-300 capitalize mb-1.5"
                    >
                        {key.replace(/([A-Z])/g, " $1")}
                    </label>

                    {key === "department" ? (
                        <select
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    ) : key === "assignedTo" ? (
                        <select
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                            <option value="">Unassigned</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.username}>
                                    {user.username} ({user.role})
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            id={key}
                            name={key}
                            type={
                                key === "startDate" || key === "endDate" || key === "reviewDate"
                                    ? "date"
                                    : key === "storyLink"
                                        ? "url"
                                        : key === "storyPoints"
                                            ? "number"
                                            : "text"
                            }
                            value={formData[key]}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder={
                                key === "storyLink" ? "https://example.com" : `Enter ${key}`
                            }
                        />
                    )}
                </div>
            ))}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg mt-4"
            >
                {editingStory ? "Update Story" : "Add Story"}
            </button>
        </form>
    );
};

export default StoryForm;