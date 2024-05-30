package com.qualitysales.ventsoft.repository;

import com.qualitysales.ventsoft.model.ItemInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemInvoiceRepository extends JpaRepository<ItemInvoice, Integer> {
}