package com.qualitysales.ventsoft.service;

import com.qualitysales.ventsoft.Controllers.DTO.ClientDTO;
import com.qualitysales.ventsoft.model.Client;

import java.util.List;

public interface ClientService {
    ClientDTO getClient(Integer id);
    List<ClientDTO> getAllClients();
    List<ClientDTO> getClientByName(String firstName, String lastName);
    ClientDTO addClient(Client client);
    Client updateClient(Integer id, ClientDTO clientDTO);
    void deleteClient(Integer id);
}
