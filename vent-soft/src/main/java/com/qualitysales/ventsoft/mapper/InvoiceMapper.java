package com.qualitysales.ventsoft.mapper;

import com.qualitysales.ventsoft.Controllers.DTO.ClientDTO;
import com.qualitysales.ventsoft.Controllers.DTO.RegisterUptadeInvoiceDTO;
import com.qualitysales.ventsoft.model.Client;
import com.qualitysales.ventsoft.model.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Set;

@Mapper(uses = {ItemInvoiceMapper.class, ClientMapper.class} )
public interface InvoiceMapper {

    InvoiceMapper MAPPER = Mappers.getMapper(InvoiceMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "invoiceCode", target = "invoiceCode")
    @Mapping(target = "client", expression = "java(toNombreCliente(invoice))")
    @Mapping(source = "date", target = "date")
    @Mapping(source = "total", target = "total")
    @Mapping(source = "itemInvoices", target = "itemInvoices")
    @Mapping(source = "status", target = "status")
    RegisterUptadeInvoiceDTO toInvoiceDTO(Invoice invoice);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "invoiceCode", target = "invoiceCode")
    @Mapping(source = "client", target = "client")
    @Mapping(source = "date", target = "date")
    @Mapping(source = "total", target = "total")
    @Mapping(source = "itemInvoices", target = "itemInvoices")
    @Mapping(source = "status", target = "status")
    Invoice toInvoiceDTOToInvoice(RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO);

    Set<RegisterUptadeInvoiceDTO> toInvoiceList(Set<Invoice> invoices);

    Set<Invoice> toInvoiceDTOList(List<Invoice> invoices);

    default ClientDTO toNombreCliente(Invoice invoice) {
        return ClientMapper.MAPPER.toClient(invoice.getClient());

    }
}
