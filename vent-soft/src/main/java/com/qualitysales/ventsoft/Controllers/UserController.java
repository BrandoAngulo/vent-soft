package com.qualitysales.ventsoft.Controllers;

import com.qualitysales.ventsoft.Controllers.DTO.UserDTO;
import com.qualitysales.ventsoft.model.User;
import com.qualitysales.ventsoft.service.impl.UserServiceImpl;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vent-soft/user")
@CrossOrigin
public class UserController {

    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/find-all")
    public List<UserDTO> listUsers() {

        return ResponseEntity.ok(userService.listUsers()).getBody();
    }

    @GetMapping("/find-by/{id}")
    public UserDTO listUser(@PathVariable Integer id) {

        return ResponseEntity.ok().body(userService.listUser(id)).getBody();
    }

    @PostMapping("/save")
    public UserDTO save(@Valid @RequestBody User user) {

        return ResponseEntity.ok().body(userService.saveUser(user)).getBody();
    }
    @PutMapping("/update/{id}")
    public User update(@PathVariable Integer id, @RequestBody UserDTO userDTO) {

        return ResponseEntity.ok(userService.updateUser(id, userDTO)).getBody();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GenericDTO> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }

}
