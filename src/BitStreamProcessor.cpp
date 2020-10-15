#include "BitStreamProcessor.h"
#include <unistd.h>
#include <termios.h>
#include <iostream>

BitStreamProcessor::BitStreamProcessor()
{
    //ctor
}

BitStreamProcessor::~BitStreamProcessor()
{
    //dtor
}

/* Initialize new terminal i/o settings */
static struct termios old, new1;

void BitStreamProcessor::initTermios(int echo)
{
    tcgetattr(0, &old); /* grab old terminal i/o settings */
    new1 = old; /* make new settings same as old settings */
    new1.c_lflag &= ~ICANON; /* disable buffered i/o */
    new1.c_lflag &= echo ? ECHO : ~ECHO; /* set echo mode */
    tcsetattr(0, TCSANOW, &new1); /* use these new terminal i/o settings now */
}

/* Restore old terminal i/o settings */
void BitStreamProcessor::resetTermios(void)
{
    tcsetattr(0, TCSANOW, &old);
}

void BitStreamProcessor::initialize()
{
    // don't require 'newline' character to be read from input
    initTermios(0);
}

void BitStreamProcessor::processBit(char bit)
{
    // only process the bit if the processor does not have a character ready
    if(!ready)
    {
        if (bit == '1' || bit == '0')
        {
            if(bit == '1')
            {
                character |= 0b00000001 << bitNumber; // set the bit corresponding to the current character
            }

            if(bitNumber <= 0)
            {
                ready = true;
            }
            else
            {
                bitNumber--;
            }
        }
        else
        {
            printf("Only 1's and 0's may be input.\n");
        }
    }
}

void BitStreamProcessor::reset()
{
    character = 0;
    bitNumber = 7;
    ready = false;
}

char BitStreamProcessor::getCharacter()
{
    return character;
}

bool BitStreamProcessor::isReady()
{
    return ready;
}
