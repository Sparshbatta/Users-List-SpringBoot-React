package com.springbackend.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("Could not found the user with this particular id as shown " + id);
    }
}
