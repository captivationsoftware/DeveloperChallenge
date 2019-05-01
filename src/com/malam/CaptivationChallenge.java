package com.malam;

import java.util.Scanner;

public class CaptivationChallenge {
    
    public static final int LETTERS_TO_PRINT = 100; //100 letters to print after finding preamble.
    public static final String PREAMBLE = "CAPTIVATION"; //Preamble we're looking for
    
    public static void main(String [] args) {
        
        Scanner scanner = new Scanner(System.in);
        
        String binaryInput; //Input from Stdin
        int letterPrintCount = 0;
        boolean havePreamble = false;
        int index = 0;
        
        int inputIndex = 0;
        boolean readInput = true;
        
        binaryInput = scanner.nextLine();
        while(readInput) {
            
            int maxIterations = inputIndex + 8; //Iterate 8 bits at a time.
            
            String binaryLetter = ""; //8 bit letter read from stdin
            char convertedLetter; //binaryLetter converted text
            
            //Get eight binary numbers below from the input. Also check in place to not go past input length
            //which is not needed if input is infinite, but for testing it is.
            for(int i = inputIndex; i < maxIterations && i < binaryInput.length(); i++) {
                binaryLetter += binaryInput.charAt(i);
                inputIndex++;   
            }
            
            //Not needed if input infinite, but for testing this was needed to avoid program breakage.
            if(binaryLetter.length() < 8) { 
                readInput = false;
                continue;
            }
            int charCode = Integer.parseInt(binaryLetter, 2); //Binary string to integer here
            convertedLetter = (char)charCode; //We have the letter here.
            
            //We have our preamble. Print out 100 chars after preamble.
            if(havePreamble) {
                System.out.print(convertedLetter);
                letterPrintCount++;
                //Kill loop if 100 chars have been printed.
                if(letterPrintCount == LETTERS_TO_PRINT) {
                    readInput = false;
                }
            }
            //Next char or Preamble itself found in sequence. Index keeps track of preamble found status.
            else if(convertedLetter == PREAMBLE.charAt(index)) {
                index++;
                if(index == PREAMBLE.length()) {
                    havePreamble = true;
                }
            }
            
            //False start. Need to start again, but bit by bit, not multiple of 8. Reset index by 7 backspaces.
            else {
                index = 0;
                inputIndex = inputIndex - 7;
            }         
        }   
    }
}