package com.example.todo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.todo.model.Task;

public interface TaskRepo extends JpaRepository<Task,Long> {

}
