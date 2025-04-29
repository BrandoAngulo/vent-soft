package com.qualitysales.ventsoft.Controllers;

import com.qualitysales.ventsoft.service.RolesService;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("api/vent-soft/roles")
public class RolesController {

    private final RolesService rolesService;

    public RolesController(RolesService rolesService) {
        this.rolesService = rolesService;
    }

    @GetMapping("find-all")
    public ResponseEntity<GenericDTO> list(){

        return ResponseEntity.ok(GenericDTO.success(rolesService.findAllRoles()));
    }
}
