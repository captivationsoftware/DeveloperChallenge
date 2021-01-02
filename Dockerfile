FROM golang:1.15.6-alpine

LABEL maintainer="Arvind Subramanian <pt.arvind@gmail.com>"

RUN mkdir -p /go/src/github.com/pt-arvind/DeveloperChallenge

ADD . /go/src/github.com/pt-arvind/DeveloperChallenge

# build
RUN go install github.com/pt-arvind/DeveloperChallenge

WORKDIR /go/src/github.com/pt-arvind/DeveloperChallenge

# test
RUN go test ./...

ENTRYPOINT /go/bin/DeveloperChallenge

