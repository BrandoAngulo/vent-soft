package com.qualitysales.ventsoft.mapper;

import com.qualitysales.ventsoft.Controllers.DTO.ItemInvoiceDTO;
import com.qualitysales.ventsoft.model.ItemInvoice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Set;

@Mapper(uses = ProductMapper.class)
public interface ItemInvoiceMapper {
    ItemInvoiceMapper MAPPER = Mappers.getMapper(ItemInvoiceMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "product", target = "product")
    ItemInvoiceDTO toItemInvoiceDTO(ItemInvoice itemInvoice);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "product", target = "product")
    ItemInvoice toItemInvoice(ItemInvoiceDTO itemInvoiceDTO);

    Set<ItemInvoiceDTO> toItemInvoiceDTOSet(Set<ItemInvoice> itemInvoices);
    Set<ItemInvoice> toItemInvoiceSet(Set<ItemInvoiceDTO> itemInvoiceDTOSet);
}
