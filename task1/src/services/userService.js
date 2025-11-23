import api from './api';

const getAllUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};

const login = async (credentials) => {
    const response = await api.post("/users/login", credentials);
    return response.data;
};

export default {
    getAllUsers,
    login
};
