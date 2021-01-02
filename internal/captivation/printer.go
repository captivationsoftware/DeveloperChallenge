package captivation

import (
	"fmt"
	"io"

	"github.com/pt-arvind/DeveloperChallenge/internal/logger"
)

// MessagePrinter is a struct that holds state for printing messages
type MessagePrinter struct {
	NumCharsLeftToPrint int
	NumBytesTillPrint   int
	Bytes               []byte
}

// Fprint collects the rune then decides whether or not it ought to print it to the stream provided
func (mp *MessagePrinter) Fprint(r byte, log *logger.LogWrapper, w io.Writer) {
	// fmt.Printf("%v", string(r))
	mp.Bytes = append(mp.Bytes, r)
	mp.NumBytesTillPrint--
	if mp.NumBytesTillPrint == 0 {
		// decode runes into character
		c, err := DecodeASCII(mp.Bytes, LittleEndian)
		if err != nil {
			log.Printf("error while trying to print decoded word: %+v", err)
		}
		fmt.Fprint(w, c)
		mp.NumBytesTillPrint = 8
		mp.NumCharsLeftToPrint--
		mp.Bytes = mp.Bytes[:0]
		// fmt.Printf("\n")
	}
}
