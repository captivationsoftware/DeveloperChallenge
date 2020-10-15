#include "Captivation.h"

#include <iostream>

Captivation::Captivation()
{
    //ctor
}

Captivation::~Captivation()
{
    //dtor
}

void Captivation::process_stdin()
{
    char bit;
    int bitsRead = 0;
    int processors_active = 0;

    // continuously read from STDIN each character.
    while (true)
    {
        std::cin >> bit;
        bitsRead++;

        processors_active = getNumberActiveProcessors(bitsRead);

        for(int i = 0; i < processors_active; i++)
        {
            processBitWithProcessor(bit, &m_bsps[i]);
        }
    }
}

int Captivation::getNumberActiveProcessors(int bitsRead)
{
    if(bitsRead < BITS_PER_CHAR)
    {
        return bitsRead;
    }
    else
    {
        return BITS_PER_CHAR;
    }
}

void Captivation::processBitWithProcessor(char bit, BitStreamProcessor *processor)
{
    // this sets the bit according the the processors offset.
    processor->processBit(bit);

    // after reading 8 bits, the processor will have read one full byte
    if(processor->hasReadFullByte())
    {
        // if the current processor has found the preamble, and there are still characters left to print,
        // output the processed character to STDOUT.
        if(m_charactersLeftToPrint > 0 && processor->hasFoundPreamble())
        {
            std::cout << processor->getCharacter();
            m_charactersLeftToPrint--;
        }

        // reset the processor for the next byte
        processor->resetForNextByte();

        // additionally, search to see if the preamble has been found every time a new byte is read.
        // if it has been, reset the number of characters required to be read to 100.
        if(processor->searchForPreamble(m_preamble))
        {
            m_charactersLeftToPrint = 100;
        }
    }
}
