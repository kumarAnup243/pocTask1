import api from '../services/api';
import userService from '../services/userService';

const { login, getAllUsers } = userService;

jest.mock('../services/api');

describe('userService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('login posts credentials successfully', async () => {
        const credentials = { username: 'test', password: '123' };
        const mockUser = { id: 1, username: 'test' };
        api.post.mockResolvedValue({ data: mockUser });

        const result = await login(credentials);

        expect(api.post).toHaveBeenCalledWith('/users/login', credentials);
        expect(result).toEqual(mockUser);
    });

    test('getAllUsers fetches users successfully', async () => {
        const mockUsers = [{ id: 1, username: 'test' }];
        api.get.mockResolvedValue({ data: mockUsers });

        const result = await getAllUsers();

        expect(api.get).toHaveBeenCalledWith('/users');
        expect(result).toEqual(mockUsers);
    });
});
