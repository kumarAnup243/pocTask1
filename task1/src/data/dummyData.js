export const loginData = [
    {
        id: 1,
        name: "Anup Kumar",
        username: "anup",
        password: "anup1234",

    },
    {
        id: 2,
        name: "Saravana Kumar",
        username: "Saravana",
        password: "anup1234",
    },
    {
        id: 3,
        name: "Sundareshwaran",
        username: "sundar",
        password: "sundar1234",
    },
];

export const mockStories = [
    {
        id: 1,
        name: "Anup Kumar",
        sprint: "Sprint 1",
        story: "Implement login with validation",
        link: "https://jira.company.com/story/101",
        department: "Frontend",
        startDate: "2025-10-01",
        endDate: "2025-10-05",
        reviewDate: "2025-10-06",
        comments: "Basic login with form validation",
        storyPoints: 1
    },
    {
        id: 2,
        name: "Saravana Kumar",
        sprint: "Sprint 1",
        story: "Secure backend with JWT",
        link: "https://jira.company.com/story/102",
        department: "Backend",
        startDate: "2025-10-02",
        endDate: "2025-10-06",
        reviewDate: "2025-10-07",
        comments: "JWT token-based auth",
        storyPoints: 5
    },
    {
        id: 3,
        name: "Naveen Kumar",
        sprint: "Sprint 2",
        story: "Create dashboard layout",
        link: "https://jira.company.com/story/103",
        department: "Frontend",
        startDate: "2025-10-07",
        endDate: "2025-10-12",
        reviewDate: "2025-10-13",
        comments: "Responsive layout with cards",
        storyPoints: 3
    },
    {
        id: 4,
        name: "Rohit Kumar",
        sprint: "Sprint 2",
        story: "Design schema for stories",
        link: "https://jira.company.com/story/104",
        department: "Backend",
        startDate: "2025-10-08",
        endDate: "2025-10-11",
        reviewDate: "2025-10-12",
        comments: "Normalized schema with indexes",
        storyPoints: 1
    },
    {
        id: 5,
        name: "Srikar",
        sprint: "Sprint 3",
        story: "Build API for story management",
        link: "https://jira.company.com/story/105",
        department: "Backend",
        startDate: "2025-10-13",
        endDate: "2025-10-18",
        reviewDate: "2025-10-19",
        comments: "Includes add/edit/delete endpoints",
        storyPoints: 3
    },
    {
        id: 6,
        name: "Chetan",
        sprint: "Sprint 3",
        story: "Add validation to story form",
        link: "https://jira.company.com/story/106",
        department: "Frontend",
        startDate: "2025-10-14",
        endDate: "2025-10-17",
        reviewDate: "2025-10-18",
        comments: "Client-side validation with error messages",
        storyPoints: 5
    },
    {
        id: 7,
        name: "Dinesh",
        sprint: "Sprint 4",
        story: "Paginate dashboard list",
        link: "https://jira.company.com/story/107",
        department: "Frontend",
        startDate: "2025-10-20",
        endDate: "2025-10-24",
        reviewDate: "2025-10-25",
        comments: "Page size of 10 stories",
        storyPoints: 2
    },
    {
        id: 8,
        name: "Ishan",
        sprint: "Sprint 4",
        story: "Write unit tests for story API",
        link: "https://jira.company.com/story/108",
        department: "Backend",
        startDate: "2025-10-21",
        endDate: "2025-10-26",
        reviewDate: "2025-10-27",
        comments: "Coverage > 90%",
        storyPoints: 3
    },
    {
        id: 9,
        name: "Dhanush",
        sprint: "Sprint 5",
        story: "Implement search by name and sprint",
        link: "https://jira.company.com/story/109",
        department: "Frontend",
        startDate: "2025-10-28",
        endDate: "2025-11-02",
        reviewDate: "2025-11-03",
        comments: "Debounced search input",
        storyPoints: 2
    },
    {
        id: 10,
        name: "Nutan sai",
        sprint: "Sprint 5",
        story: "CI/CD for backend",
        link: "https://jira.company.com/story/110",
        department: "DevOps",
        startDate: "2025-10-29",
        endDate: "2025-11-04",
        reviewDate: "2025-11-05",
        comments: "GitHub Actions + Docker",
        storyPoints: 5
    }
];

export const sprintPointsData = Object.values(
    mockStories.reduce((acc, story) => {
        if (!acc[story.sprint]) {
            acc[story.sprint] = { sprint: story.sprint, totalPoints: 0 };
        }
        acc[story.sprint].totalPoints += story.storyPoints;
        return acc;
    }, {})
);

export const departmentData =  Object.values(
    mockStories.reduce((acc, dep) => {
        if (!acc[dep.department]) {
            acc[dep.department] = { department: dep.department, total: 0 };
        }
        acc[dep.department].total += 1;
        return acc;
    }, {})
);

export const totalCountOfDepartments = departmentData.reduce((acc, dep) => acc + dep.total, 0);

