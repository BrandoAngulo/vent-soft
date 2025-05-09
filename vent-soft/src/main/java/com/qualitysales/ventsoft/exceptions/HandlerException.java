package com.qualitysales.ventsoft.exceptions;

import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import com.qualitysales.ventsoft.utils.enums.ErrorMessageEnum;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class HandlerException {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<GenericDTO> handleGenericException(Exception ex) {
        log.error("Unexpected error: {}", ex.getMessage());
        GenericDTO errorResponse = GenericDTO.error(ErrorMessageEnum.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<GenericDTO> handleDataIntegrityViolationException() {
        GenericDTO errorResponse = GenericDTO.error(ErrorMessageEnum.FOREIGN_KEY_VIOLATION, HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
