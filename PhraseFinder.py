'''
Created on Sep 1, 2020

@author: matth
'''

import sys

C = "01000011"
A = "01000001"
P = "01010000"
T = "01010100"
I = "01001001"
O = "01001111"
N = "01001110"

CAPTION = C + A + P + T + I + O + N

def shiftBuffer(curChar, charBuffer):
    charBufferTemp = charBuffer[1:len(charBuffer)]
    charBufferTemp += curChar
    return charBufferTemp

def preambleMatch(charBuffer):
    if charBuffer == CAPTION:
        return True

def run():
    charBuffer = "0" * 56 
    printing = -1
    
    while True:
        curChar = sys.stdin.read(1)
        
        if "01".find(curChar) == -1 or len(curChar) == 0:
            break;

        charBuffer = shiftBuffer(curChar, charBuffer)
        
        if printing >= 0:
            print(curChar, end='')
            printing += 1
    
            if printing >= 100:
                printing = -1;

        if preambleMatch(charBuffer):
            printing = 0

if __name__ == '__main__':
    run()