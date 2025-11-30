package com.storyboard.backend.service;

import com.storyboard.backend.entity.Story;
import java.util.List;

public interface StoryService {
    List<Story> getAllStories();

    Story getStoryById(Long id);

    Story createStory(Story story);

    Story updateStory(Long id, Story story);

    void deleteStory(Long id);
}
