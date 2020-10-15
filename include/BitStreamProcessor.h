#ifndef BITSTREAMPROCESSOR_H
#define BITSTREAMPROCESSOR_H

#include <string>

class BitStreamProcessor
{
public:
    BitStreamProcessor();
    virtual ~BitStreamProcessor();

    void processBit(char bit);

    char getCharacter();
    bool hasReadFullByte();
    void resetForNextByte();

    bool searchForPreamble(std::string);
    bool isAlignedWithPreamble();
    void finishReadingPreamble();

protected:

private:

    char m_character = 0b00000000;
    char m_bitNumber = 7; // between 0 and 7 for each char
    char m_readFullByte = false;
    std::string m_processedString = "";
    bool m_isAlignedWithPreamble = false;

};

#endif // BITSTREAMPROCESSOR_H
