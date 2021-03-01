#FROM busybox:latest
FROM openjdk:8-jre-alpine AS alpineBase
RUN apk update && apk upgrade
RUN apk update && apk upgrade Java
RUN apk add socat

FROM alpineBase as FindCaptivationImage
RUN mkdir /data
WORKDIR /app
COPY /target/CaptivationDeveloperChallenge-1.0-SNAPSHOT.jar   /app
#
#CMD ["/bin/ash"]
CMD ["java", "-jar" ,"/app/CaptivationDeveloperChallenge-1.0-SNAPSHOT.jar"]
