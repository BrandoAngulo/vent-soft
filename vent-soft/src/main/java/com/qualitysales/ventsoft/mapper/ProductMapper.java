package com.qualitysales.ventsoft.mapper;

import com.qualitysales.ventsoft.Controllers.DTO.ProductDTO;
import com.qualitysales.ventsoft.Controllers.DTO.ProductResponseDTO;
import com.qualitysales.ventsoft.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductMapper {
    ProductMapper MAPPER = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "itemCode", target = "itemCode")
    ProductResponseDTO productToProductResponseDTO(Product product);

    @Mapping(source = "itemCode", target = "itemCode")
    Product productResponseDTOToProduct(ProductResponseDTO productResponseDTO);

    @Mapping(source = "itemCode", target = "itemCode")
    Product productDTOToProduct(ProductDTO productDTO);

}
