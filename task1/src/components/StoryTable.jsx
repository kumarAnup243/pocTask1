const StoryTable = ({ stories, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {["Name", "Sprint", "Story", "Link", "Dept", "Start", "End", "Review", "Comments", "Actions"].map((header) => (
                        <th key={header} className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {stories.map((story) => (
                    <tr key={story.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-2 text-sm">{story.name}</td>
                        <td className="px-4 py-2 text-sm">{story.sprint}</td>
                        <td className="px-4 py-2 text-sm">{story.story}</td>
                        <td className="px-4 py-2 text-sm text-blue-600 underline cursor-pointer">
                            <a href={story.storyLink} target="_blank" rel="noreferrer">Link</a>
                        </td>
                        <td className="px-4 py-2 text-sm">{story.department}</td>
                        <td className="px-4 py-2 text-sm">{story.startDate}</td>
                        <td className="px-4 py-2 text-sm">{story.endDate}</td>
                        <td className="px-4 py-2 text-sm">{story.reviewDate}</td>
                        <td className="px-4 py-2 text-sm">{story.comments}</td>
                        <td className="px-4 py-2 text-sm space-x-2">
                            <button onClick={() => onEdit(story)} className="text-indigo-600 hover:underline">Edit</button>
                            <button onClick={() => onDelete(story.id)} className="text-red-500 hover:underline">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default StoryTable;
