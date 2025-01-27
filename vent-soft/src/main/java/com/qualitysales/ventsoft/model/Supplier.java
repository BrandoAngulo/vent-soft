package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "proveedor")
@ToString
public class
Supplier {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    @Column(name = "nombre")
    private String name;
    @Column(name = "telefono")
    private String phone;
    @Column
    private String nit;

}
