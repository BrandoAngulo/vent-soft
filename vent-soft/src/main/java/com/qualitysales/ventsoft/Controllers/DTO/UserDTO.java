package com.qualitysales.ventsoft.Controllers.DTO;

import com.qualitysales.ventsoft.model.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDTO {

    private Integer id;
    @NotBlank
    private String name;
    private String lastName;
    private String login;
    private String password;
    private String code;
    private String email;
    private Boolean status;
    private Set<Role> roles;
}
