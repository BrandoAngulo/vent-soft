package com.qualitysales.ventsoft.security.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@Builder
public class LoginResponseDTO {
    Integer id;
    String login;
    String name;
    Collection rol;
    String token;
}
