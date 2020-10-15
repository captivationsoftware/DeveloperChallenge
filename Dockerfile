FROM frolvlad/alpine-gxx
RUN apk add --no-cache make
CMD ./main.out

COPY . .
RUN make all 
