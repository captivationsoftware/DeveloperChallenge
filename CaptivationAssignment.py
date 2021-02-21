# Author: Connor Graff
# Date: 2/18/2021
# Purpose: This program will find CAPTIVATION in a series of 1's and 0's and print the next 100 characters

import sys
# Import regular expressions
import re

# Create a variable holding the binary which translates to CAPTIVATION
CAPTIVATION = "0100001101000001010100000101010001001001010101100100000101010100010010010100111101001110"
# Create regex pattern to match against input. The pattern will look for the CAPTIVATION binary, then match the next 800 bits afterward
pattern =  CAPTIVATION + '(.{800})'

# Create a function to create/add to the full series of bits
def addMoreFromSTDin(fullSeriesOfBits):
    # Ask the user for input by an entire line
    curChar = sys.stdin.readline()
    # Add that line to the full series of bits
    fullSeriesOfBits += curChar
    # Return full series of bits
    return fullSeriesOfBits

# Create a function to convert 800 bits into the ASCII characters
def convertBitsToASCII(x):
    # Create a variable that will contain all of the 100 ASCII chars
    finalASCIIchars = ""
    # Create a temporary variable that will contain 8 bits at a time to be converted to character
    tempEightChars = ""
    # Loop through all 800 bits
    for i in x:
        # Add every bit to the tempEightChars variable
        tempEightChars += i
        # If tempEightChars is 8 bits long (contains eight bits)
        if len(tempEightChars) == 8:
            # Convert the eight bits into ASCII char and place in the finalASCIIChars variable
            finalASCIIchars += chr(int(tempEightChars, 2))
            # Reset the tempEightChars so that we can look at the next 8 bits
            tempEightChars = ""
    # When we have finished converting all 800 bits to 100 characters, return the characters to be printed
    return finalASCIIchars

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
                # If the ith index of x exists, and the ith index has a length of 100
                if (x[i] and len(x[i]) == 800):
                    # Pass the 800 bits to conversion method and get the ASCII characters
                    ASCIItoBePrinted = convertBitsToASCII(x[i])
                    # Print the 100 chars out
                    sys.stdout.write(ASCIItoBePrinted)
        # Else if x exists, and the length of x is 1 (There was one match), and the 0th index of x exists, and the 0th index has a length of 100
        elif(x and len(x) == 1 and x[0] and len(x[0]) == 800):
            # Pass the 800 bits to conversion method and get the ASCII characters
            ASCIItoBePrinted = convertBitsToASCII(x[0])
            # Print the 100 chars out
            sys.stdout.write(ASCIItoBePrinted)

# Run the main function
main()