package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.Controllers.DTO.UserDTO;
import com.qualitysales.ventsoft.mapper.UserMapper;
import com.qualitysales.ventsoft.model.User;
import com.qualitysales.ventsoft.repository.UserRepository;
import com.qualitysales.ventsoft.service.UserService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Transactional
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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

            userRepository.save(user);
            log.info("saveUser = " + user);
            return userDTO;

        } catch (Exception e) {
            log.error("saveUser = " + user);
            throw new IllegalArgumentException("Uncontrolled error ");
        }
    }

    @Override
    public User updateUser(Integer id, UserDTO userDTO) {
        User existUser = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        try {
            existUser.setName(userDTO.getName());
            existUser.setLastName(userDTO.getLastName());
            existUser.setCode(userDTO.getCode());
            existUser.setEmail(userDTO.getEmail());
            existUser.setState(userDTO.getState());
            log.info("existUserSave = " + existUser);
            return userRepository.save(existUser);


        } catch (Exception e) {
            log.error("updateUser = " + existUser.toString());
            throw new IllegalArgumentException("Uncontroller error ");
        }
    }

    @Override
    public void deleteUser(Integer id) {
        User existUser = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        try {
            userRepository.deleteById(existUser.getId());

        } catch (Exception e) {
            log.error("deleteUser = " + existUser.toString());
            throw new IllegalArgumentException("Uncontroller error ");
        }

    }
}
