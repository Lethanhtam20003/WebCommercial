package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.ProductRequest;
import com.nlu.WebThuongMai.model.Category;
import com.nlu.WebThuongMai.model.ProductImage;
import com.nlu.WebThuongMai.repository.ProductRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Slf4j
@Service
public class ReadCSVFile {
    @Autowired
    ProductService productService;
    @Autowired
    CategoryService categoryService;

    public void readCSVFile() {
        String filePath = "D:\\isDoing\\ChuyenDeWeb\\WebCommercial\\backend\\src\\main\\resources\\db\\migration\\csvFiles\\product.csv";
        ArrayList<ProductRequest> listProduct = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> allRecords = reader.readAll();
            Set<String> listCate = allRecords.stream()
                    .skip(1)
                    .map(record -> record[2])
                    .collect(Collectors.toSet());
            listCate.forEach(System.out::println);
            listCate.forEach(categoryService::createCategory);

            listProduct =  allRecords.stream()
                    .skip(1)
                    .map(record -> ProductRequest.builder()
                            .name(record[0])
                            .images(Arrays.stream(record[1].split(";"))
                                    .filter(img -> !img.isBlank())
                                    .collect(Collectors.toSet()))
                            .categoryIds(Arrays.stream(record[2].split(";"))
                                    .map(cate -> categoryService.getCategoryId(cate))
                                    .filter(cate -> cate != -1)
                                    .collect(Collectors.toSet()))
                            .description(record[3])
                            .price(record[4])
                            .build()
                    ).collect(Collectors.toCollection(ArrayList::new));
//            listProduct.forEach(System.out::println);
            listProduct.forEach(productService::createProduct);
        } catch (IOException | CsvException e) {
            throw new RuntimeException(e);
        }
        log.info("CSV file written successfully");
    }


}
