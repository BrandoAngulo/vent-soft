package com.qualitysales.ventsoft.utils.dto;

import com.qualitysales.ventsoft.utils.enums.ErrorMessageEnum;
import com.qualitysales.ventsoft.utils.enums.MessagesEnum;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

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

    public static GenericDTO success(Object data){
        GenericDTO genericDTO = new GenericDTO();
        genericDTO.setStatus(HttpStatus.OK.value());
        genericDTO.setPayload(data);
        return genericDTO;
    }

    public static GenericDTO error(ErrorMessageEnum errorMessage, Integer httpStatus){
        GenericDTO genericDTO = new GenericDTO();
        genericDTO.setStatus(httpStatus);
        genericDTO.setPayload(ErrorDTO.buildResponse(errorMessage));
        return genericDTO;
    }
}
