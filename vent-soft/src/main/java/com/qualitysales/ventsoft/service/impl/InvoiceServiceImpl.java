package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.Controllers.DTO.ClientDTO;
import com.qualitysales.ventsoft.Controllers.DTO.RegisterUptadeInvoiceDTO;
import com.qualitysales.ventsoft.mapper.ClientMapper;
import com.qualitysales.ventsoft.mapper.InvoiceMapper;
import com.qualitysales.ventsoft.model.Client;
import com.qualitysales.ventsoft.model.Invoice;
import com.qualitysales.ventsoft.model.ItemInvoice;
import com.qualitysales.ventsoft.model.Product;
import com.qualitysales.ventsoft.repository.ClientRepository;
import com.qualitysales.ventsoft.repository.InvoiceRepository;
import com.qualitysales.ventsoft.repository.ItemInvoiceRepository;
import com.qualitysales.ventsoft.repository.ProductRepository;
import com.qualitysales.ventsoft.service.InvoiceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.View;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;
    private final View error;
    private final ItemInvoiceRepository itemInvoiceRepository;
    private final ProductRepository productRepository;

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
        log.info("saveInvoice ok: {}", invoice.toString());
        try {
            invoiceRepository.save(invoice);
            if (invoice.getItemInvoices()!= null && !invoice.getItemInvoices().isEmpty()){
                Set<ItemInvoice> itemInvoices = invoice.getItemInvoices().stream().map(itemInvoice -> {
                    itemInvoice.setInvoice(invoice);
                    return itemInvoiceRepository.save(itemInvoice);
                        }).collect(Collectors.toSet());

                // Calcular el total de la factura antes de guardar
                BigDecimal totalInvoice = calculateInvoiceTotal(itemInvoices);
                invoice.setTotal(totalInvoice);

            }
            invoiceRepository.save(invoice);

            RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO = InvoiceMapper.MAPPER.toInvoiceDTO(invoice);
            log.info("saveInvoice success: {}", registerUptadeInvoiceDTO);
            return registerUptadeInvoiceDTO;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("saveInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public RegisterUptadeInvoiceDTO updateInvoice(RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO) {
        log.info("updateInvoice ok: {}", registerUptadeInvoiceDTO);
            Invoice invoiceId = invoiceRepository.findById(registerUptadeInvoiceDTO.id()).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
            Client client = ClientMapper.MAPPER.toClientDTO(registerUptadeInvoiceDTO.client());
        try {
            if (invoiceId.getId().equals(registerUptadeInvoiceDTO.id())) {
                invoiceId.setInvoiceCode(registerUptadeInvoiceDTO.invoiceCode());
                invoiceId.setDate(registerUptadeInvoiceDTO.date());
                invoiceId.setClient(client);
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

    private BigDecimal calculateItemTotalPrice(ItemInvoice itemInvoice){
        Product product = productRepository.findById(itemInvoice.getProduct().getId()).orElseThrow(() -> new IllegalArgumentException("Product not found"));
        BigDecimal price = product.getPrice();
        BigDecimal quantity =new BigDecimal(itemInvoice.getProduct().getStock());

        return price.multiply(quantity);

    }

    private BigDecimal calculateInvoiceTotal(Set<ItemInvoice> itemInvoices){
        return itemInvoices.stream().
                map(this::calculateItemTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
