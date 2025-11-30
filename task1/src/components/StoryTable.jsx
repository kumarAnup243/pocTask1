const StoryTable = ({ stories, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-200">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
                <thead className="bg-gray-50 dark:bg-zinc-950/50">
                    <tr>
                        {["Name", "Sprint", "Story", "StoryPoints", "Link", "Dept", "Assigned To", "Status", "Start", "End", "Review", "Comments", "Actions"].map((header) => (
                            <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-zinc-300 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                    {stories.map((story) => (
                        <tr key={story.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors duration-150">
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-semibold">{story.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400">{story.sprint}</td>
                            <td className="px-6 py-4 text-sm text-gray-800 dark:text-zinc-200">{story.story}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-zinc-300 text-center">
                                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                                    {story.storyPoints}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <a href={story.storyLink} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors font-medium">Link</a>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400">{story.department}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400">
                                {story.assignedTo ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800">
                                        {story.assignedTo}
                                    </span>
                                ) : (
                                    <span className="text-gray-400 dark:text-zinc-600 italic">Unassigned</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400 whitespace-nowrap">{story.status}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400 whitespace-nowrap">{story.startDate}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400 whitespace-nowrap">{story.endDate}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400 whitespace-nowrap">{story.reviewDate}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-zinc-400 max-w-xs truncate" title={story.comments}>{story.comments}</td>
                            <td className="px-6 py-4 text-sm space-x-3 whitespace-nowrap">
                                <button onClick={() => onEdit(story)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">Edit</button>
                                <button onClick={() => onDelete(story.id)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium transition-colors">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StoryTable;
