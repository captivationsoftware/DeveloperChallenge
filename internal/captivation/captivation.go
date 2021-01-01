package captivation

import (
	"bufio"
	"fmt"
	"io"
	"os"

	"github.com/pkg/errors"
	"github.com/pt-arvind/DeveloperChallenge/internal/logger"
)

// ScanForMessages scans the input stream for message bytes in a loop until the EOF character is presented
func ScanForMessages(log *logger.LogWrapper, preamble string) {
	log.Printf("starting scan...")
	in := bufio.NewReader(os.Stdin)

	// // in := bufio.NewReader(buf)
	for {
		c, err := in.ReadByte()
		if err == io.EOF {
			log.Printf("terminating program")
			break
		} else if err != nil {
			log.Printf("%+v", errors.Wrapf(err, "received error while reading in the next byte"))
		}
		fmt.Print(string(c))
	}
}
