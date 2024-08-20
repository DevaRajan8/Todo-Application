package com.example.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo.model.Task;
import com.example.todo.repo.TaskRepo;

@RestController
@CrossOrigin
@RequestMapping("/tasks")
public class TodoController {
	@Autowired
	private TaskRepo taskrepo;
	@GetMapping("/hello")
	public String hello()
	{
		return "Hello to Spring boot";
	}
	@PostMapping
	public Task create(@RequestBody Task Task)
	{
		taskrepo.save(Task);
		return Task;
	}
	@GetMapping
	public List<Task> getall()
	{
		return taskrepo.findAll();
	}
	@PutMapping("/{id}")
	public Task updatetasks(@PathVariable Long id , @RequestBody Task Task)
	{
		Task.setId(id);
		return taskrepo.save(Task);
	}
	@DeleteMapping("/{id}")
	public void deletetask(@PathVariable Long id)
	{
		taskrepo.deleteById(id);
	}
}
