package com.qualitysales.ventsoft.utils.dto;

import com.qualitysales.ventsoft.utils.enums.MessagesEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenericDTO {
    private Integer status;
    private Object payload;

    public static GenericDTO genericSuccess(MessagesEnum messagesEnum, Integer httpStatus){
        GenericDTO genericDTO = new GenericDTO();
        genericDTO.setStatus(httpStatus);
        genericDTO.setPayload(SuccessDTO.buildResponse(messagesEnum));
        return genericDTO;
    }
}
