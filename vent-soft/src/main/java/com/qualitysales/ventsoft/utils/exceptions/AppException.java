package com.qualitysales.ventsoft.utils.exceptions;

import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import com.qualitysales.ventsoft.utils.enums.ErrorMessageEnum;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class AppException extends Exception {
    private final ErrorMessageEnum errorMessagesEnum;
    private final Integer status;
    private final String[] parametros;

    public AppException(ErrorMessageEnum errorMessagesEnum, Integer status, String... parametros) {
        super(errorMessagesEnum.getMessage());
        this.errorMessagesEnum = errorMessagesEnum;
        this.status = status;
        this.parametros = parametros;
    }

    private static String buildMessage(ErrorMessageEnum errorMessagesEnum, String[] parametros) {
        String mensajeBase = errorMessagesEnum.getMessage();
        if (parametros != null && parametros.length > 0) {
            return String.format(mensajeBase, (Object[]) parametros);
        }
        return mensajeBase;
    }

    public static AppException getException(Exception e) {
        if (e instanceof AppException appException) {
            return appException;
        }
        return new AppException(ErrorMessageEnum.ERROR_DESCONOCIDO, HttpStatus.BAD_REQUEST.value());
    }

    public GenericDTO getException() {
        return GenericDTO.error(ErrorMessageEnum.INVALID_TOKEN, HttpStatus.UNAUTHORIZED.value());
    }

}
