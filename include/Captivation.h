#ifndef CAPTIVATION_H
#define CAPTIVATION_H

#include "BitStreamProcessor.h"

#define BITS_PER_CHAR 8
#define MESSAGE_LENGTH 100
#define PREAMBLE "CAPTIVATION"

class Captivation
{
public:
    Captivation();
    virtual ~Captivation();
    void process_stdin();

protected:

private:
    int getNumberActiveProcessors(int bitsRead);
    void processBitWithProcessor(char bit, BitStreamProcessor *processor);

    BitStreamProcessor m_bsps[BITS_PER_CHAR];
    int m_charactersLeftToPrint = 0;
};

#endif // CAPTIVATION_H
