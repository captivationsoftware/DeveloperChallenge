#!/bin/bash
docker build -t decoder .
docker pull captivation/ascii-generator
docker run captivation/ascii-generator | docker run -i decoder
