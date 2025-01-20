package com.chris.portfolio2025.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

record ProjectInfo(String name, String role) {}

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/hello")
    public String hello() {
        return "HELLO FROM SPRING BOOT!";
    }

    @GetMapping("/info")
    public ProjectInfo getProjectInfo() {
        return new ProjectInfo("CHRISTIAN WILKINS", "SOFTWARE ENGINEER");
    }

    @GetMapping("/experience")
    public String getExperience() {
        return "I have been working as a software engineer for 5 years.";
    }

    @GetMapping("/)
}
