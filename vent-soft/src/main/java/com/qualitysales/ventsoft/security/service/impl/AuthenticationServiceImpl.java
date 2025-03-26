package com.qualitysales.ventsoft.security.service.impl;

import com.qualitysales.ventsoft.model.User;
import com.qualitysales.ventsoft.repository.UserRepository;
import com.qualitysales.ventsoft.security.dto.LoginRequestDTO;
import com.qualitysales.ventsoft.security.dto.LoginResponseDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationServiceImpl {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME;

    public AuthenticationServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO)  {
        SecretKey secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), SignatureAlgorithm.HS512.getJcaName());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDTO.login(), loginRequestDTO.password()));
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByLogin(loginRequestDTO.login()).orElseThrow();

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities());
        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();

        return LoginResponseDTO.builder()
                .id(user.getId())
                .login(user.getLogin())
                .name(user.getName())
                .rol(userDetails.getAuthorities())
                .token(token)
                .build();
    }

}
