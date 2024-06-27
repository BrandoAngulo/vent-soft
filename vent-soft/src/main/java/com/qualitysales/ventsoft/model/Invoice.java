package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;

import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Entity
@Table(name = "factura")
public class Invoice {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String invoiceCode;
    @ManyToOne
    private Client client;
    @Column(length = 10)
    private String date;
    private BigDecimal total;
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ItemInvoice> itemInvoices;
    @Column(length = 10, nullable = false)
    private boolean status;
}
