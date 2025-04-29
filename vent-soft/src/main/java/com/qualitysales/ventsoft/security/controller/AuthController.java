package com.qualitysales.ventsoft.security.controller;

import com.qualitysales.ventsoft.security.dto.LoginRequestDTO;
import com.qualitysales.ventsoft.security.service.impl.AuthenticationServiceImpl;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vent-soft/auth")
public class AuthController {

      private final AuthenticationServiceImpl authenticationService;

    public AuthController(AuthenticationServiceImpl authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<GenericDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {

        return ResponseEntity.ok().body(GenericDTO.success(this.authenticationService.login(loginRequestDTO)));
    }
}