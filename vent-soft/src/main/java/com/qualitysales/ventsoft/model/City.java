package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Builder
@Table(name = "ciudad")
public class City {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id_ciudad")
    private Integer id;
    //@NotBlank(message = "el campo no puede estar vacio")
    @Column(name = "codigo")
    private String code;
    //@NotBlank(message = "el campo no puede estar vacio")
    @Column(name = "nombre")
    private String name;
}
