package captivation

import (
	"bytes"
	"log"
	"testing"

	"github.com/pt-arvind/DeveloperChallenge/internal/logger"
)

// TestPrintBasic tests basic printing of 8 "bits"
func TestPrintBasic(t *testing.T) {
	//a
	input := []byte("01100010")
	expected := "b"
	log.Printf("input: %+v", input)

	p := MessagePrinter{
		NumCharsLeftToPrint: 100,
		NumBytesTillPrint:   8,
		Bytes:               make([]byte, 0, 8),
	}
	log := &logger.LogWrapper{DebugMode: true}
	var outBuf bytes.Buffer

	p.Fprint(input[0], log, &outBuf)
	p.Fprint(input[1], log, &outBuf)
	p.Fprint(input[2], log, &outBuf)
	p.Fprint(input[3], log, &outBuf)
	p.Fprint(input[4], log, &outBuf)
	p.Fprint(input[5], log, &outBuf)
	p.Fprint(input[6], log, &outBuf)
	p.Fprint(input[7], log, &outBuf)

	if outBuf.String() != expected {
		t.Errorf("result was incorrect, got: %v, want: %v", outBuf.String(), expected)
	}
}

// TestPrintTwoCharacters tests basic printing of 16 "bits"
func TestPrintTwoCharacters(t *testing.T) {
	input := []byte("0110001001100011")
	expected := "bc"
	log.Printf("input: %+v", input)

	p := MessagePrinter{
		NumCharsLeftToPrint: 100,
		NumBytesTillPrint:   8,
		Bytes:               make([]byte, 0, 8),
	}
	log := &logger.LogWrapper{DebugMode: true}
	var outBuf bytes.Buffer

	p.Fprint(input[0], log, &outBuf)
	p.Fprint(input[1], log, &outBuf)
	p.Fprint(input[2], log, &outBuf)
	p.Fprint(input[3], log, &outBuf)
	p.Fprint(input[4], log, &outBuf)
	p.Fprint(input[5], log, &outBuf)
	p.Fprint(input[6], log, &outBuf)
	p.Fprint(input[7], log, &outBuf)

	p.Fprint(input[8], log, &outBuf)
	p.Fprint(input[9], log, &outBuf)
	p.Fprint(input[10], log, &outBuf)
	p.Fprint(input[11], log, &outBuf)
	p.Fprint(input[12], log, &outBuf)
	p.Fprint(input[13], log, &outBuf)
	p.Fprint(input[14], log, &outBuf)
	p.Fprint(input[15], log, &outBuf)

	if outBuf.String() != expected {
		t.Errorf("result was incorrect, got: %v, want: %v", outBuf.String(), expected)
	}
}

// TestPrintStopPartial tests basic printing of 18 "bits", it should stop printing after the first 2 characters and await the rest
func TestPrintStopPartial(t *testing.T) {
	//a
	input := []byte("011000100110001111")
	expected := "bc"
	log.Printf("input: %+v", input)

	p := MessagePrinter{
		NumCharsLeftToPrint: 100,
		NumBytesTillPrint:   8,
		Bytes:               make([]byte, 0, 8),
	}
	log := &logger.LogWrapper{DebugMode: true}
	var outBuf bytes.Buffer

	p.Fprint(input[0], log, &outBuf)
	p.Fprint(input[1], log, &outBuf)
	p.Fprint(input[2], log, &outBuf)
	p.Fprint(input[3], log, &outBuf)
	p.Fprint(input[4], log, &outBuf)
	p.Fprint(input[5], log, &outBuf)
	p.Fprint(input[6], log, &outBuf)
	p.Fprint(input[7], log, &outBuf)

	p.Fprint(input[8], log, &outBuf)
	p.Fprint(input[9], log, &outBuf)
	p.Fprint(input[10], log, &outBuf)
	p.Fprint(input[11], log, &outBuf)
	p.Fprint(input[12], log, &outBuf)
	p.Fprint(input[13], log, &outBuf)
	p.Fprint(input[14], log, &outBuf)
	p.Fprint(input[15], log, &outBuf)

	p.Fprint(input[16], log, &outBuf)
	p.Fprint(input[17], log, &outBuf)

	if outBuf.String() != expected {
		t.Errorf("result was incorrect, got: %v, want: %v", outBuf.String(), expected)
	}

}
