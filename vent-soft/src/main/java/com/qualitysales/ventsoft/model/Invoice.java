package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;

import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Entity
@Table(name = "factura", uniqueConstraints = @UniqueConstraint(columnNames = {"invoice_code"}))
public class Invoice {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String invoiceCode;
    @ManyToOne
    private Client client;
    @Column(length = 10)
    private LocalDate date;
    private BigDecimal total;
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL)
    private Set<ItemInvoice> itemInvoices;
    @Column(length = 10, nullable = false)
    private boolean status;

    @Override
    public String toString() {
        return "Invoice{" +
                "id=" + id +
                ", invoiceCode='" + invoiceCode + '\'' +
                ", Client=" + client +
                ", date='" + date + '\'' +
                ", total=" + total +
                ", itemInvoices=" + itemInvoices +
                ", status=" + status +
                '}';
    }
}
