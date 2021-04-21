#!/usr/bin/env python3
"""Captivation Software Coding Challenge.

This program will decode and endless stream of 'bits' passed in from stdin
as the characters '1' or '0' and decode them. It will look for a preamble
'CAPTIVATION' and when found, will print to stdout the decoded version of the
next 100 'bits'.
"""
import sys

CAPTIVATION = '0100001101000001010100000101010001001001010101100100000101010100010010010100111101001110'


def print_next_100(temp):
    """Print the decoded message.

    Decodes the next 100 'bits' from stdin, decodes them, and prints
    to stdout the decoded message.
    """
    my_string = ''
    test_string = ''
    decoded_string = str()
    while (temp and len(my_string) < 100):
        my_string += temp[0]
        if temp:
            temp = temp[1:]
        if (len(my_string) % 8 == 0):
            test_string = int(my_string[-8:], 2)
            decoded_string += chr(test_string)

    print(decoded_string)
    return temp


def main():
    """Reads input from stdin and searches for the preamble 'CAPTIVATION' in
    in the decoded input string. When found, calls the print_next_100 function.
    Runs forever until keyboard interrupt."""
    u_input = ''
    temp = str()
    while True:
        if not temp:
            try:
                temp = sys.stdin.read()
            except EOFError as error:
                print("Error: ", error)

        while(temp and len(u_input) < 88):
            u_input += temp[0]
            if temp:
                temp = temp[1:]

        if(len(u_input) == 88):
            if (u_input == CAPTIVATION):
                temp = print_next_100(temp)
            while temp:
                u_input = u_input[1:]
                u_input += temp[0]
                if temp:
                    temp = temp[1:]
                if (u_input == CAPTIVATION):
                    temp = print_next_100(temp)
        u_input = ''


if __name__ == '__main__':
    main()