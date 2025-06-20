# stage1: build
FROM maven:3.9.9-amazoncorretto-21-al2023 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src


RUN mvn package -DskipTests

# Stage 2: Run
FROM amazoncorretto:21-al2023

WORKDIR /app
COPY --from=build /app/target/WebThuongMai-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

