import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import Login from "../components/Login";
import toast from "react-hot-toast";

// Mock dependencies
jest.mock("react-hot-toast", () => ({
    __esModule: true,
    default: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

const mockedNavigate = jest.fn();
jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

jest.mock("../data/dummyData", () => ({
    __esModule: true,
    loginData: [
        { username: "testuser", password: "password123" }
    ]
}));

const mockedLoginFunc = jest.fn();
jest.mock("../context/UserContext.jsx", () => ({
    __esModule: true,
    useUserContext: () => ({
        login: mockedLoginFunc,
    }),
    UserProvider: ({ children }) => <div>{children}</div>,
}));

// 3. Cleanup
afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

const renderLoginForm = () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );
};

test("shows toast error when fields are empty", () => {
    renderLoginForm();

    // Click without typing
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert: Check Validation Logic
    expect(toast.error).toHaveBeenCalledWith("Please enter both username and password");
    expect(mockedLoginFunc).not.toHaveBeenCalled();
});

test("shows toast error when credentials are wrong", () => {
    renderLoginForm();

    // Type wrong data
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: "wronguser" } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Assert: Check Authentication Logic
    expect(toast.error).toHaveBeenCalledWith("Invalid username or password");
    expect(mockedLoginFunc).not.toHaveBeenCalled();
});

test("logs in successfully and redirects with correct credentials", () => {
    renderLoginForm();

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(toast.success).toHaveBeenCalledWith("Login successful");
    expect(mockedLoginFunc).toHaveBeenCalledWith(
        expect.objectContaining({ username: "testuser", password: "password123" })
    );
    expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
});