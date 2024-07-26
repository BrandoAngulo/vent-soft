package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.Controllers.DTO.CityDTO;
import com.qualitysales.ventsoft.Controllers.DTO.ClientDTO;
import com.qualitysales.ventsoft.Controllers.DTO.ClientRequestDTO;
import com.qualitysales.ventsoft.mapper.CityMapper;
import com.qualitysales.ventsoft.mapper.ClientMapper;
import com.qualitysales.ventsoft.model.City;
import com.qualitysales.ventsoft.model.Client;
import com.qualitysales.ventsoft.repository.CityRepository;
import com.qualitysales.ventsoft.repository.ClientRepository;
import com.qualitysales.ventsoft.service.ClientService;
import com.qualitysales.ventsoft.utils.HttpClientUtil;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.internal.bytebuddy.implementation.bytecode.Throw;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
@Slf4j
public class ClientServiceImpl implements ClientService {

    private final HttpClientUtil httpClientUtil;
    private EntityManager entityManager;

    public ClientServiceImpl(ClientRepository clientRepository, HttpClientUtil httpClientUtil, CityRepository cityRepository) {
        this.clientRepository = clientRepository;
        this.httpClientUtil = httpClientUtil;
        this.cityRepository = cityRepository;
    }

    private final ClientRepository clientRepository;
    private final CityRepository cityRepository;

    @Override
    public ClientDTO getClient(Integer id) {
        Client client = clientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid client ID"));
        ClientDTO clientDTO = ClientMapper.MAPPER.toClient(client);

        try {
            log.info("getClient ok: {}", clientDTO);
            return clientDTO;
        } catch (Exception e) {
            log.error("getClient Error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public List<ClientDTO> getAllClients() {
        List<Client> clients = clientRepository.findAll();
        List<ClientDTO> clientDTOS = ClientMapper.MAPPER.toClients(clients);

        try {
            log.info("getAllClients ok: {}", clientDTOS);
            return clientDTOS;
        } catch (Exception e) {
            log.error("getAllClients Error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }

    }

    @Override
    public List<ClientDTO> getClientByName(String firstName, String lastName) {
        List<Client> clients = clientRepository.findByNameOrLastName(firstName, lastName);
        List<ClientDTO> clientDTOS = ClientMapper.MAPPER.toClients(clients);
        if (clientDTOS.isEmpty()) {
            log.error("getClientByName Error no client exist {}", clientDTOS);
            throw new IllegalArgumentException("No Client found with name or lastname = " + firstName + " " + lastName);
        }
        try {
            log.info("getClientByName ok: {}", clientDTOS);
            return clientDTOS;
        } catch (Exception e) {
            log.error("getClientByName Error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public ClientDTO addClient(Client client) {
        log.info("Client: {}",client);
        City city = cityRepository.findById(client.getCity().getId()).orElseThrow(() -> new IllegalArgumentException("City not found"));
        try {
            if (city == null ) {
                throw new IllegalArgumentException("City is null");
            } else {
                ClientDTO clientDTO = ClientMapper.MAPPER.toClient(client);
                Client client1 = ClientMapper.MAPPER.toClientDTO(clientDTO);
                clientRepository.save(client1);
                log.info("addClient ok: {}", client);
                return clientDTO;
            }
        } catch (Exception e) {
            log.error("addClient Error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public Client updateClient(Integer id, ClientRequestDTO clientrequestDTO) {
        Client idClient = clientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid client ID"));
        log.info("updateClient idClient ok: {}", idClient);
        City city = cityRepository.findById(idClient.getCity().getId()).orElseThrow(() -> new IllegalArgumentException("Invalid city ID"));
        log.info("updateClient city ok: {}", city);
        City city1 = CityMapper.MAPPER.toCityDTO(clientrequestDTO.getCity());

        try {
            idClient.setName(clientrequestDTO.getName());
            idClient.setLastName(clientrequestDTO.getLastName());
            idClient.setDocument(clientrequestDTO.getDocument());
            idClient.setCity(city1);
            idClient.setResidence(clientrequestDTO.getResidence());
            idClient.setCellPhone(clientrequestDTO.getCellPhone());
            idClient.setEmail(clientrequestDTO.getEmail());
            idClient.setEstate(clientrequestDTO.getEstate());

            Client updatedClient = clientRepository.save(idClient);

            log.info("updateClient ok: {}", clientrequestDTO);

            return updatedClient;

        } catch (Exception e) {
            log.error("updateClient Error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public void deleteClient(Integer id) {
        Client client = clientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid client ID"));
        try {
            log.info("deleteClient ok: {}", client);
            clientRepository.deleteById(client.getId());
        } catch (Exception e) {
            log.error("deleteClient Error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }

    }

}
