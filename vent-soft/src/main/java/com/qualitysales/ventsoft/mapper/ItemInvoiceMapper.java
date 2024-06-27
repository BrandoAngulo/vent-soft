package com.qualitysales.ventsoft.mapper;

import com.qualitysales.ventsoft.Controllers.DTO.ItemInvoiceDTO;
import com.qualitysales.ventsoft.model.ItemInvoice;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.Set;

@Mapper
public interface ItemInvoiceMapper {
    ItemInvoiceMapper MAPPER = Mappers.getMapper(ItemInvoiceMapper.class);

    ItemInvoiceDTO toItemInvoiceDTO(ItemInvoice itemInvoice);
    ItemInvoice toItemInvoice(ItemInvoiceDTO itemInvoiceDTO);

    Set<ItemInvoiceDTO> toItemInvoiceDTOSet(Set<ItemInvoice> itemInvoices);
    Set<ItemInvoice> toItemInvoiceSet(Set<ItemInvoiceDTO> itemInvoiceDTOSet);
}
