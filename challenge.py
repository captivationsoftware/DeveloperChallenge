import sys

def main(): 
    search_string = b"CAPTIVATION" # preamble string to search input stream for
    search_size = 100 # how many characters after the preamble to read

    # converts each ascii character of the search string into binary
    search_sig = "".join(map(lambda c: format(c, "08b"), search_string))

    while (line := sys.stdin.readline()):
        # scan for the preamble bit by bit
        for index in range(0, len(line)):
            sub_str = line[index : index + len(search_sig)]
            if (sub_str == search_sig):
                # the message starts at the end of the preamble
                preamble_start = index + len(search_sig)

                # get the next 100 characters (800 bits)
                message = line[preamble_start : preamble_start + search_size * 8]
                # split message from binary string into 8 bit segments
                message_chunks = [message[i : i + 8] for i in range(0, len(message), 8)]
                # decode each byte to get its ascii character representation
                decoded_message = "".join(map(lambda b: chr(int(b, 2)), message_chunks))
                print(decoded_message)

if __name__ == "__main__":
    main()
