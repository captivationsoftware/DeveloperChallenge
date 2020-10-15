#include <string>
#include <iostream>
#include "BitStreamProcessor.h"

using namespace std;

int main()
{
    int BITS_PER_CHAR = 8;
    string captivation = "CAPTIVATION";


    BitStreamProcessor bsps[BITS_PER_CHAR];
    string bsp_strings[BITS_PER_CHAR] = {""};
    bool processorsFoundCaptivation[BITS_PER_CHAR] = {false};

    for(BitStreamProcessor bsp : bsps)
    {
        bsp.initialize();
    }

    char bit;

    int bitNum = 0; // start new processor on each bit in the beginning of the stream.
    int max_processors = 0;
    int printCharacters = 0;

    printf("Now processing STDIN...\n");

    // continuously read from STDIN each character.
    // stagger 8 processors so that characters are read beginning at each bit.
    while (true)
    {
        cin >> bit;
        bitNum++;


        if(bitNum < BITS_PER_CHAR)
        {
            max_processors = bitNum;
        }
        else
        {
            max_processors = BITS_PER_CHAR;
        }

        for(int i = 0; i < max_processors; i++)
        {
            bsps[i].processBit(bit);
            if(bsps[i].isReady())
            {
                bsp_strings[i] += bsps[i].getCharacter();

                // if found, print next 100 characters.
                if(printCharacters > 0 && processorsFoundCaptivation[i] == true)
                {
                    cout << bsps[i].getCharacter();
                    printCharacters--;
                }
                else
                {
                    processorsFoundCaptivation[i] = false;
                }
                bsps[i].reset();


                // try to find CAPTIVATION
                size_t pos = bsp_strings[i].find(captivation);
                if(pos != string::npos)
                {
                    bsp_strings[i].clear(); // erase the string. Memory usage not neccessary anymore.
                    printCharacters = 100;
                    processorsFoundCaptivation[i] = true;
                }
                else if(bsp_strings[i].length() > captivation.length())
                {
                    // clear up memory by removing impossibly matching characters
                    bsp_strings[i].erase(0, bsp_strings[i].length()-captivation.length());
                }
            }
        }
    }
    return 0;
}
