package main

import (
	"os"

	"github.com/pt-arvind/DeveloperChallenge/internal/captivation"
	"github.com/pt-arvind/DeveloperChallenge/internal/logger"
)

// PREAMBLE is the word 'CAPTIVATION' as represented by ASCII in binary
const PREAMBLE = "0100001101000001010100000101010001001001010101100100000101010100010010010100111101001110"

/*
## Your Task
Develop an application that:
- Reads a stream of "bits" (a continuous string consisting only of the character '0' and '1') from STDIN,
- Decodes input characters into a single, zero-padded ASCII equivalent (e.g. "01000011" decodes to 'C')
- Searches the decoded message for the preamble string "CAPTIVATION", and once found, prints the next one hundred decoded characters to STDOUT

## Rules
- The input stream will only ever consist of combinations of the character '0' or '1', no input validation is required
- The input stream is to be treated as if it is never-ending
- Multiple preamble/message occurrences may occur within the same input stream
- Preamble/message occurrences are not guaranteed to be well-aligned (e.g. an arbitrary number of "bits" may precede a preamble, not just a multiple of 8)
- The number of '0' and '1' characters between each preamble/message occurrence is variable
- Nothing else should be printed to STDOUT, only the one hundred characters following the preamble string "CAPTIVATION"
*/
func main() {
	// buffer the input reading x bits at a time
	// 11 bytes
	// 11 * 8 = 88 bits
	// byte slices for CAPTIVATION and CAPTIVATION rotated 7 times
	// take a slice of 12 bytes (extra one for rotation spillover)
	// compare bytes with each of the captivation slices
	// if any of the 8 match, then dump out the next 100 decoded characters (bytes)
	// -- what do we do to handle misalignment?

	// captivation: 01000011 01000001 01010000 01010100 01001001 01010110 01000001 01010100 01001001 01001111 01001110
	// alignment:

	// captivation: 0100001101000001010100000101010001001001010101100100000101010100010010010100111101001110

	// operate on it looking for captivation, shifting left 1 bit at a time and XORing the bits
	// if numBytesLeftInBuffer == len(captivation)
	// copy the current numBytesLeftInBuffer from the current buf into a new buf
	// read in the next X bits
	// continue as usual
	// if captivation is found, take the next 100 bits and fire it out to output

	//TODO: add a config for all the stuff here
	// set logger
	l := &logger.LogWrapper{DebugMode: false}

	captivation.ScanForMessages(l, PREAMBLE, os.Stdin, 32, os.Stdout)
}
