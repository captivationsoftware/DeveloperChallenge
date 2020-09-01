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
V = "01010110"
O = "01001111"
N = "01001110"

CAPTIVATION = C + A + P + T + I + V + A + T + I + O + N

def shiftBuffer(curChar, charBuffer):
    charBufferTemp = charBuffer[1:len(charBuffer)]
    charBufferTemp += curChar
    return charBufferTemp

def preambleMatch(charBuffer):
    if charBuffer == CAPTIVATION:
        return True

def run():
    charBuffer = "0" * 88 
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