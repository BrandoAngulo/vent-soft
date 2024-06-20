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

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;

    @Override
    public List<RegisterUptadeInvoiceDTO> getInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        List<RegisterUptadeInvoiceDTO> registerUptadeInvoiceDTOList = InvoiceMapper.MAPPER.toInvoiceList(invoices);
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
        RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO = InvoiceMapper.MAPPER.toInvoiceDTO(invoice);
        try {
            log.info("getInvoice ok: {}", registerUptadeInvoiceDTO.toString());
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
    public RegisterUptadeInvoiceDTO updateInvoice(Integer id, RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO) {
        log.info("updateInvoice ok: {}, {}", id, registerUptadeInvoiceDTO);
        try {
            Invoice invoiceId = invoiceRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
            if (!Objects.equals(invoiceId.getClient().getId(), id)) {
                throw new IllegalArgumentException("Invoice not found");
            }
            Invoice invoiceUpdate = InvoiceMapper.MAPPER.toInvoiceDTOToInvoice(registerUptadeInvoiceDTO);
                return InvoiceMapper.MAPPER.toInvoiceDTO(invoiceRepository.save(invoiceUpdate));

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
                Boolean isActive = searchInvoice.getStatus();
                searchInvoice.setStatus(Boolean.TRUE.equals(isActive) ? Boolean.FALSE : Boolean.TRUE);
                invoiceRepository.save(searchInvoice);
                return searchInvoice.getStatus();

        } catch (Exception e) {
            log.error("anularInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }

    }

    @Override
    public List<RegisterUptadeInvoiceDTO> getInvoicesByCustomerId(Integer customerId) {
        Invoice invoice = invoiceRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO = InvoiceMapper.MAPPER.toInvoiceDTO(invoice);
        Client client = clientRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException("Client not found"));
        ClientDTO clientDTO = ClientMapper.MAPPER.toClient(client);
        List<Invoice> invoiceList = invoiceRepository.findAll();
        List<RegisterUptadeInvoiceDTO> registerUptadeInvoiceDTOList = InvoiceMapper.MAPPER.toInvoiceList(invoiceList);
        try {
            if(customerId.equals(clientDTO.getId())){
                log.info("getInvoicesByCustomerId ok: {}", registerUptadeInvoiceDTO.toString());
                invoiceRepository.findInvoiceByClientId(customerId);
                return registerUptadeInvoiceDTOList;
            }else {
                log.info("getInvoicesByCustomerId error: {}", registerUptadeInvoiceDTO.toString());
                throw new IllegalArgumentException("Customer id not match");
            }
        } catch (Exception e) {
            log.error("getInvoicesByCustomerId error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }
}
