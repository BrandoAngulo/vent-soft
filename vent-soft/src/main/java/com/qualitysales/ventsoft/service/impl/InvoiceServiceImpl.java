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
import com.qualitysales.ventsoft.utils.DateUtils;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import com.qualitysales.ventsoft.utils.enums.MessagesEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContextException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ClientRepository clientRepository;
    private final ItemInvoiceRepository itemInvoiceRepository;
    private final ProductRepository productRepository;
    private final DateUtils dateUtils;

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
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Invoice not found"));
        RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO = InvoiceMapper.MAPPER.toInvoiceDTO(invoice);
        try {
            log.info("getInvoice ok: {}", invoice);
            return registerUptadeInvoiceDTO;
        } catch (RuntimeException e) {
            log.error("getInvoice error: {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public RegisterUptadeInvoiceDTO saveInvoice(Invoice invoice) {
        log.info("saveInvoice ok: {}", invoice.toString());
        try {
            stockValidate(invoice.getItemInvoices());

            // Asegurémonos de que el cliente esté asignado desde el inicio
            if (invoice.getClient() == null || invoice.getClient().getId() == null) {
                throw new IllegalArgumentException("El cliente de la factura no está especificado");
            }

            // Guardamos la factura inicialmente
            invoiceRepository.save(invoice);

            // Si existen ItemInvoices, procesamos los productos y calculamos el total
            if (!invoice.getItemInvoices().isEmpty()) {
                Set<ItemInvoice> itemInvoices = invoice.getItemInvoices().stream().map(itemInvoice -> {
                    Product product = productRepository.findById(itemInvoice.getProduct().getId())
                            .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + itemInvoice.getProduct().getId()));

                    // Actualizamos el stock del producto
                    product.setStock(product.getStock() - itemInvoice.getAmountSold());
                    productRepository.save(product); // Guardamos el producto actualizado

                    // Asociamos el ItemInvoice a la factura
                    itemInvoice.setInvoice(invoice);
                    return itemInvoiceRepository.save(itemInvoice); // Guardamos cada ItemInvoice
                }).collect(Collectors.toSet());

                // Calculamos el total de la factura y lo asignamos
                BigDecimal totalInvoice = calculateInvoiceTotal(itemInvoices);
                invoice.setTotal(totalInvoice);
            }

            // Actualizamos la fecha y el cliente
            invoice.setDate(dateUtils.getLocalDate());
            // Buscamos el cliente usando su ID correcto
            Client client = clientRepository.findById(invoice.getClient().getId())
                    .orElseThrow(() -> new RuntimeException("Cliente no encontrado con ID: " + invoice.getClient().getId()));
            invoice.setClient(client);

            // Volvemos a guardar la factura con el total y cliente actualizados
            invoiceRepository.save(invoice);

            // Convertimos la factura a DTO y la retornamos
            RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO = InvoiceMapper.MAPPER.toInvoiceDTO(invoice);
            log.info("saveInvoice success: {}", registerUptadeInvoiceDTO);
            return registerUptadeInvoiceDTO;

        } catch (RuntimeException e) {
            log.error("saveInvoice error: {}", e.getMessage());
            throw new IllegalArgumentException(e);
        }
    }

    public void stockValidate(Set<ItemInvoice> items){
        for (ItemInvoice item : items) {
            Integer idProducto = item.getProduct().getId();
            Integer cantSold = item.getAmountSold();

            Product product = productRepository.findById(idProducto).orElseThrow(() -> new RuntimeException("Product not found with ID: " + idProducto));

            if (product.getStock() < cantSold) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }
        }
    }

    @Override
    public RegisterUptadeInvoiceDTO updateInvoice(Integer id, RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO) {
        log.info("updateInvoice ok: {}", registerUptadeInvoiceDTO);
        Invoice invoiceId = invoiceRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        Client client = ClientMapper.MAPPER.toClientDTO(registerUptadeInvoiceDTO.client());
        try {
            if (invoiceId.getId().equals(registerUptadeInvoiceDTO.id())) {
                System.out.println("client >>>> entro= " + client);
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
    public GenericDTO anularInvoice(Integer id) {
        log.info("anularInvoice ok: {}", id);
        Invoice searchInvoice = invoiceRepository.findById(id).orElseThrow(
                () -> new ApplicationContextException(MessagesEnum.REQUEST_FAILED.getMessage(), null));
        try {
            Boolean isActive = searchInvoice.isStatus();
            searchInvoice.setStatus(Boolean.TRUE.equals(isActive) ? Boolean.FALSE : Boolean.TRUE);
            invoiceRepository.save(searchInvoice);
            searchInvoice.isStatus();
            return GenericDTO.genericSuccess(MessagesEnum.REQUEST_SUCCESS, HttpStatus.OK.value());

        } catch (Exception e) {
            log.error("anularInvoice error: {}", e.getMessage());
            throw new ApplicationContextException(e.getMessage());
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

    private BigDecimal calculateItemTotalPrice(ItemInvoice itemInvoice) {
        Product product = productRepository.findById(itemInvoice.getProduct().getId()).orElseThrow(() -> new IllegalArgumentException("Product not found"));
        BigDecimal price = product.getPrice();
        BigDecimal quantity = new BigDecimal(itemInvoice.getAmountSold());

        return price.multiply(quantity);

    }

    private BigDecimal calculateInvoiceTotal(Set<ItemInvoice> itemInvoices) {
        try {
            BigDecimal valorT = itemInvoices.stream().
                    map(this::calculateItemTotalPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            System.out.println("valorT>>>> = " + valorT);
            return valorT;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
