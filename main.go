package main

import (
	"os"

	"github.com/pt-arvind/DeveloperChallenge/internal/captivation"
	"github.com/pt-arvind/DeveloperChallenge/internal/logger"
)

// PREAMBLE is the word 'CAPTIVATION' as represented by ASCII in binary
const PREAMBLE = "0100001101000001010100000101010001001001010101100100000101010100010010010100111101001110"

// InputBufferSize is the size of the input buffer we're going to use
const InputBufferSize = 32

func main() {
	l := &logger.LogWrapper{DebugMode: false}

	captivation.ScanForMessages(l, PREAMBLE, os.Stdin, InputBufferSize, os.Stdout)
}