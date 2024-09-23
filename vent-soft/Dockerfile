FROM eclipse-temurin:17.0.12_7-jdk

# Informar el puerto donde se ejecuta el contenedor (comando informativo)
EXPOSE 8080

# Definir directorio raíz de nuestro contenedor
WORKDIR /root

# Copiar y pegar archivos dentro del contenedor
COPY ./pom.xml /root
COPY ./.mvn /root/.mvn
COPY ./mvnw /root/mvnw

# Listar archivos para verificar si mvnw se copió correctamente
RUN ls -la /root
# Dar permisos de ejecución a mvnw
RUN chmod +x /root/mvnw

# Descargar las dependencias de Maven
RUN ./mvnw dependency:go-offline

# Copiar el código fuente dentro del contenedor
COPY ./src /root/src
#Contruir la aplicacion
RUN ./mvnw clean install -DskipTests
#Levantar la aplicacion cuando el contenedor inicie ENTRYPOINT EJECUTA UN COMANDO SOLAMENTE CUANDO EL CONTENEDOR INICIE
ENTRYPOINT ["java", "-jar", "vent-soft-0.0.1-SNAPSHOT.jar"]