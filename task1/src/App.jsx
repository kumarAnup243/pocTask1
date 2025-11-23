import { Toaster } from "react-hot-toast";
import { UserProvider, useUserContext } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const AppContent = () => {
    const { currentUser } = useUserContext();
    return currentUser ? <Dashboard /> : <Login />;
};

function App() {
    return (
        <ThemeProvider>
            <UserProvider>
                <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-200">
                    <Toaster position="top-right" toastOptions={{
                        className: 'dark:bg-zinc-800 dark:text-white',
                        style: {
                            background: '#fff',
                            color: '#333',
                        },
                        success: {
                            style: {
                                background: '#edf7ed',
                                color: '#1e4620',
                                border: '1px solid #c3e6cb'
                            },
                        },
                        error: {
                            style: {
                                background: '#fdeded',
                                color: '#5f2120',
                                border: '1px solid #f5c6cb'
                            },
                        },
                    }} />
                    <AppContent />
                </div>
            </UserProvider>
        </ThemeProvider>
    );
}

export default App;
