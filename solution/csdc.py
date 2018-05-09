# Captivation Software Developer Challenge
import sys
import time

KEYWORD = 'CAPTIVATION'
MESSAGE_SIZE = 100

key = ''
message_buffer = ''
message_counts = []

while True:
    # read 8 characters at a time from stdin
    binstr = sys.stdin.read(8)

    # if there's no data, read() returns empty string, so wait a bit
    if not binstr:
        time.sleep(1)
        continue

    # convert the binary string to a character
    #
    # Note: this could throw ValueError, but guidelines
    # say input validation is not necessary
    c = chr(int(binstr, 2))

    # we only need to store the character if we are actively tracking messages
    if len(message_counts) > 0:
        message_buffer += c
        message_counts = [x+1 for x in message_counts]

        # check if we need to print the buffer
        if message_counts[0] == MESSAGE_SIZE:
            print message_buffer
            del message_counts[0]

            # shorten or reset the buffer
            if len(message_counts) > 0:
                message_buffer = message_buffer[MESSAGE_SIZE-message_counts[0]:]
            else:
                message_buffer = ''

    # check if we found the keyword
    key += c
    if key == KEYWORD[:len(key)]:
        if len(key) == len(KEYWORD):
            # start tracking a new message to print later
            message_counts.append(0)
            key = ''
    else:
        key = ''

