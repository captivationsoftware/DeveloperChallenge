package captivation

import (
	"log"
	"testing"
)

// TestDecodeBasic tests basic decoding
func TestDecodeBasic(t *testing.T) {
	//a
	input := "01100010"
	expected := "b"
	log.Printf("input: %+v", input)
	res, err := DecodeASCII([]byte(input), LittleEndian)
	if err != nil {
		t.Errorf("received error, got: %+v, want: nil", err)
	}
	if res != expected {
		t.Errorf("result was incorrect, got: %v, want: %v", input, expected)
	}

}
