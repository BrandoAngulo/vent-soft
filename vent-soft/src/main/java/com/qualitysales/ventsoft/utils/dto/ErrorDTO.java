package com.qualitysales.ventsoft.utils.dto;

import com.qualitysales.ventsoft.utils.enums.ErrorMessageEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorDTO {
    private String code;
    private String message;
    private String recommendation;

    public static ErrorDTO buildResponse(ErrorMessageEnum errorMessage){
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setCode(errorMessage.getCode());
        errorDTO.setMessage(errorMessage.getMessage());
        errorDTO.setRecommendation(errorMessage.getRecommendation());
        return errorDTO;
    }
}
