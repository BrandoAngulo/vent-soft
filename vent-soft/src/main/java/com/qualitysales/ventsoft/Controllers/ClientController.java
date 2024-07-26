package com.qualitysales.ventsoft.Controllers;

import com.qualitysales.ventsoft.Controllers.DTO.ClientDTO;
import com.qualitysales.ventsoft.model.Client;
import com.qualitysales.ventsoft.service.impl.ClientServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventsoft/client")
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
    public ResponseEntity<ClientDTO> saveClient(@RequestBody Client client) {
        return ResponseEntity.ok().body(clientService.addClient(client));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Integer id, @RequestBody ClientDTO clientDTO) {
        log.info("Received update request for client ID: {}, with data: {}", id, clientDTO);
        return ResponseEntity.ok(clientService.updateClient(id, clientDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteClient(@PathVariable Integer id) {
        clientService.deleteClient(id);
        return ResponseEntity.ok().body("Client deleted successfully");
    }
}
