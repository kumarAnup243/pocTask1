import './App.css'
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import {useUserContext} from "./context/UserContext.jsx";
import {Navigate, Route, Routes} from "react-router";
import {Toaster} from "react-hot-toast";

const App = () =>  {

    const { currentUser, loading } = useUserContext();
    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            Loading...
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-100">
            <Toaster />
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route
                    path="/dashboard"
                    element={
                        currentUser ? <Dashboard /> : <Navigate to="/" replace />
                    }
                />
            </Routes>
        </div>
    );
}

export default App
