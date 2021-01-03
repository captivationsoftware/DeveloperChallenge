package captivation

import (
	"bufio"
	"fmt"
	"io"
	"strings"
	"sync"

	"github.com/pt-arvind/DeveloperChallenge/internal/logger"
)

// Listen begins listening for user input
func Listen(preamble string, log *logger.LogWrapper, input io.Reader, output io.Writer, consumer chan byte, wg *sync.WaitGroup) {
	// run the consumer on a separate goroutine
	go ScanForMessages(log, preamble, consumer, output, wg)

	// start the producer on the main thread
	inbuf := bufio.NewReaderSize(input, 16)
	for {
		// assuming UTF-8
		b, err := inbuf.ReadByte()
		log.Printf("buffer size: %v remaining: %v", inbuf.Size(), inbuf.Buffered())
		if err != nil {
			log.Printf("%+v", fmt.Errorf("received error while reading in the next byte: %+v", err))
			continue
		} else if string(b) != "1" && string(b) != "0" {
			// this is a handy check for local testing where stdout and stdin start to pour into one another
			log.Printf("input should only ever be 0 or 1, can't send in: %v\n", string(b))
			continue
		}

		// send byte to the consumer queue
		wg.Add(1)
		consumer <- b
	}
}

// ScanForMessages scans the input stream for message bytes in a loop until the EOF character is presented
func ScanForMessages(log *logger.LogWrapper, preamble string, input chan byte, output io.Writer, wg *sync.WaitGroup) {
	preambleLength := len(preamble)
	log.Printf("preamble length: %v", preambleLength)
	window := make([]byte, 0, preambleLength) // capacity is the length of the preamble
	printers := []*MessagePrinter{}

	for {
		// could use anonymous function here

		log.Printf("waiting on next byte...")
		log.Printf("input size: %v", len(input))
		b := <-input // read next byte

		// print byte if we're supposed to
		// prints could be at different byte lengths
		filteredPrinters := printers[:0] // used to filter out completed printers in place so we don't keep allocating more space
		for _, p := range printers {
			if p.NumCharsLeftToPrint > 0 {
				p.Fprint(b, log, output)
			}
			if p.NumCharsLeftToPrint > 0 {
				filteredPrinters = append(filteredPrinters, p)
			}
		}
		printers = filteredPrinters

		if len(window) < preambleLength-1 { // if the window is less than the size of the preamble-1, then we need to continue
			window = append(window, b)
			wg.Done() // FIXME: refactor this so that we can defer the wg.Done()
			continue
		} else if len(window) >= preambleLength { // in this case, window >= length(preamble)
			// rotate window
			window = window[1:]
		}
		window = append(window, b)
		curr := string(window)

		i := strings.Index(curr, preamble)

		// if the index is found add a printer so that the message will get printed (next 100 decoded chars)
		if i != -1 {
			log.Printf("found PREAMBLE!")
			p := MessagePrinter{
				NumCharsLeftToPrint: 100,
				NumBytesTillPrint:   8,
				Bytes:               make([]byte, 0, 8),
			}
			printers = append(printers, &p)
		}

		wg.Done()
	}
}
