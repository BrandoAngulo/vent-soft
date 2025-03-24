package com.qualitysales.ventsoft.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "categoria")
@Builder
public class Category {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    @Column(name = "descripcion")
    private String description;
    private Boolean status;
}



/*
 // Calcular el tamaño máximo del nuevo array
        int maxTamaño = array1.length + array2.length;
        int[] resultado = new int[maxTamaño];
        int indiceResultado = 0;

        // Marcar los elementos de array1 como visitados
        boolean[] visitados = new boolean[maxTamaño];

        // Agregar elementos de array1 al resultado y marcarlos como visitados
        for (int num : array1) {
            resultado[indiceResultado++] = num;
            visitados[num] = true;
        }

        // Agregar elementos de array2 al resultado si no están visitados
        for (int num : array2) {
            if (!visitados[num]) {
                resultado[indiceResultado++] = num;
            }
        }

        // Crear un nuevo array con el tamaño correcto
        int[] resultadoFinal = new int[indiceResultado];
        System.arraycopy(resultado, 0, resultadoFinal, 0, indiceResultado);

        return resultadoFinal;
    }

    public static void main(String[] args) {
        int[] array1 = {1, 2, 3, 4, 5};
        int[] array2 = {4, 5, 6, 7};

        int[] resultado = encontrarElementosUnicos(array1, array2);

        // Imprimir el resultado
        for (int num : resultado) {
            System.out.print(num + " ");
        }
    }
        */