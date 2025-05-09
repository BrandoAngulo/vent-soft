package com.qualitysales.ventsoft.utils.enums;

import com.qualitysales.ventsoft.utils.constants.Const;
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
            Const.VERIFY_PARAMS,
            "The customer is registered"

    ),
    ERROR_LOGIN(
            "3",
            Const.VERIFY_PARAMS,
            "Datos de acceso incorrectos"

    ),
    ERROR_DESCONOCIDO(
            "4",
            "Error no controlado",
            Const.COMMUNICATION_ADMIN
    ),
    INVALID_TOKEN(
            "5",
            "Iniciar sesion de nuevo",
            "Token expirado"
    ),
    USER_NOT_FOUND(
            "6",
            Const.VERIFY_PARAMS,
            "Usuario no encontrado "
    ),
    INTERNAL_SERVER_ERROR(
            "7",
            Const.COMMUNICATION_ADMIN,
            "Error interno del servidor"
    ),
    FOREIGN_KEY_VIOLATION(
            "8",
            Const.COMMUNICATION_ADMIN,
            "Error, la lave foranea viola la restriccion"
    );
    private final String code;
    private final String recommendation;
    private final String message;
}
