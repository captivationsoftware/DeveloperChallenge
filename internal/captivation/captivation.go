package captivation

import (
	"bufio"
	"io"
	"strings"

	"github.com/pkg/errors"
	"github.com/pt-arvind/DeveloperChallenge/internal/logger"
)

//TODO: might change this to use bytes instead of runes

// ScanForMessages scans the input stream for message bytes in a loop until the EOF character is presented
func ScanForMessages(log *logger.LogWrapper, preamble string, input io.Reader, inputBufferSizeInBytes int, output io.Writer) {
	log.Printf("starting scan with buf size: %v in bytes", inputBufferSizeInBytes)
	inbuf := bufio.NewReaderSize(input, inputBufferSizeInBytes) // limit buffer size so we can test more easily

	l := len(preamble)
	log.Printf("preamble length: %v", l)
	window := make([]byte, 0, l) // extra rune's worth
	printers := []*MessagePrinter{}

	for {
		// assuming UTF-8
		r, err := inbuf.ReadByte()
		log.Printf("buffer size: %v remaining: %v", inbuf.Size(), inbuf.Buffered())
		if err == io.EOF {
			log.Printf("terminating program")
			break
		} else if err != nil {
			log.Printf("%+v", errors.Wrapf(err, "received error while reading in the next rune"))
		}

		// print rune if we're supposed to
		// prints could be at different byte lengths
		// each one needs to trigger its own function
		filteredPrinters := printers[:0] // used to filter out completed printers in place so we don't keep allocating more space
		for _, p := range printers {
			if p.NumCharsLeftToPrint > 0 {
				p.Fprint(r, log, output)
			}
			if p.NumCharsLeftToPrint > 0 {
				filteredPrinters = append(filteredPrinters, p)
			}
		}
		printers = filteredPrinters

		if len(window) < l-1 { // if the window is less than the size of the preamble-1, then we need to continue
			window = append(window, r)
			continue
		} else if len(window) >= l { // in this case, window >= length(preamble)
			// rotate window
			window = window[1:]
		}
		window = append(window, r)
		curr := string(window)

		i := strings.Index(curr, preamble)

		//FIXME: off by 1
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
	}
}
