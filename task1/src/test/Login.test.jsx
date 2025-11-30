import { jest, test, expect, afterEach } from '@jest/globals';
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import userService from "../services/userService";
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

// mock userService 
jest.mock("../services/userService", () => ({
    __esModule: true,
    default: {
        login: jest.fn(),
    },
}));

const mockedLoginFunc = jest.fn();
jest.mock("../context/UserContext.jsx", () => ({
    __esModule: true,
    useUserContext: () => ({
        login: mockedLoginFunc,
    }),
    UserProvider: ({ children }) => <div>{children}</div>,
}));

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
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));
    expect(toast.error).toHaveBeenCalledWith("Please enter both username and password");
    expect(mockedLoginFunc).not.toHaveBeenCalled();
});

test("shows toast error when credentials are wrong", () => {
    userService.login.mockRejectedValue(new Error("Invalid credentials"));
    
    renderLoginForm();
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: "wronguser" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    // wait for async operation and check
    setTimeout(() => {
        expect(toast.error).toHaveBeenCalledWith("Invalid username or password");
        expect(mockedLoginFunc).not.toHaveBeenCalled();
    }, 0);
});

test("logs in successfully and redirects with correct credentials", () => {
    const mockUser = { username: "testuser", password: "password123" };
    userService.login.mockResolvedValue(mockUser);
    
    renderLoginForm();
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    // wait for async operation and check
    setTimeout(() => {
        expect(toast.success).toHaveBeenCalledWith("Login successful");
        expect(mockedLoginFunc).toHaveBeenCalledWith(mockUser);
        expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
    }, 0);
});
