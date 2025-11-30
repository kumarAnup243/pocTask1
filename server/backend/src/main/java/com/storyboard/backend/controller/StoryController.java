package com.storyboard.backend.controller;

import com.storyboard.backend.entity.Story;
import com.storyboard.backend.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @GetMapping
    public List<Story> getAllStories() {
        return storyService.getAllStories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable Long id) {
        return ResponseEntity.ok(storyService.getStoryById(id));
    }

    @PostMapping
    public Story createStory(@RequestBody Story story) {
        return storyService.createStory(story);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Story> updateStory(@PathVariable Long id, @RequestBody Story story) {
        return ResponseEntity.ok(storyService.updateStory(id, story));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStory(@PathVariable Long id) {
        storyService.deleteStory(id);
        return ResponseEntity.ok().build();
    }
}
