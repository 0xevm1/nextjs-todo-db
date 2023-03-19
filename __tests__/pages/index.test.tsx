import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../pages/index';

// mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([{ id: 1, title: 'Do laundry' }, { id: 2, title: 'Clean kitchen' }])
    })
);

describe('Home', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component', () => {
        render(<Home/>);
        const heading = screen.getByRole('header');
        expect(heading).toBeInTheDocument();
    });
});