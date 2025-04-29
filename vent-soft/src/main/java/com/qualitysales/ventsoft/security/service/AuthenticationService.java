package com.qualitysales.ventsoft.security.service;

import com.qualitysales.ventsoft.security.dto.LoginRequestDTO;
import com.qualitysales.ventsoft.security.dto.LoginResponseDTO;

public interface AuthenticationService {
    LoginResponseDTO login(LoginRequestDTO loginRequestDTO);
}
