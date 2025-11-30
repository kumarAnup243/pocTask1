import { jest, test, expect, afterEach } from '@jest/globals';
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Navbar from "../components/Navbar";

// Mock Contexts
const mockLogout = jest.fn();
const mockToggleTheme = jest.fn();
const mockCurrentUser = { username: "testuser" };

jest.mock("../context/UserContext", () => ({
    useUserContext: () => ({
        currentUser: mockCurrentUser,
        logout: mockLogout,
    }),
}));

jest.mock("../context/ThemeContext", () => ({
    useTheme: () => ({
        theme: "light",
        toggleTheme: mockToggleTheme,
    }),
}));

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

test("renders navbar with user info", () => {
    render(<Navbar onSearch={jest.fn()} onAddStory={jest.fn()} showAnalytics={false} setShowAnalytics={jest.fn()} />);

    expect(screen.getByText("StoryBoard")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search stories/i)).toBeInTheDocument();
});

test("calls onSearch when typing in search input", () => {
    const onSearch = jest.fn();
    render(<Navbar onSearch={onSearch} onAddStory={jest.fn()} showAnalytics={false} setShowAnalytics={jest.fn()} />);

    const input = screen.getByPlaceholderText(/Search stories/i);
    fireEvent.change(input, { target: { value: "test query" } });

    expect(onSearch).toHaveBeenCalledWith("test query");
});

test("calls onAddStory when New Story button is clicked", () => {
    const onAddStory = jest.fn();
    render(<Navbar onSearch={jest.fn()} onAddStory={onAddStory} showAnalytics={false} setShowAnalytics={jest.fn()} />);

    fireEvent.click(screen.getByText("New Story"));
    expect(onAddStory).toHaveBeenCalled();
});

test("toggles analytics view", () => {
    const setShowAnalytics = jest.fn();
    render(<Navbar onSearch={jest.fn()} onAddStory={jest.fn()} showAnalytics={false} setShowAnalytics={setShowAnalytics} />);

    fireEvent.click(screen.getByText("Analytics"));
    expect(setShowAnalytics).toHaveBeenCalledWith(true);
});

test("shows 'View Stories' when analytics is active", () => {
    render(<Navbar onSearch={jest.fn()} onAddStory={jest.fn()} showAnalytics={true} setShowAnalytics={jest.fn()} />);

    expect(screen.getByText("View Stories")).toBeInTheDocument();
});

test("calls toggleTheme when theme button is clicked", () => {
    render(<Navbar onSearch={jest.fn()} onAddStory={jest.fn()} showAnalytics={false} setShowAnalytics={jest.fn()} />);

    // Theme button has a title "Switch to Dark Mode" when theme is light
    const themeButton = screen.getByTitle("Switch to Dark Mode");
    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalled();
});

test("calls logout when logout button is clicked", () => {
    render(<Navbar onSearch={jest.fn()} onAddStory={jest.fn()} showAnalytics={false} setShowAnalytics={jest.fn()} />);

    const logoutButton = screen.getByTitle("Logout");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
});
