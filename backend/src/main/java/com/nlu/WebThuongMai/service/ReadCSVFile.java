package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.ProductCreatetionRequest;
import com.nlu.WebThuongMai.dto.request.productReq.ProductRequest;
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

    public static void main(String[] args) {
        String fileName = "D:\\WebCommercial-\\backend\\src\\main\\resources\\db\\migration\\csvFiles\\allProducts.csv";
        try (CSVReader reader = new CSVReader(new FileReader(fileName))) {
            List<String[]> records = reader.readAll();
            records.stream()
                    .skip(1)
                    .map(record -> Integer.parseInt(record[4].substring(0, record[4].indexOf("₫")).replace(".", "")))
                    .forEach(System.out::println);
        } catch (IOException | CsvException e) {
            throw new RuntimeException(e);
        }

    }

    public void readCSVFile() {
        String filePath = "D:\\isDoing\\ChuyenDeWeb\\WebCommercial\\backend\\src\\main\\resources\\db\\migration\\csvFiles\\allProducts.csv";

        ArrayList<ProductCreatetionRequest> listProduct = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> allRecords = reader.readAll();
            Set<String> listCate = allRecords.stream()
                    .skip(1)
                    .map(record -> record[2])
                    .collect(Collectors.toSet());
            listCate.forEach(System.out::println);
            listCate.forEach(categoryService::createCategory);

            listProduct = allRecords.stream()
                    .skip(1)
                    .map(record -> ProductCreatetionRequest.builder()
                            .name(record[0])
                            .images(Arrays.stream(record[1].split(";"))
                                    .filter(img -> !img.isBlank())
                                    .collect(Collectors.toSet()))
                            .categoryIds(Arrays.stream(record[2].split(";"))
                                    .map(cate -> categoryService.getCategoryId(cate))
                                    .filter(cate -> cate != -1)
                                    .collect(Collectors.toSet()))
                            .description(record[3])
                            .price(Double.parseDouble(record[4].substring(0, record[4].indexOf("₫")).replace(".", "")))
                            .build()
                    ).collect(Collectors.toCollection(ArrayList::new));

            listProduct.forEach(productService::createProduct);
        } catch (IOException | CsvException e) {
            throw new RuntimeException(e);
        }
        log.info("CSV file written successfully");
    }

}
