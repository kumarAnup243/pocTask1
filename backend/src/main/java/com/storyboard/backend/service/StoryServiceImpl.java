package com.storyboard.backend.service;

import com.storyboard.backend.entity.Story;
import com.storyboard.backend.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Override
    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    @Override
    public Story getStoryById(Long id) {
        return storyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Story not found with id: " + id));
    }

    @Override
    public Story createStory(Story story) {
        return storyRepository.save(story);
    }

    @Override
    public Story updateStory(Long id, Story storyDetails) {
        Story story = getStoryById(id);

        story.setName(storyDetails.getName());
        story.setSprint(storyDetails.getSprint());
        story.setStory(storyDetails.getStory());
        story.setStoryPoints(storyDetails.getStoryPoints());
        story.setStoryLink(storyDetails.getStoryLink());
        story.setDepartment(storyDetails.getDepartment());
        story.setStartDate(storyDetails.getStartDate());
        story.setEndDate(storyDetails.getEndDate());
        story.setReviewDate(storyDetails.getReviewDate());
        story.setComments(storyDetails.getComments());

        return storyRepository.save(story);
    }

    @Override
    public void deleteStory(Long id) {
        Story story = getStoryById(id);
        storyRepository.delete(story);
    }
}
