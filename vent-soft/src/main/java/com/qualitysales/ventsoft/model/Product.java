package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "producto")
public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    @Column(name = "codigo_producto", length = 50)
    private Integer itemCode;
    @Column(name = "nombre", length = 50)
    private String name;
    @Column(name = "descripcion", length = 50)
    private String description;
    @ManyToOne
    @JoinColumn(name = "id_proveedor")
    private Supplier supplier;
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Category category;
    @Column(name = "precio")
    private BigDecimal price;
    @Column(name = "cantidad", length = 50)
    private Integer stock;
    @Column(name = "estado")
    private Boolean status;
    @OneToMany(mappedBy = "product")
    private Set<ItemInvoice> itemInvoices;

    @Override
    public String toString() {
        return "product{" + "id=" + id + ", itemCode=" + itemCode + ", name=" + name + ", description=" + description
                + ", price=" + price + ", stock=" + stock + "}";
    }

}
