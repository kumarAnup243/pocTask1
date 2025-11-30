package com.storyboard.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "stories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String sprint;

    @Column(nullable = false)
    private String story;

    @Column(name = "story_points")
    private Integer storyPoints;

    @Column(name = "story_link")
    private String storyLink;

    @Column(nullable = false)
    private String department;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "review_date")
    private LocalDate reviewDate;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(nullable = false)
    private String status;
}
