package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.Controllers.DTO.ClientDTO;
import com.qualitysales.ventsoft.Controllers.DTO.RegisterUptadeInvoiceDTO;
import com.qualitysales.ventsoft.mapper.ClientMapper;
import com.qualitysales.ventsoft.mapper.InvoiceMapper;
import com.qualitysales.ventsoft.model.Client;
import com.qualitysales.ventsoft.model.Invoice;
import com.qualitysales.ventsoft.repository.ClientRepository;
import com.qualitysales.ventsoft.repository.InvoiceRepository;
import com.qualitysales.ventsoft.service.InvoiceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;

    @Override
    public Set<RegisterUptadeInvoiceDTO> getInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        Set<RegisterUptadeInvoiceDTO> registerUptadeInvoiceDTOList = InvoiceMapper.MAPPER.toInvoiceList(new HashSet<>(invoices));
        try {
            log.info("getInvoices ok: {}", registerUptadeInvoiceDTOList.toString());
            return registerUptadeInvoiceDTOList;
        } catch (RuntimeException e) {
            log.error("getInvoices error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public RegisterUptadeInvoiceDTO getInvoice(Integer id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        System.out.println("invoice = " + invoice);
        RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO = InvoiceMapper.MAPPER.toInvoiceDTO(invoice);
        try {
            log.info("getInvoice ok: {}", invoice);
            return registerUptadeInvoiceDTO;
        } catch (Exception e) {
            log.error("getInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public RegisterUptadeInvoiceDTO saveInvoice(Invoice invoice) {
        log.info("saveInvoice ok: {}", invoice);
        try {
            RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO = InvoiceMapper.MAPPER.toInvoiceDTO(invoice);
            invoiceRepository.save(invoice);
            return registerUptadeInvoiceDTO;
        } catch (Exception e) {
            log.error("saveInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public RegisterUptadeInvoiceDTO updateInvoice(RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO) {
        log.info("updateInvoice ok: {}", registerUptadeInvoiceDTO);
            Invoice invoiceId = invoiceRepository.findById(registerUptadeInvoiceDTO.id()).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        try {
            if (invoiceId.getId().equals(registerUptadeInvoiceDTO.id())) {
                invoiceId.setInvoiceCode(registerUptadeInvoiceDTO.invoiceCode());
                invoiceId.setDate(registerUptadeInvoiceDTO.date());
                invoiceId.setClient(registerUptadeInvoiceDTO.client());
                invoiceId.setTotal(registerUptadeInvoiceDTO.total());
                invoiceId.setStatus(registerUptadeInvoiceDTO.status());
                return InvoiceMapper.MAPPER.toInvoiceDTO(invoiceRepository.save(invoiceId));
            } else {

                throw new IllegalArgumentException("Invoice not found");
            }


        } catch (Exception e) {
            log.error("updateInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }

    }

    @Override
    public boolean anularInvoice(Integer id) {
        log.info("anularInvoice ok: {}", id);
        Invoice searchInvoice = invoiceRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        try {
            Boolean isActive = searchInvoice.isStatus();
            searchInvoice.setStatus(Boolean.TRUE.equals(isActive) ? Boolean.FALSE : Boolean.TRUE);
            invoiceRepository.save(searchInvoice);
            return searchInvoice.isStatus();

        } catch (Exception e) {
            log.error("anularInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }

    }

    @Override
    public Set<RegisterUptadeInvoiceDTO> getInvoicesByCustomerId(Integer customerId) {
        Invoice invoice = invoiceRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO = InvoiceMapper.MAPPER.toInvoiceDTO(invoice);
        Client client = clientRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException("Client not found"));
        ClientDTO clientDTO = ClientMapper.MAPPER.toClient(client);
        List<Invoice> invoiceList = invoiceRepository.findAll();
        Set<RegisterUptadeInvoiceDTO> registerUptadeInvoiceDTOList = InvoiceMapper.MAPPER.toInvoiceList(new HashSet<>(invoiceList));
        try {
            if (customerId.equals(clientDTO.getId())) {
                log.info("getInvoicesByCustomerId ok: {}", registerUptadeInvoiceDTO.toString());
                invoiceRepository.findInvoiceByClientId(customerId);
                return registerUptadeInvoiceDTOList;
            } else {
                log.info("getInvoicesByCustomerId error: {}", registerUptadeInvoiceDTO.toString());
                throw new IllegalArgumentException("Customer id not match");
            }
        } catch (Exception e) {
            log.error("getInvoicesByCustomerId error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }
}
