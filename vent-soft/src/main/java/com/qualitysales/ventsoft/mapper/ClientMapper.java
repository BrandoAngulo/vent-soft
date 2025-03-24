package com.qualitysales.ventsoft.mapper;

import com.qualitysales.ventsoft.Controllers.DTO.ClientDTO;
import com.qualitysales.ventsoft.model.Client;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ClientMapper {
    ClientMapper MAPPER = Mappers.getMapper(ClientMapper.class);

    Client toClientDTO(ClientDTO clientDTO);
    ClientDTO toClient(Client client);

    List<Client> toClientsDTO(List<ClientDTO> clientDTO);
    List<ClientDTO> toClients(List<Client> client);

}

