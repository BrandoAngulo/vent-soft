package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.Controllers.DTO.UserDTO;
import com.qualitysales.ventsoft.mapper.UserMapper;
import com.qualitysales.ventsoft.model.User;
import com.qualitysales.ventsoft.repository.UserRepository;
import com.qualitysales.ventsoft.service.UserService;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import com.qualitysales.ventsoft.utils.enums.MessagesEnum;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContextException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    @Override
    public List<UserDTO> listUsers() {
        List<User> userList = userRepository.findAll();
        try {
            return userList.stream()
                    .map(UserMapper::convertToDTO)
                    .toList();
        } catch (Exception e) {
            log.error("listUsers = " + userList);
            throw new IllegalArgumentException(e);
        }
    }

    @Transactional
    @Override
    public UserDTO listUser(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        try {
            return UserMapper.convertToDTO(user);
        } catch (Exception e) {
            log.error("listUsers = " + user);
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public UserDTO saveUser(User user) {
        if (user.getName() == null) {
            log.error("saveUser = " + user);
            throw new IllegalArgumentException("Username is null ");
        }
        try {
            UserDTO userDTO = UserMapper.convertToDTO(user);
            log.info("saveUser = " + userDTO);
            userRepository.save(user);
            return userDTO;

        } catch (Exception e) {
            log.error("saveUser = " + user);
            throw new IllegalArgumentException("Uncontrolled error ");
        }
    }

    @Override
    public User updateUser(Integer id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));

        try {
            user.setName(userDTO.getName());
            user.setLastName(userDTO.getLastName());
            user.setCode(userDTO.getCode());
            user.setEmail(userDTO.getEmail());
            user.setLogin(userDTO.getLogin());
            user.setPassword(userDTO.getPassword());
            user.setRoles(userDTO.getRoles());
            user.setStatus(userDTO.getStatus());
            log.info("userSave = " + user);
            return userRepository.save(user);


        } catch (Exception e) {
            log.error("updateUser = " + user);
            throw new IllegalArgumentException("Uncontroller error ");
        }
    }

    @Override
    public GenericDTO deleteUser(Integer id) {
        User existUser = userRepository.findById(id).orElseThrow(() ->
                new ApplicationContextException(MessagesEnum.REQUEST_FAILED.getMessage(), null));
        try {
            userRepository.deleteById(existUser.getId());
            return GenericDTO.genericSuccess(MessagesEnum.REQUEST_SUCCESS, HttpStatus.OK.value());

        } catch (Exception e) {
            log.error("deleteUser = " + existUser.toString());
            throw new ApplicationContextException(e.getMessage());
        }
    }
}
