# Captivation Software Developer Challenge
import sys
import time

# convert keyword to integer for later comparison
KEYWORD = 'CAPTIVATION'
keyword_hex = "".join([c.encode('hex') for c in KEYWORD])
keyword_int = int(keyword_hex, 16)
keyword_mask = int('f'*len(keyword_hex), 16)
keyword_buff = 0

MESSAGE_SIZE = 100
message_buffer = ''
message_counts = []

while True:
    # read 1 character ('0' or '1')
    c = sys.stdin.read(1)

    # if there's no data, read() returns empty string, so wait a bit
    if not c:
        time.sleep(1)
        continue

    # we only need to store the character if we are actively tracking messages
    if len(message_counts) > 0:
        message_buffer += c
        message_counts = [x+1 for x in message_counts]

        # check if we need to print the buffer
        if message_counts[0] == MESSAGE_SIZE*8:
            # print the message (convert from binary string to ascii)
            message = ''
            for i in range(MESSAGE_SIZE):
                message += chr(int(message_buffer[i*8:(i+1)*8], 2))
            print message

            # shorten or reset the buffer
            del message_counts[0]
            if len(message_counts) > 0:
                message_buffer = message_buffer[MESSAGE_SIZE*8-message_counts[0]:]
            else:
                message_buffer = ''

    # shift the bit into the keyword buffer
    bit = int(c, 2)
    keyword_buff = ((keyword_buff << 1) + bit) & keyword_mask
    if keyword_buff == keyword_int:
        # start tracking a new message
        message_counts.append(0)

