package com.nlu.WebThuongMai.service;

import com.nlu.WebThuongMai.dto.request.productReq.ProductRequest;
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
import java.util.stream.Collectors;

@Slf4j
public class ReadCSVFile implements Runnable{

    List<ProductRequest> readCSVFile(String filePath) {
        ArrayList<ProductRequest> listProduct = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new FileReader(filePath))) {
            List<String[]> allRecords = reader.readAll();
            listProduct = (ArrayList<ProductRequest>) allRecords.stream()
                    .skip(1)
                    .map(record -> ProductRequest.builder()
                            .name(record[0])
                            .description(record[2])
                            .build()
                    ).collect(Collectors.toList());
            listProduct.forEach(System.out::println);

        } catch (IOException | CsvException e) {
            throw new RuntimeException(e);
        }
        log.info("CSV file written successfully");
        return null;
    }

    public static void main(String[] args) {
        String filePath = "D:\\isDoing\\ChuyenDeWeb\\WebCommercial\\backend\\src\\main\\resources\\db\\migration\\csvFiles\\products.csv";
        ReadCSVFile readCSVFile = new ReadCSVFile();
        readCSVFile.readCSVFile(filePath);
    }

    @Override
    public void run() {

    }
}
