package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.Controllers.DTO.ClientDTO;
import com.qualitysales.ventsoft.Controllers.DTO.InvoiceDTO;
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

@Service
@AllArgsConstructor
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;

    @Override
    public List<InvoiceDTO> getInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        List<InvoiceDTO> invoiceDTOList = InvoiceMapper.MAPPER.toInvoiceList(invoices);
        try {
            log.info("getInvoices ok: {}", invoiceDTOList.toString());
            return invoiceDTOList;
        } catch (RuntimeException e) {
            log.error("getInvoices error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public InvoiceDTO getInvoice(Integer id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        InvoiceDTO invoiceDTO = InvoiceMapper.MAPPER.toInvoice(invoice);
        try {
            log.info("getInvoice ok: {}", invoiceDTO.toString());
            return invoiceDTO;
        } catch (Exception e) {
            log.error("getInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public InvoiceDTO saveInvoice(Invoice invoice) {

        try {
            InvoiceDTO invoiceDTO = InvoiceMapper.MAPPER.toInvoice(invoice);
            invoiceRepository.save(invoice);
            log.info("saveInvoice ok: {}", invoiceDTO.toString());
            return invoiceDTO;
        } catch (Exception e) {
            log.error("saveInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public Invoice updateInvoice(Integer id, InvoiceDTO invoiceDTO) {
        System.out.println("invoice = " + invoiceDTO);
        Invoice invoiceId = invoiceRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        try {
            if (invoiceId.getId().equals(id)){
                log.info("updateInvoice ok: {}", invoiceDTO);
                invoiceId.setInvoiceCode(invoiceDTO.getInvoiceCode());
                invoiceId.setClient(invoiceDTO.getClient());
                invoiceId.setDate(invoiceDTO.getDate());
                invoiceId.setTotal(invoiceDTO.getTotal());
                invoiceId.setItemInvoice(invoiceDTO.getItemInvoice());
                invoiceId.setStatus(invoiceDTO.getStatus());
                invoiceRepository.save(invoiceId);
            }else {
                log.info("updateInvoice error: {}", invoiceDTO);
                throw new IllegalArgumentException("Invoice id not match");
            }
            return invoiceId;
        } catch (Exception e) {
            log.error("updateInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }

    }

    @Override
    public Invoice anularInvoice(Integer id) {
            Invoice searchInvoice = invoiceRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));

        try {
            if (searchInvoice.getId().equals(id)){
                String active = "I";
                log.info("anularInvoice ok: {}", searchInvoice);
                searchInvoice.setStatus(active);
                invoiceRepository.save(searchInvoice);
            }else {
                log.info("anularInvoice error: {}", searchInvoice);
                throw new IllegalArgumentException("Invoice id not match");
            }
            return searchInvoice;
        } catch (Exception e) {
            log.error("anularInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }

    }

    @Override
    public List<InvoiceDTO> getInvoicesByCustomerId(Integer customerId) {
        Invoice invoice = invoiceRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        InvoiceDTO invoiceDTO = InvoiceMapper.MAPPER.toInvoice(invoice);
        Client client = clientRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException("Client not found"));
        ClientDTO clientDTO = ClientMapper.MAPPER.toClient(client);
        List<Invoice> invoiceList = invoiceRepository.findAll();
        List<InvoiceDTO> invoiceDTOList = InvoiceMapper.MAPPER.toInvoiceList(invoiceList);
        try {
            if(customerId.equals(clientDTO.getId())){
                log.info("getInvoicesByCustomerId ok: {}", invoiceDTO.toString());
                invoiceRepository.findInvoiceByClientId(customerId);
                return invoiceDTOList;
            }else {
                log.info("getInvoicesByCustomerId error: {}", invoiceDTO.toString());
                throw new IllegalArgumentException("Customer id not match");
            }
        } catch (Exception e) {
            log.error("getInvoicesByCustomerId error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }
}
