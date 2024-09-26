package com.springbackend.controllers;

import java.util.List;
import java.util.Optional;

import com.springbackend.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springbackend.models.User;
import com.springbackend.repositories.UserRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	 
	@PostMapping("/user")
	public ResponseEntity<User> newUser(@RequestBody User user) {
		User createdUser = this.userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getUsers(){
		List<User> users = this.userRepository.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(users);
	}

	@GetMapping("/user/{id}")
	public User getUserWithId(@PathVariable("id") Long id){
		Optional<User> user = this.userRepository.findById(id);
		return user.orElseThrow(()->{
			return new UserNotFoundException(id);
		});
	}

	@PutMapping("/user/{id}")
	public User updateUser(@RequestBody User user, @PathVariable("id") Long id){
		Optional<User> userPresent = userRepository.findById(id);
		return userPresent.map(u-> {
			u.setName(user.getName());
			u.setEmail(user.getEmail());
			u.setUsername(user.getUsername());
			return userRepository.save(u);
		}).orElseThrow(()-> new UserNotFoundException(id));
	}

    @DeleteMapping("/user/{id}")
	public String deleteUser(@PathVariable("id") Long id){
		if(!userRepository.existsById(id)){
			throw new UserNotFoundException(id);
		}
		userRepository.deleteById(id);
		return "User with id " + id + " deleted successfully";
	}
	
}
