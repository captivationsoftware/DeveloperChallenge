#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Captivation Software Developer Challenge Submission

This application reads a stream of 1's and 0's from STDIN and decodes the input
characters into single zero-padded ASCII text. When the application finds the
word "CAPTIVATION" within the input stream, it will print out the next one hundred
decoded characters following "CAPTIVATION" to STDOUT. This process repeats forever.

Author: Christian Burns
Date:   June 30, 2021
See:    https://github.com/captivationsoftware/DeveloperChallenge
"""

import sys
from collections import deque

preamble_string = 'CAPTIVATION'  # Keyword to search for
num_characters_to_print = 100    # Number of characters to print after keyword

# Converting the preamble_string into its binary equivalent
preamble_binary = ''.join(format(ord(c), '08b') for c in preamble_string)
preamble_deque = deque(preamble_binary)
max_input_len = len(preamble_binary)

# --- Decode input stream from STDIN --- #

while True:

    # --- Search for the preamble string --- #

    rolling_input = None    # Rolling queue of the last {max_input_len} binary values
    preamble_found = False  # True when rolling_input matches preamble_deque

    while not preamble_found:
        # Bulk read/insert the next {max_input_len} characters to avoid wasting
        #   time comparing queues prior to the queues reaching equal lengths.
        if rolling_input is None:
            characters = sys.stdin.read(max_input_len)
            rolling_input = deque(characters, maxlen=max_input_len)

        # Since the bits for the preamble message are not guaranteed to be well-aligned,
        #   we must iterate through STDIN one character at a time. For this reason, we
        #   utilize Python's builtin collections.deque list which has a time complexity
        #   of O(1) for inserting and removing items at either end to improve performance.
        else:
            character = sys.stdin.read(1)
            rolling_input.append(character)

        # We compare the rolling_input to a predefined preamble_deque
        #   to avoid unnecessary string manipulation/conversion.
        if rolling_input == preamble_deque:
            preamble_found = True

    # --- Decode and print the next {num_characters_to_print} characters --- #

    for _ in range(num_characters_to_print):
        input_buffer = sys.stdin.read(8)     # Each character is represented by 8 bits
        ascii_number = int(input_buffer, 2)  # Converting the bits into an ascii value
        sys.stdout.write(chr(ascii_number))  # Converting the ascii value to character
