#Captivation coding challenge

# Goal to have input produce Captivation with bit code 
# after the first instance of Captivation produce the remaining amount of code after in bit code

import math, binascii
from collections import Counter 


def spell_captivation():
    

    print("Write in bit values to spell out the word with no spaces included 'CAPTIVATION' \n\n")
    user_bit_value = str(input())

    Captivation_key_bit = '010000110100000101010000010101000100100101010110010000010101010001001001010011110100111000001010'
    #This does not take in spaces in to account and cuts the rest of the bits after the key is found and counts the times the key is found
    if Captivation_key_bit in user_bit_value:
        print("Captivation binary value was found!")
        remaining_binary = user_bit_value.partition(Captivation_key_bit)[2] 
        num_of_occurences = user_bit_value.count(Captivation_key_bit)
        print(str(num_of_occurences) + " times!")

    # try and except block is used to catch any unsupported ASCII values
    try:
        if Captivation_key_bit in user_bit_value:
            binary_int = int(user_bit_value, 2)
            byte_number = binary_int.bit_length() + 7 // 8
            remaining_binary = user_bit_value.partition(Captivation_key_bit)[2] 
            binary_array = binary_int.to_bytes(byte_number, "big") 
            ascii_text = binary_array.decode()
            print(ascii_text + " This is the remaining binary: " + remaining_binary)

    except UnicodeDecodeError:
        print("Bit code is not ASCII supported or does not meet criteria: " + user_bit_value)

    # if key is not found in the input then reprints user value
    else:
        if Captivation_key_bit not in user_bit_value:
            print("Your code does not contain bits to make the word: CAPTIVATION: " + user_bit_value)



spell_captivation()