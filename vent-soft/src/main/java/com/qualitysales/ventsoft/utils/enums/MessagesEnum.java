package com.qualitysales.ventsoft.utils.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MessagesEnum {

    REQUEST_SUCCESS(
            "1",
            "Successful request"
    ),
    REQUEST_FAILED(
            "2",
            "Request failed"
    );
    private final String codeMessage;
    private final String message;
}
