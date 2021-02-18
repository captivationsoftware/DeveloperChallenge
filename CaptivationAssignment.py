# Author: Connor Graff
# Date: 2/18/2021
# Purpose: This program will find CAPTIVATION in a series of 1's and 0's and print the next 100 bits

import sys
# Import regular expressions
import re

# Create a variable holding the binary which translates to CAPTIVATION
CAPTIVATION = "0100001101000001010100000101010001001001010101100100000101010100010010010100111101001110"
# Create regex pattern to match against input. The pattern will look for the CAPTIVATION binary, then match the next 100 bits afterward
pattern =  CAPTIVATION + '(.{100})'

# Create the main function which holds the programs logic
def main():
    # Create a variable that will hold the entire series of 1's and 0's
    fullSeriesOfBits = ""
    while True:
        # Call a function to get input and add it to the full series of bits
        fullSeriesOfBits = addMoreFromSTDin(fullSeriesOfBits)
        # Find all RegEx pattern matches in the series of bits compared to the pattern
        x = re.findall(pattern, fullSeriesOfBits)
        # If x exists, and the length of x is greater than 1 (There were multiple matches!)
        if (x and len(x) > 1):
            # Create a for loop to go through each one of the matches by index
            for i in range(len(x)):
                # If the ith index of x exists, and the ith index has a legnth of 100
                if (x[i] and len(x[i]) == 100):
                    # Print the 100 bits out
                    sys.stdout.write(x[0])
                    break
            break
        # Else if x exists, and the length of x is 1 (There was one match), and the 0th index of x exists, and the 0th index has a legnth of 100
        elif(x and len(x) == 1 and x[0] and len(x[0]) == 100):
            # Print the 100 bits out
            sys.stdout.write(x[0])
            break

# Create a function to create/add to the full series of bits
def addMoreFromSTDin(fullSeriesOfBits):
    # Ask the user for input by an entire line
    curChar = sys.stdin.readline()
    # Add that line to the full series of bits
    fullSeriesOfBits += curChar
    # Return full series of bits
    return fullSeriesOfBits

# Run the main function
main()