package com.qualitysales.ventsoft.utils.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorMessageEnum {
    CUSTOMER_REGISTERED(
            "1",
            "Verify the information and try again.",
            "The customer is registered"

    ),
    DATA_NOT_FOUND(
            "2",
            "Verify the information and try again.",
            "The customer is registered"

    ),
    ERROR_LOGIN(
            "3",
            "Datos de acceso incorrectos",
            "Verifique las credenciales e intente de nuevo"

    ),
    ERROR_DESCONOCIDO(
            "500",
            "Error no controlado",
            "Comuniquese con el administrador del sistema"
    );
    private final String code;
    private final String recommendation;
    private final String message;

}
