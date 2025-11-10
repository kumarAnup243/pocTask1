import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { loginData } from "../data/dummyData";
import { useUserContext } from "../context/UserContext.jsx";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useUserContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error("Please enter both username and password");
            return;
        }

        const user = loginData.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            login(user);
            toast.success("Login successful");
            navigate("/dashboard");
        } else {
            toast.error("Invalid username or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Login</h1>
                <p className="text-gray-500 mb-6 text-center">Welcome Back!</p>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
