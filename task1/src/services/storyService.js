import api from './api';

const storyService = {
    getAllStories: async () => {
        const response = await api.get('/stories');
        return response.data;
    },

    getStoryById: async (id) => {
        const response = await api.get(`/stories/${id}`);
        return response.data;
    },

    createStory: async (storyData) => {
        const response = await api.post('/stories', storyData);
        return response.data;
    },

    updateStory: async (id, storyData) => {
        const response = await api.put(`/stories/${id}`, storyData);
        return response.data;
    },

    deleteStory: async (id) => {
        const response = await api.delete(`/stories/${id}`);
        return response.data;
    }
};

export default storyService;
