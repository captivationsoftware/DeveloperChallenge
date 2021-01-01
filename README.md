# Captivation Software Developer Challenge

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

## Guidelines
- This solution will be tested by an automated tool, so failure to adhere to this spec precisely will produce a failing result 
- Your solution should include instructions on how to run/build via Linux command line (or even better, use Docker)
- Your solution will be judged for correctness, performance, and style
- You may use any language you'd like, but you can only use standard libraries



## Developed on:
- Mac OS X Catalina 10.15.7
- Go: go1.15.6 darwin/amd64

## Assumptions:
- Strings from input are `\n` delimited before they are expected to be operated on but `\n` is not counted as input (0,1) 
  - not doing this appears to require system calls to solve the issue since stdin is line buffered by default
- Input is an element of the set {"0","1"} in ASCII and EOF will signal the end of the program
- If the input is CAPTIVATION followed by less than 100 decoded ASCII characters, we will still print out the 100> characters and wait for more

## How to run the code locally
- from the root directory, type:

```bash

go run cmd/main.go`

```

## How to run the code from docker




