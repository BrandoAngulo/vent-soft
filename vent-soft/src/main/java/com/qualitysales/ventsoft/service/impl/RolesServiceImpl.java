package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.model.Role;
import com.qualitysales.ventsoft.repository.RolesRepository;
import com.qualitysales.ventsoft.service.RolesService;
import com.qualitysales.ventsoft.utils.exceptions.AppException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContextException;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@Transactional
public class RolesServiceImpl implements RolesService {

    private final RolesRepository rolesRepository;

    public RolesServiceImpl(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    @Override
    public List<Role> findAllRoles() {
        try {
            List<Role> roles = rolesRepository.findAll();
            System.out.println("roles = " + roles);
            return  roles;
        } catch (Exception e) {
            throw new ApplicationContextException(e.getMessage());
        }
    }
}
