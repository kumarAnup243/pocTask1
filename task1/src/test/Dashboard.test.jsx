import { jest, test, expect, afterEach, beforeEach } from '@jest/globals';
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import storyService from "../services/storyService";
import userService from "../services/userService";
import toast from "react-hot-toast";

// Mock dependencies
jest.mock("../services/storyService");
jest.mock("../services/userService");
jest.mock("react-hot-toast", () => ({
    __esModule: true,
    default: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

// Mock Context
const mockLogout = jest.fn();
const mockCurrentUser = { username: "testuser", role: "admin" };

jest.mock("../context/UserContext", () => ({
    useUserContext: () => ({
        currentUser: mockCurrentUser,
        logout: mockLogout,
    }),
}));

// Mock Child Components
jest.mock("../components/Navbar", () => ({ onSearch, onAddStory, showAnalytics, setShowAnalytics }) => (
    <div data-testid="navbar">
        <button onClick={onAddStory}>Add Story</button>
        <button onClick={() => setShowAnalytics(!showAnalytics)}>Toggle Analytics</button>
        <input data-testid="search-input" onChange={(e) => onSearch(e.target.value)} />
    </div>
));

jest.mock("../components/StoryTable", () => ({ stories, onEdit, onDelete }) => (
    <div data-testid="story-table">
        {stories.map(s => (
            <div key={s.id} data-testid="story-item">
                {s.name}
                <button onClick={() => onEdit(s)}>Edit</button>
                <button onClick={() => onDelete(s.id)}>Delete</button>
            </div>
        ))}
    </div>
));

jest.mock("../components/AnalyticsDashboard", () => () => <div data-testid="analytics-dashboard">Analytics Dashboard</div>);

jest.mock("../components/StoryForm", () => ({ onSubmit, editingStory }) => (
    <div data-testid="story-form">
        <button onClick={() => onSubmit({ ...editingStory, name: "New Story" })}>Submit Form</button>
    </div>
));

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

const mockStories = [
    { id: 1, name: "Story 1", sprint: "Sprint 1", department: "Frontend", assignedTo: "testuser", startDate: "2024-01-01", story: "User Story 1" },
    { id: 2, name: "Story 2", sprint: "Sprint 1", department: "Backend", assignedTo: "otheruser", startDate: "2024-01-02", story: "User Story 2" },
];

const mockUsers = [{ id: 1, username: "testuser" }];

beforeEach(() => {
    storyService.getAllStories.mockResolvedValue(mockStories);
    userService.getAllUsers.mockResolvedValue(mockUsers);
});

test("renders dashboard and loads data", async () => {
    render(<Dashboard />);

    await waitFor(() => {
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("story-table")).toBeInTheDocument();
        expect(screen.getAllByTestId("story-item")).toHaveLength(2);
    });
});

test("toggles analytics view", async () => {
    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("navbar"));

    fireEvent.click(screen.getByText("Toggle Analytics"));

    expect(screen.getByTestId("analytics-dashboard")).toBeInTheDocument();
    expect(screen.queryByTestId("story-table")).not.toBeInTheDocument();
});

test("opens modal when Add Story is clicked", async () => {
    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("navbar"));

    fireEvent.click(screen.getByText("Add Story"));

    expect(screen.getByText("New Story")).toBeInTheDocument(); // Modal title
    expect(screen.getByTestId("story-form")).toBeInTheDocument();
});

test("filters stories by search query", async () => {
    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("story-table"));

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Story 1" } });

    expect(screen.getAllByTestId("story-item")).toHaveLength(1);
    expect(screen.getByText("Story 1")).toBeInTheDocument();
    expect(screen.queryByText("Story 2")).not.toBeInTheDocument();
});

test("filters stories by 'My Stories'", async () => {
    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("story-table"));

    fireEvent.click(screen.getByText("My Stories"));

    expect(screen.getAllByTestId("story-item")).toHaveLength(1);
    expect(screen.getByText("Story 1")).toBeInTheDocument(); // Assigned to testuser
    expect(screen.queryByText("Story 2")).not.toBeInTheDocument();
});

test("handles story creation", async () => {
    storyService.createStory.mockResolvedValue({});

    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("navbar"));

    // Open modal
    fireEvent.click(screen.getByText("Add Story"));

    // Submit form (mocked form calls onSubmit immediately on button click)
    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
        expect(storyService.createStory).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith("Story added successfully");
        // Should reload stories
        expect(storyService.getAllStories).toHaveBeenCalledTimes(2); // Initial + After create
    });
});

test("handles story deletion", async () => {
    // Mock window.confirm
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    storyService.deleteStory.mockResolvedValue({});

    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("story-table"));

    const deleteButtons = await screen.findAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
        expect(storyService.deleteStory).toHaveBeenCalledWith(1);
        expect(toast.success).toHaveBeenCalledWith("Story deleted successfully");
        expect(storyService.getAllStories).toHaveBeenCalledTimes(2);
    });
});

test("handles story update", async () => {
    storyService.updateStory.mockResolvedValue({});

    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("story-table"));

    const editButtons = await screen.findAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(screen.getByText("Edit Story")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
        expect(storyService.updateStory).toHaveBeenCalledWith(1, expect.objectContaining({ name: "New Story" }));
        expect(toast.success).toHaveBeenCalledWith("Story updated successfully");
        expect(storyService.getAllStories).toHaveBeenCalledTimes(2);
    });
});

test("cancels story deletion", async () => {
    jest.spyOn(window, 'confirm').mockImplementation(() => false);

    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("story-table"));

    const deleteButtons = await screen.findAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(storyService.deleteStory).not.toHaveBeenCalled();
});

test("handles load stories failure", async () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    storyService.getAllStories.mockRejectedValue(new Error("Failed"));

    render(<Dashboard />);

    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Failed to load stories");
    });

    consoleSpy.mockRestore();
});

test("handles create story failure", async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    storyService.createStory.mockRejectedValue(new Error("Failed"));

    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("navbar"));

    fireEvent.click(screen.getByText("Add Story"));
    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Failed to add story");
    });

    consoleSpy.mockRestore();
});

test("handles update story failure", async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    storyService.updateStory.mockRejectedValue(new Error("Failed"));

    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("story-table"));

    const editButtons = await screen.findAllByText("Edit");
    fireEvent.click(editButtons[0]);
    fireEvent.click(screen.getByText("Submit Form"));

    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Failed to update story");
    });

    consoleSpy.mockRestore();
});

test("handles delete story failure", async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    storyService.deleteStory.mockRejectedValue(new Error("Failed"));

    render(<Dashboard />);
    await waitFor(() => screen.getByTestId("story-table"));

    const deleteButtons = await screen.findAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Failed to delete story");
    });

    consoleSpy.mockRestore();
});
