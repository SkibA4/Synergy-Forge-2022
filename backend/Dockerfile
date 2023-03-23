FROM adoptopenjdk/openjdk11:latest

# Utwórz katalog roboczy dla aplikacji
WORKDIR /app

# Skopiuj pliki pom.xml i mvnw do kontenera
COPY ./pom.xml ./
COPY ./mvnw ./
COPY ./.mvn ./
COPY ./.mvn/wrapper/maven-wrapper.properties ./.mvn/wrapper/

# Wykonaj mvnw, aby pobrać wszystkie zależności
RUN ./mvnw dependency:go-offline

# Skopiuj resztę plików aplikacji do kontenera
RUN rm -rf ./src

COPY ./src ./src

# Wykonaj polecenie Maven, aby zbudować aplikację
RUN ./mvnw package -DskipTests

# Ustaw port, na którym ma działać aplikacja
EXPOSE 8080

# Uruchom aplikację
CMD ["java", "-jar", "target/backend.jar"]