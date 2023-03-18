import renderer from 'react-test-renderer';
import Home from '../index';
import {test} from "jest-circus";
import {jest} from "@jest/globals";
import {render} from "react-dom";

test('descFetch updates state and fetches data', async () => {
    const mockData = [{ id: 1, title: 'Do laundry' }, { id: 2, title: 'Clean kitchen' }];
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });
    render(<Home />);
    const input = screen.getByLabelText('Description');
    const button = screen.getByRole('button', { name: 'Search' });
    userEvent.type(input, 'laundry');
    userEvent.click(button);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await screen.findByText('Do laundry');
    expect(screen.getByText('Clean kitchen')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('/api/todo?page=1&sort=due&like=laundry');
    expect(screen.getByText('Showing results for: laundry')).toBeInTheDocument();
});