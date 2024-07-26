package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@Entity
@Table(name = "cliente")
public class Client {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    @NotBlank
    @Column(name = "nombre")
    private String name;
    @NotBlank
    @Column(name = "apellido")
    private String lastName;
    @Column(name = "tipo_documento")
    private String docTipe;
    @Column(name = "documento")
    private String document;
    @ManyToOne
    @JoinColumn(name = "id_ciudad")
    private City city;
    @Column(name = "residencia")
    private String residence;
    @Column(name = "numero_celular")
    private String cellPhone;
    @Column(name = "correo")
    private String email;
    @Column(name = "estado")
    private String estate;

    @Override
    public String toString() {
        return "cliente{" + ", id= " + id + ", name" + name + ", lastName=" + lastName + ", docTipe="
                + docTipe + ", email" + email + "}";
    }
}
