import { jest, test, expect, afterEach, beforeEach } from '@jest/globals';
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import storyService from "../services/storyService";
import userService from "../services/userService";

// Mock dependencies
jest.mock("../services/storyService", () => ({
    __esModule: true,
    default: {
        getAllStories: jest.fn(),
    },
}));

jest.mock("../services/userService", () => ({
    __esModule: true,
    default: {
        getAllUsers: jest.fn(),
    },
}));

// Mock Recharts components since they are complex to render in tests
jest.mock("../graphs/SprintPointsChart.jsx", () => () => <div data-testid="sprint-points-chart">Sprint Points Chart</div>);
jest.mock("../graphs/DepartmentPieChart.jsx", () => () => <div data-testid="department-pie-chart">Department Pie Chart</div>);
jest.mock("../graphs/UserStoriesChart.jsx", () => () => <div data-testid="user-stories-chart">User Stories Chart</div>);

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

const mockStories = [
    { id: 1, sprint: "Sprint 1", storyPoints: 5, department: "Frontend", assignedTo: "Alice" },
    { id: 2, sprint: "Sprint 1", storyPoints: 3, department: "Backend", assignedTo: "Bob" },
    { id: 3, sprint: "Sprint 2", storyPoints: 8, department: "Frontend", assignedTo: "Alice" },
];

const mockUsers = [
    { id: 1, username: "Alice" },
    { id: 2, username: "Bob" },
    { id: 3, username: "Charlie" },
];

test("shows loading spinner initially", () => {
    // Return a promise that never resolves immediately to test loading state
    storyService.getAllStories.mockReturnValue(new Promise(() => { }));
    userService.getAllUsers.mockReturnValue(new Promise(() => { }));

    render(<AnalyticsDashboard />);

    // Check for some loading indicator. The component uses Loader2 from lucide-react.
    // Since lucide-react renders SVGs, we might not find text. 
    // However, the component wrapper has a specific class or we can check if charts are NOT there yet.
    // Looking at the code: <Loader2 ... /> is used.
    // We can try to find by class or just check that content is not yet visible.

    // Actually, let's rely on the fact that the dashboard header is NOT there when loading
    expect(screen.queryByText("Analytics Dashboard")).not.toBeInTheDocument();
});

test("renders dashboard with data after loading", async () => {
    storyService.getAllStories.mockResolvedValue(mockStories);
    userService.getAllUsers.mockResolvedValue(mockUsers);

    render(<AnalyticsDashboard />);

    // Wait for loading to finish
    await waitFor(() => {
        expect(screen.getByText("Analytics Dashboard")).toBeInTheDocument();
    });

    // Check Summary Cards
    expect(screen.getByText("Total Members")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // 3 users

    expect(screen.getByText("Total Departments")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument(); // Frontend, Backend

    // Check Charts are rendered
    expect(screen.getByTestId("sprint-points-chart")).toBeInTheDocument();
    expect(screen.getByTestId("department-pie-chart")).toBeInTheDocument();
    expect(screen.getByTestId("user-stories-chart")).toBeInTheDocument();
});

test("handles error during data fetching", async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    storyService.getAllStories.mockRejectedValue(new Error("Failed to fetch"));
    userService.getAllUsers.mockResolvedValue([]);

    render(<AnalyticsDashboard />);

    await waitFor(() => {
        // Even on error, loading is set to false, so dashboard should try to render
        expect(screen.getByText("Analytics Dashboard")).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith("Failed to load analytics data", expect.any(Error));
    consoleSpy.mockRestore();
});
