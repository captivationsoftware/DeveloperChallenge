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

# README 

This is my (Eric Luo) submission for the Captivation Software coding challenge. 

## Usage

In order to run properly, this code needs to run on a Unix Operating system, or any system that can utilize 'stty'. 
to run:

Javac challenge.java
java challenge

## Troubleshooting

For this to be operational, it requires the usage of stty to have an unbuffered input flow. Although there is a shutdown hook to revert, doing 'stty cooked' will revert back to a buffered input stream.
