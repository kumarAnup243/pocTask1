import React from 'react';
import { render, screen } from '@testing-library/react';
import SprintPointsChart from '../graphs/SprintPointsChart';
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

describe('SprintPointsChart', () => {
    const mockData = [
        { sprint: 'Sprint 1', totalPoints: 20 },
        { sprint: 'Sprint 2', totalPoints: 30 },
    ];

    test('renders chart with data', () => {
        render(
            <ThemeProvider>
                <SprintPointsChart data={mockData} />
            </ThemeProvider>
        );

        expect(screen.getByText('Story Points Graph')).toBeInTheDocument();
    });

    test('renders no data message when data is empty', () => {
        render(
            <ThemeProvider>
                <SprintPointsChart data={[]} />
            </ThemeProvider>
        );

        expect(screen.getByText('No data available.')).toBeInTheDocument();
    });
});
