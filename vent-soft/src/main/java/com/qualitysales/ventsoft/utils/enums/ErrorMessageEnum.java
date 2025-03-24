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

    );
    private final String code;
    private final String recommendation;
    private final String message;

}
