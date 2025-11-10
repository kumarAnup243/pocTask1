export const storyReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_STORIES":
            return action.payload;
        case "ADD_STORY":
            return [...state, action.payload];
        case "UPDATE_STORY":
            return state.map(story =>
                story.id === action.payload.id ? action.payload : story
            );
        case "DELETE_STORY":
            return state.filter(story => story.id !== action.payload);
        default:
            return state;
    }
};
