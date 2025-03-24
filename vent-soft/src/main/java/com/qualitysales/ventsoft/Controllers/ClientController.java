package com.qualitysales.ventsoft.Controllers;

import com.qualitysales.ventsoft.Controllers.DTO.ClientDTO;
import com.qualitysales.ventsoft.Controllers.DTO.ClientRequestDTO;
import com.qualitysales.ventsoft.model.Client;
import com.qualitysales.ventsoft.service.impl.ClientServiceImpl;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import com.qualitysales.ventsoft.utils.enums.MessagesEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vent-soft/client")
@CrossOrigin
@Slf4j
public class ClientController {

    private final ClientServiceImpl clientService;

    public ClientController(ClientServiceImpl clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/get-client/{id}")
    public ResponseEntity<ClientDTO> getClient(@PathVariable Integer id) {
        ClientDTO clientDTO = clientService.getClient(id);
        return ResponseEntity.ok(clientDTO);
    }

    @GetMapping("/get-clients")
    public ResponseEntity<List<ClientDTO>> getClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }

    @GetMapping("/get-clients-by-name")
    public ResponseEntity<List<ClientDTO>> getClientsByName(@RequestParam String name, @RequestParam String lastName) {
        List<ClientDTO> clients = clientService.getClientByName(name, lastName);
        return ResponseEntity.ok(clients);
    }

    @PostMapping("/save")
    public ResponseEntity<GenericDTO> saveClient(@RequestBody Client client) {
        return ResponseEntity.ok(GenericDTO.success(clientService.addClient(client)));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Integer id, @RequestBody ClientRequestDTO clietRequestDTO) {
        log.info("Received update request for client ID: {}, with data: {}", id, clietRequestDTO);
        return ResponseEntity.ok(clientService.updateClient(id, clietRequestDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GenericDTO> deleteClient(@PathVariable Integer id) {
        return ResponseEntity.ok(clientService.deleteClient(id));
    }
}
