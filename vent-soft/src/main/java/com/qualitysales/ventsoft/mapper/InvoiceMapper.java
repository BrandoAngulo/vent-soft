package com.qualitysales.ventsoft.mapper;

import com.qualitysales.ventsoft.Controllers.DTO.RegisterUptadeInvoiceDTO;
import com.qualitysales.ventsoft.model.Invoice;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface InvoiceMapper {

    InvoiceMapper MAPPER = Mappers.getMapper(InvoiceMapper.class);

    RegisterUptadeInvoiceDTO toInvoiceDTO(Invoice invoice);
    Invoice toInvoiceDTOToInvoice(RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO);

    List<RegisterUptadeInvoiceDTO> toInvoiceList(List<Invoice> invoices);
    List<Invoice> toInvoiceDTOList(List<Invoice> invoices);
}
