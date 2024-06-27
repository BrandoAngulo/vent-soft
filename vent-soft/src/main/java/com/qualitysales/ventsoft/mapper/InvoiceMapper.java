package com.qualitysales.ventsoft.mapper;

import com.qualitysales.ventsoft.Controllers.DTO.RegisterUptadeInvoiceDTO;
import com.qualitysales.ventsoft.model.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Set;

@Mapper(uses = ItemInvoiceMapper.class)
public interface InvoiceMapper {

    InvoiceMapper MAPPER = Mappers.getMapper(InvoiceMapper.class);

    @Mapping(target = "itemInvoices", source = "itemInvoices")
    RegisterUptadeInvoiceDTO toInvoiceDTO(Invoice invoice);
    @Mapping(target = "itemInvoices", source = "itemInvoices")
    Invoice toInvoiceDTOToInvoice(RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO);

    @Mapping(target = "itemInvoices", source = "itemInvoices")
    Set<RegisterUptadeInvoiceDTO> toInvoiceList(Set<Invoice> invoices);
    @Mapping(target = "itemInvoices", source = "itemInvoices")
    Set<Invoice> toInvoiceDTOList(List<Invoice> invoices);
}
