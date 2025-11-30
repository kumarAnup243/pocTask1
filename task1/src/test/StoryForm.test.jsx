import { jest, test, expect, afterEach } from '@jest/globals';
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import storyService from "../services/storyService";
import StoryForm from "../components/StoryForm";
import toast from "react-hot-toast";

// Mock dependencies
jest.mock("react-hot-toast", () => ({
    __esModule: true,
    default: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

const mockOnSubmit = jest.fn();

const renderStoryForm = (props = {}) => {
    render(
        <StoryForm onSubmit={mockOnSubmit} {...props} />
    );
};

test("shows toast error when fields are empty", () => {
    renderStoryForm();
    fireEvent.click(screen.getByRole("button", { name: /Add Story/i }));
    expect(toast.error).toHaveBeenCalledWith("Please fill in all required fields");
    expect(mockOnSubmit).not.toHaveBeenCalled();
});

test("shows toast error when start date is after end date", () => {
    renderStoryForm();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/sprint/i), { target: { value: "Sprint 1" } });
    fireEvent.change(screen.getByPlaceholderText(/^Enter story$/i), { target: { value: "Test Story" } });
    fireEvent.change(screen.getByLabelText(/story points/i), { target: { value: "5" } });
    fireEvent.change(screen.getByLabelText(/story link/i), { target: { value: "https://test.com" } });
    fireEvent.change(screen.getByLabelText(/comments/i), { target: { value: "Test comments" } });
    fireEvent.change(screen.getByLabelText(/department/i), { target: { value: "Frontend" } });

    // set invalid dates
    fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: "2024-12-31" } });
    fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: "2024-12-01" } });

    fireEvent.click(screen.getByRole("button", { name: /Add Story/i }));
    expect(toast.error).toHaveBeenCalledWith("Start date must be before end date");
    expect(mockOnSubmit).not.toHaveBeenCalled();
});

test("submits form successfully with valid data", () => {
    renderStoryForm();

    const formData = {
        name: "Test User",
        sprint: "Sprint 1", 
        story: "Test Story",
        storyPoints: "5",
        storyLink: "https://test.com",
        department: "Frontend",
        comments: "Test comments",
        startDate: "2024-12-01",
        endDate: "2024-12-31",
        reviewDate: "2024-12-15",
        status: "TODO",
        assignedTo: "",
    };

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: formData.name } });
    fireEvent.change(screen.getByLabelText(/sprint/i), { target: { value: formData.sprint } });
    fireEvent.change(screen.getByPlaceholderText(/^Enter story$/i), { target: { value: formData.story } });
    fireEvent.change(screen.getByLabelText(/story Points/i), { target: { value: formData.storyPoints } });
    fireEvent.change(screen.getByLabelText(/story Link/i), { target: { value: formData.storyLink } });
    fireEvent.change(screen.getByLabelText(/comments/i), { target: { value: formData.comments } });
    fireEvent.change(screen.getByLabelText(/department/i), { target: { value: formData.department } });
    fireEvent.change(screen.getByLabelText(/start Date/i), { target: { value: formData.startDate } });
    fireEvent.change(screen.getByLabelText(/end Date/i), { target: { value: formData.endDate } });
    fireEvent.change(screen.getByLabelText(/review Date/i), { target: { value: formData.reviewDate } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: formData.status } });
    fireEvent.change(screen.getByLabelText(/assigned To/i), { target: { value: formData.assignedTo } });
    
    fireEvent.click(screen.getByRole("button", { name: /Add Story/i }));    
    expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining(formData));
});

test("pre-fills form fields when editingStory prop is provided", () => {
    const existingStory = {
        name: "Existing User",
        sprint: "Sprint 2",
        story: "Existing Story",
        storyPoints: "3",
        storyLink: "https://existing.com",
        department: "Backend",
        assignedTo: "Anup",
        status: "IN_PROGRESS",
        startDate: "2024-11-01",
        endDate: "2024-11-10",
        reviewDate: "2024-11-05",
        comments: "Existing comments"
    };

    renderStoryForm({ editingStory: existingStory });

    expect(screen.getByLabelText(/name/i)).toHaveValue("Existing User");
    expect(screen.getByPlaceholderText(/^Enter story$/i)).toHaveValue("Existing Story");
    expect(screen.getByLabelText(/department/i)).toHaveValue("Backend");
    
    expect(screen.getByRole("button", { name: /Update Story/i })).toBeInTheDocument();
});


test("populates assignedTo dropdown with provided users", () => {
    const mockUsers = [
        { id: 1, username: "Alice", role: "Frontend" },
        { id: 2, username: "Bob", role: "Backend" }
    ];

    renderStoryForm({ users: mockUsers });
    const userOption = screen.getByRole('option', { name: "Alice (Frontend)" });
    
    expect(userOption).toBeInTheDocument();
    expect(userOption.value).toBe("Alice");
});