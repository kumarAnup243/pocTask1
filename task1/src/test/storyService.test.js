import api from '../services/api';
import storyService from '../services/storyService';

const { getAllStories, getStoryById, createStory, updateStory, deleteStory } = storyService;

jest.mock('../services/api');

describe('storyService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getAllStories fetches stories successfully', async () => {
        const mockStories = [{ id: 1, title: 'Story 1' }];
        api.get.mockResolvedValue({ data: mockStories });

        const result = await getAllStories();

        expect(api.get).toHaveBeenCalledWith('/stories');
        expect(result).toEqual(mockStories);
    });

    test('getStoryById fetches a single story successfully', async () => {
        const mockStory = { id: 1, title: 'Story 1' };
        api.get.mockResolvedValue({ data: mockStory });

        const result = await getStoryById(1);

        expect(api.get).toHaveBeenCalledWith('/stories/1');
        expect(result).toEqual(mockStory);
    });

    test('createStory posts new story successfully', async () => {
        const newStory = { title: 'New Story' };
        const createdStory = { id: 1, ...newStory };
        api.post.mockResolvedValue({ data: createdStory });

        const result = await createStory(newStory);

        expect(api.post).toHaveBeenCalledWith('/stories', newStory);
        expect(result).toEqual(createdStory);
    });

    test('updateStory puts updated story successfully', async () => {
        const storyId = 1;
        const storyUpdate = { title: 'Updated Story' };
        const updatedStory = { id: storyId, ...storyUpdate };
        api.put.mockResolvedValue({ data: updatedStory });

        const result = await updateStory(storyId, storyUpdate);

        expect(api.put).toHaveBeenCalledWith(`/stories/${storyId}`, storyUpdate);
        expect(result).toEqual(updatedStory);
    });

    test('deleteStory deletes story successfully', async () => {
        const storyId = 1;
        api.delete.mockResolvedValue({ data: {} });

        await deleteStory(storyId);

        expect(api.delete).toHaveBeenCalledWith(`/stories/${storyId}`);
    });
});
