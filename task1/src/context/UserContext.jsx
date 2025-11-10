import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');

        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                setCurrentUser(user);
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (user) => {
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }


    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}