package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;

import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Entity
@Table(name = "itemfactura")
public class ItemInvoice {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "id_producto")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "id_factura")
    private Invoice invoice;
}
