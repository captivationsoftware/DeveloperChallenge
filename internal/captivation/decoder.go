package captivation

import (
	"github.com/pkg/errors"
)

// Endianness is the endianness of the system
type Endianness int

const (
	// BigEndian denotes bit order with big bit value being the 0th position 0248
	BigEndian Endianness = iota

	// LittleEndian denotes bit order where smallest bit value being the 0th position 8420
	LittleEndian
)

// reverse reverses the order of the input slice
func reverse(bs []byte) []byte {
	for i := len(bs)/2 - 1; i >= 0; i-- {
		opp := len(bs) - 1 - i
		bs[i], bs[opp] = bs[opp], bs[i]
	}

	return bs
}

// DecodeASCII converts 8 runes of "0" or "1" into an ascii character
func DecodeASCII(bs []byte, e Endianness) (string, error) {
	if len(bs) != 8 {
		return "", errors.Errorf("invalid byte slice length: %v should be 8", len(bs))
	}

	order := bs
	if e == LittleEndian {
		order = reverse(bs)
	}

	s := byte(0)
	for i, r := range order {
		if string(r) == "0" { // perf gains are possible here if we use int32s properly
			s = s + 0<<i
		} else if string(r) == "1" {
			s = s + 1<<i
		} else {
			return "", errors.Errorf("invalid rune character at index: %v char: %v", i, string(r))
		}
	}

	return string(s), nil
}
