package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
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
    @Column(name = "apellido")
    private String lastName;
    @Column(name = "telefono")
    private String cellPhone;
    @Column
    private String nit;
    @Column(name = "estado")
    private Boolean status;

}
