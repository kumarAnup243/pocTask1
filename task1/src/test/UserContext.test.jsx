import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserProvider, useUserContext } from '../context/UserContext';

// Test component to consume the context
const TestComponent = () => {
    const { currentUser, login, logout, loading } = useUserContext();

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <span data-testid="user-name">{currentUser ? currentUser.username : 'No User'}</span>
            <button onClick={() => login({ username: 'testuser', id: 1 })}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe('UserContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('provides default state', async () => {
        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
        expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
    });

    test('loads user from localStorage', async () => {
        const user = { username: 'storedUser', id: 123 };
        localStorage.setItem('user', JSON.stringify(user));

        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
        expect(screen.getByTestId('user-name')).toHaveTextContent('storedUser');
    });

    test('handles invalid JSON in localStorage', async () => {
        localStorage.setItem('user', 'invalid-json');
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
        expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
        expect(localStorage.getItem('user')).toBeNull();

        consoleSpy.mockRestore();
    });

    test('login updates state and localStorage', async () => {
        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());

        fireEvent.click(screen.getByText('Login'));

        expect(screen.getByTestId('user-name')).toHaveTextContent('testuser');
        expect(JSON.parse(localStorage.getItem('user'))).toEqual({ username: 'testuser', id: 1 });
    });

    test('logout clears state and localStorage', async () => {
        const user = { username: 'testuser', id: 1 };
        localStorage.setItem('user', JSON.stringify(user));

        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
        expect(screen.getByTestId('user-name')).toHaveTextContent('testuser');

        fireEvent.click(screen.getByText('Logout'));

        expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
        expect(localStorage.getItem('user')).toBeNull();
    });
});
