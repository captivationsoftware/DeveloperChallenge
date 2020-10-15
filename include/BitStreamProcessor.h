#ifndef BITSTREAMPROCESSOR_H
#define BITSTREAMPROCESSOR_H


class BitStreamProcessor
{
public:
    BitStreamProcessor();
    virtual ~BitStreamProcessor();
    void initialize();
    void processBit(char bit);
    char getCharacter();
    bool isReady();
    void reset();

protected:

private:
    void initTermios(int);
    void resetTermios();

    char character = 0b00000000;
    char bitNumber = 7; // between 0 and 7 for each char
    char ready = false;

};

#endif // BITSTREAMPROCESSOR_H
