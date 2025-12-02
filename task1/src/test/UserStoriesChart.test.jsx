import React from 'react';
import { render, screen } from '@testing-library/react';
import UserStoriesChart from '../graphs/UserStoriesChart';
import { ThemeProvider } from '../context/ThemeContext';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

// Mock Recharts ResponsiveContainer
jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }) => (
            <div style={{ width: 500, height: 500 }}>{children}</div>
        ),
    };
});

describe('UserStoriesChart', () => {
    const mockData = [
        { username: 'User 1', count: 5 },
        { username: 'User 2', count: 8 },
    ];

    test('renders chart with data', () => {
        render(
            <ThemeProvider>
                <UserStoriesChart data={mockData} />
            </ThemeProvider>
        );

        expect(screen.getByText('Stories per User')).toBeInTheDocument();
    });

    test('renders no data message when data is empty', () => {
        render(
            <ThemeProvider>
                <UserStoriesChart data={[]} />
            </ThemeProvider>
        );

        expect(screen.getByText('No data available.')).toBeInTheDocument();
    });
});
