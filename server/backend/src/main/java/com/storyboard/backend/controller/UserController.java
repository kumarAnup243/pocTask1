package com.storyboard.backend.controller;

import com.storyboard.backend.entity.User;
import com.storyboard.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @org.springframework.web.bind.annotation.PostMapping("/login")
    public org.springframework.http.ResponseEntity<?> login(
            @org.springframework.web.bind.annotation.RequestBody User loginRequest) {
        User user = userRepository.findAll().stream()
                .filter(u -> u.getUsername().equals(loginRequest.getUsername())
                        && u.getPassword().equals(loginRequest.getPassword()))
                .findFirst()
                .orElse(null);

        if (user != null) {
            return org.springframework.http.ResponseEntity.ok(user);
        } else {
            return org.springframework.http.ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
