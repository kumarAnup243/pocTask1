import React from 'react';
import { render, screen } from '@testing-library/react';
import DepartmentPieChart from '../graphs/DepartmentPieChart';
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

describe('DepartmentPieChart', () => {
    const mockData = [
        { department: 'Engineering', total: 10 },
        { department: 'HR', total: 5 },
    ];

    test('renders chart with data', () => {
        render(
            <ThemeProvider>
                <DepartmentPieChart data={mockData} totalCount={15} />
            </ThemeProvider>
        );

        expect(screen.getByText('Department Pie Chart')).toBeInTheDocument();
        expect(screen.getByText('Total: 15')).toBeInTheDocument();
        // With the mock, we might not see the rendered Pie segments as easily if they depend on complex SVG calculations 
        // that might be bypassed or behave differently. But the text should be there.
        // Let's check if the mock data text is rendered.
        // Recharts usually renders text elements.
        expect(screen.getByText('Engineering')).toBeInTheDocument();
        expect(screen.getByText('HR')).toBeInTheDocument();
    });

    test('renders no data message when data is empty', () => {
        render(
            <ThemeProvider>
                <DepartmentPieChart data={[]} totalCount={0} />
            </ThemeProvider>
        );

        expect(screen.getByText('No data available.')).toBeInTheDocument();
    });
});
