import { useState, useEffect } from "react";

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
        onSubmit(formData);
        setFormData(initialState);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto h-[450px] px-4">
            {Object.keys(initialState).map((key) => (
                <div key={key} className="flex flex-col">
                    <label htmlFor={key} className="text-sm text-gray-700 capitalize mb-1">
                        {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                        id={key}
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Enter ${key}`}
                    />
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
