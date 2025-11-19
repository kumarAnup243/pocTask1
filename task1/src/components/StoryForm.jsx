import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState = {
    name: "",
    sprint: "",
    story: "",
    link: "",
    department: "",
    startDate: "",
    endDate: "",
    reviewDate: "",
    comments: ""
};

const StoryForm = ({ onSubmit, editingStory }) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (editingStory) {
            setFormData({ ...initialState, ...editingStory });
        }
        console.log(editingStory);
    }, [editingStory]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.sprint || !formData.story || !formData.link || !formData.department || !formData.comments) {
            toast.error("Please fill in all required fields");
            return;
        }
        if (!formData.startDate && !formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
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
            className="space-y-4 overflow-y-auto h-[450px] px-4"
        >
            {Object.keys(initialState).map((key) => (
                <div key={key} className="flex flex-col">
                    <label
                        htmlFor={key}
                        className="text-sm text-gray-700 capitalize mb-1"
                    >
                        {key.replace(/([A-Z])/g, " $1")}
                    </label>

                    {key === "department" ? (
                        <select
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
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
                                    : key === "link"
                                        ? "url"
                                        : "text"
                            }
                            value={formData[key]}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={
                                key === "link" ? "https://example.com" : `Enter ${key}`
                            }
                        />
                    )}
                </div>
            ))}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                {editingStory ? "Update Story" : "Add Story"}
            </button>
        </form>
    );
};

export default StoryForm;