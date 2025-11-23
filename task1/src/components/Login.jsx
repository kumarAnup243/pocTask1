import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useUserContext } from "../context/UserContext.jsx";
import userService from "../services/userService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error("Please enter both username and password");
            return;
        }

        try {
            const user = await userService.login({ username, password });
            login(user);
            toast.success("Login successful");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Invalid username or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-200">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-zinc-900 p-10 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800 w-full max-w-md transition-colors duration-200"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-600 dark:text-zinc-400">Sign in to access your dashboard</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-8 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                    Sign In
                </button>
            </form>
        </div>
    );

};

export default Login;
