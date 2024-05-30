package com.qualitysales.ventsoft.repository;

import com.qualitysales.ventsoft.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    List<Invoice> findInvoiceByClientId(int customerId);
}
