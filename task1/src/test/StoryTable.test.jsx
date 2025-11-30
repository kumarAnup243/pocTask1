import { jest, test, expect, afterEach } from '@jest/globals';
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import StoryTable from "../components/StoryTable";

afterEach(() => {
    cleanup();
});

const mockStories = [
    {
        id: 1,
        name: "Story 1",
        sprint: "Sprint 1",
        story: "User Story 1",
        storyPoints: 5,
        storyLink: "http://link1.com",
        department: "Frontend",
        assignedTo: "Alice",
        status: "TODO",
        startDate: "2024-01-01",
        endDate: "2024-01-10",
        reviewDate: "2024-01-05",
        comments: "Comment 1"
    },
    {
        id: 2,
        name: "Story 2",
        sprint: "Sprint 2",
        story: "User Story 2",
        storyPoints: 3,
        storyLink: "http://link2.com",
        department: "Backend",
        assignedTo: "", // Unassigned
        status: "IN_PROGRESS",
        startDate: "2024-02-01",
        endDate: "2024-02-10",
        reviewDate: "2024-02-05",
        comments: "Comment 2"
    }
];

test("renders table with stories", () => {
    render(<StoryTable stories={mockStories} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText("Story 1")).toBeInTheDocument();
    expect(screen.getByText("Story 2")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Unassigned")).toBeInTheDocument();
});

test("renders correct number of rows", () => {
    render(<StoryTable stories={mockStories} onEdit={jest.fn()} onDelete={jest.fn()} />);

    // 2 rows + 1 header row, but we usually check body rows
    // We can check by role 'row' but that includes header.
    // Let's check specific cells or just count delete buttons as proxy for rows
    expect(screen.getAllByText("Delete")).toHaveLength(2);
});

test("calls onEdit when Edit button is clicked", () => {
    const onEdit = jest.fn();
    render(<StoryTable stories={mockStories} onEdit={onEdit} onDelete={jest.fn()} />);

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledWith(mockStories[0]);
});

test("calls onDelete when Delete button is clicked", () => {
    const onDelete = jest.fn();
    render(<StoryTable stories={mockStories} onEdit={jest.fn()} onDelete={onDelete} />);

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(onDelete).toHaveBeenCalledWith(mockStories[0].id);
});

test("renders empty table when no stories provided", () => {
    render(<StoryTable stories={[]} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.queryByText("Story 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
});
