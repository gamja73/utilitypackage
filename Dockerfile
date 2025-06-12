FROM gradle:8.7.0-jdk21 AS build
WORKDIR /app

# node.js 22버전 설치
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs

# 전체 소스 복사
COPY . .

# 빌드
RUN ./gradlew build -x test

FROM eclipse-temurin:21-jre
WORKDIR /app

# 빌드 산출물 JAR 복사
COPY --from=build /app/backend/build/libs/*.jar app.jar

EXPOSE 9080
ENTRYPOINT ["java", "-jar", "app.jar"]