#include "BitStreamProcessor.h"
#include <iostream>

BitStreamProcessor::BitStreamProcessor()
{
    //ctor
}

BitStreamProcessor::~BitStreamProcessor()
{
    //dtor
}

void BitStreamProcessor::processBit(char bit)
{
    // only process the bit if the processor does not have a character ready
    if(!m_readFullByte)
    {
        // when a 1 is read, set the bit in the character byte
        if(bit == '1')
        {
            m_character |= 0b00000001 << m_bitNumber;
        }

        // update status on reading a full byte
        if(m_bitNumber <= 0)
        {
            m_readFullByte = true;
            // append character to string after a full byte is read.
            m_processedString += m_character;
        }
        else
        {
            m_bitNumber--;
        }
    }
}

void BitStreamProcessor::resetForNextByte()
{
    m_character = 0b00000000;
    m_bitNumber = 7;
    m_readFullByte = false;
}

char BitStreamProcessor::getCharacter()
{
    return m_character;
}

bool BitStreamProcessor::hasReadFullByte()
{
    return m_readFullByte;
}

/**
    When the preamble is searched for, the string stored in memory
    is also cleared or shrunk to avoid continuously growing how much memory
    the process is using.
*/
bool BitStreamProcessor::searchForPreamble(std::string preamble){
    size_t pos = m_processedString.find(preamble);
    if(pos != std::string::npos)
    {
        m_processedString.clear(); // erase the string. Memory usage not neccessary anymore.
        m_isAlignedWithPreamble = true;
        return true;
    }
    else if(m_processedString.length() > preamble.length())
    {
        // clear up memory by removing impossibly matching characters
        m_processedString.erase(0, m_processedString.length()-preamble.length());
    }

    return false;
}

bool BitStreamProcessor::isAlignedWithPreamble(){
    return m_isAlignedWithPreamble;
}

void BitStreamProcessor::finishReadingPreamble(){
    m_isAlignedWithPreamble = false;
}
