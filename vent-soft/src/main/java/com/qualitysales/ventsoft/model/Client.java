package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
@Entity
@Table(name = "cliente")
public class Client {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    @NotBlank
    private String name;
    @NotBlank
    private String lastName;
    private String docTipe;
    private String document;
    @ManyToOne
    @JoinColumn(name = "id_ciudad")
    private City city;
    private String residence;
    private String cellPhone;
    private String email;
    private String estate;
}
