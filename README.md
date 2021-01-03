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

## Developed on

- Mac OS X Catalina 10.15.7
- Go: go1.15.6 darwin/amd64
- Git: git version 2.8.4 (Apple Git-73)

## Assumptions

- Strings from stdin are not processed till linefeed is entered (`\n` or enter on the keyboard)
  - not doing this appears to require system calls to solve the issue since stdin is line buffered by default
  - additionally, if system calls are used, docker will not be as handy due to the fact that it does not simulate the kernel and different systems will need different headers packaged in to work at all
  - as can be seen from the tests, using a stream will get around this limitation and the program will work in this case
- Input is an element of the set {"0","1"} in ASCII
- If the input is CAPTIVATION followed by less than 100 decoded ASCII characters, we will still print out the 100> decoded characters and wait for more
- If multiple CAPTIVATION preambles are found within one another, then the program will print out messages from both concurrently:
  - if we see `CAPTIVATIONblahCAPTIVATIONblahblah...`
  - the output will be `blahCAPTIVATIONbbllaahhbbllaahh...` it will not wait for one message to play before beginning the next message as reflected in the tests
- 0's and 1's are UTF-8

## How to run the code locally

setting up `GOPATH`

- the code is expected to be in: `$GOPATH/src/github.com/pt-arvind/DeveloperChallenge` (hereby referred to as the root directory) failing to adhere to this may cause compiler issues

- from the root directory, type:

```bash

go run main.go

```

## How to run the tests locally

```bash

go test ./...

```

## How to run the code from docker

DISCLAIMER: I have deliberately set up the dockerfile to compile/test the code as well as execute it. In a typical CI pipeline, these would be done in different steps but in order to forgo SSH keys and all that, I am keeping it simple here.

From the root directory:

```bash

docker build -t pt-arvind/captivation:latest .

docker run -i pt-arvind/captivation:latest

```
