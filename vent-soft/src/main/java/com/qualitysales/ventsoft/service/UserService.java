package com.qualitysales.ventsoft.service;

import com.qualitysales.ventsoft.Controllers.DTO.UserDTO;
import com.qualitysales.ventsoft.model.User;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;

import java.util.List;

public interface UserService {

    List<UserDTO> listUsers();
    UserDTO listUser(Integer id);
    UserDTO saveUser(User user);
    User updateUser(Integer id, UserDTO userDTO);
    GenericDTO deleteUser(Integer id);
}
