import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Mock child components
jest.mock('../components/Login', () => () => <div data-testid="login-component">Login Component</div>);
jest.mock('../components/Dashboard', () => () => <div data-testid="dashboard-component">Dashboard Component</div>);

// Mock ResizeObserver for any potential deep rendering issues, though mocking children should prevent this
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

describe('App', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('renders Login when no user is logged in', async () => {
        render(<App />);

        // UserProvider is async in checking localStorage, so we might need to wait
        // However, initial state is null, so it should render Login immediately or after effect
        // The UserProvider sets loading to true initially, so we might need to handle a loading state if AppContent handled it.
        // But AppContent just checks currentUser. If loading is true, currentUser is null.
        // Wait, UserProvider has `loading` state. AppContent doesn't check `loading`.
        // If `loading` is true, `currentUser` is null, so it renders `Login`.
        // Then effect runs, if no user, `currentUser` stays null, `loading` becomes false. Still `Login`.
        // So we should see Login.

        await waitFor(() => expect(screen.getByTestId('login-component')).toBeInTheDocument());
    });

    test('renders Dashboard when user is logged in', async () => {
        const user = { id: 1, username: 'testuser' };
        localStorage.setItem('user', JSON.stringify(user));

        render(<App />);

        // UserProvider reads localStorage in useEffect, so it's async.
        await waitFor(() => expect(screen.getByTestId('dashboard-component')).toBeInTheDocument());
    });
});
