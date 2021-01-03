package main

import (
	"os"
	"sync"

	"github.com/pt-arvind/DeveloperChallenge/internal/captivation"
	"github.com/pt-arvind/DeveloperChallenge/internal/logger"
)

// PREAMBLE is the word 'CAPTIVATION' as represented by ASCII in binary
const PREAMBLE = "0100001101000001010100000101010001001001010101100100000101010100010010010100111101001110"

// InputBufferSize is the size of the input buffer we're going to use
const InputBufferSize = 32

func main() {
	var wg sync.WaitGroup
	log := &logger.LogWrapper{DebugMode: false}
	consumer := make(chan byte, 16) // buffered channel size 16
	captivation.Listen(PREAMBLE, log, os.Stdin, os.Stdout, consumer, &wg)
}
