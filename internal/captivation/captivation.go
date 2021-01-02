package captivation

import (
	"bufio"
	"io"
	"strings"
	"unicode"

	"github.com/pkg/errors"
	"github.com/pt-arvind/DeveloperChallenge/internal/logger"
)

//TODO: might change this to use bytes instead of runes

// MessagePrinter is a struct that holds state for printing messages
type MessagePrinter struct {
	NumCharsLeftToPrint int
	NumBytesTillPrint   int
	Runes               []rune
}

// Print collects the rune then decides whether or not it ought to print it
func (mp *MessagePrinter) Print(r rune, log *logger.LogWrapper) {
	mp.Runes = append(mp.Runes, r)
	mp.NumBytesTillPrint--
	if mp.NumBytesTillPrint == 0 {
		//TODO: decode runes into character
		//TODO: print character
		log.Printf("should print: %v", string(r))

		// fmt.Printf("%v", string())
		mp.NumBytesTillPrint = 8
		mp.NumCharsLeftToPrint--
	}
}

// ScanForMessages scans the input stream for message bytes in a loop until the EOF character is presented
func ScanForMessages(log *logger.LogWrapper, preamble string, input io.Reader, bufferSizeInBytes int) {
	log.Printf("starting scan with buf size: %v in bytes", bufferSizeInBytes)
	inbuf := bufio.NewReaderSize(input, bufferSizeInBytes) // limit buffer size so we can test more easily

	l := len(preamble)
	log.Printf("preamble length: %v", l)
	window := make([]rune, l) // extra rune's worth
	printers := []*MessagePrinter{}

	for {
		// runes are unicode 32-bit characters (can expand over byte boundaries)
		r, numBytes, err := inbuf.ReadRune()
		log.Printf("buffer size: %v", inbuf.Size())
		if err == io.EOF {
			log.Printf("terminating program")
			break
		} else if err != nil {
			log.Printf("%+v", errors.Wrapf(err, "received error while reading in the next rune"))
		} else if r == unicode.ReplacementChar {
			log.Printf("%+v", errors.Errorf("invalid character found in input; must be unicode UTF8"))
		}

		log.Printf("read %v byte(s) into rune: %v", numBytes, string(r))

		// print rune if we're supposed to
		// prints could be at different byte lengths
		// each one needs to trigger its own function
		filteredPrinters := printers[:0] // used to filter out completed printers in place so we don't keep allocating more space
		for _, p := range printers {
			if p.NumCharsLeftToPrint > 0 {
				p.Print(r, log)
			}
			if p.NumCharsLeftToPrint > 0 {
				filteredPrinters = append(filteredPrinters, p)
			}
		}
		printers = filteredPrinters

		if len(window) < l { // if the window is less than the size of the preamble, then we need to continue
			log.Printf("%v", string(r))
			log.Printf("window size: %v, continuing...", len(window))
			window = append(window, r)
			continue
		} else { // in this case, window >= length(preamble)
			curr := string(window)
			log.Printf("window after adding new rune: %v", curr)

			i := strings.Index(curr, preamble)

			// if the index is found add a printer so that the message will get printed (next 100 decoded chars)
			if i != -1 {
				log.Printf("found PREAMBLE!")
				p := MessagePrinter{
					NumCharsLeftToPrint: 100,
					NumBytesTillPrint:   8,
					Runes:               make([]rune, 8),
				}
				printers = append(printers, &p)
			}

			// rotate window
			window = window[1:]
			window = append(window, r)
		}
	}
}
