package com.qualitysales.ventsoft.utils.dto;

import com.qualitysales.ventsoft.utils.enums.MessagesEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuccessDTO {
    String code;
    String messsage;

    public static SuccessDTO buildResponse(MessagesEnum messagesEnum) {
        SuccessDTO successDTO = new SuccessDTO();
        successDTO.setCode(messagesEnum.getCodeMessage());
        successDTO.setMesssage(messagesEnum.getMessage());
        return successDTO;
    }
}
