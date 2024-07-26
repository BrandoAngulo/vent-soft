package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "producto")
public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    @Column(name = "nombre")
    private String name;
    @Column(name = "descripcion")
    private String description;
    @ManyToOne
    @JoinColumn(name = "id_proveedor")
    private Supplier supplier;
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Category category;
    @Column(name = "precio")
    private BigDecimal price;
    @Column(name = "cantidad")
    private Integer stock;

}
