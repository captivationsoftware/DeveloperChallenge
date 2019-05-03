package com.malam;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;

public class CaptivationChallenge {
	
	public static final int LETTERS_TO_PRINT = 100;
	public static final String PREAMBLE = "CAPTIVATION";
	
	public static void main(String [] args) throws IOException {
		
		try {
			RandomAccessFile testFile = new RandomAccessFile(args[0], "rw"); //Use random access file to manipulate indices
			int letterPrintCount = 0; //Keep track of how many letters have been printed.
			boolean havePreamble = false; 
			int index = 0; //Compare input letter to letter in Preamble at specified Index.
			
			int inputIndex = 0; //Keep track of where you are reading the input itself.
			boolean readInput = true;
			
			//reads input forever
			while(readInput) {
				
				int maxIterations = inputIndex + 8; //Iterate 8 bits at a time.
				
				String binaryLetter = ""; //8 bit letter read from the file
				char convertedLetter; //binaryLetter converted text
				
				//Get eight binary numbers below from the input file.
				for(int i = inputIndex; i < maxIterations; i++) {
					binaryLetter += (char)testFile.read(); //Only read one byte, instead of entire line
					inputIndex++;
				}
		
				int charCode = Integer.parseInt(binaryLetter, 2); //Binary string to integer here
				convertedLetter = (char)charCode;//We have the letter here.
				
				if(havePreamble) {
					System.out.print(convertedLetter);
					letterPrintCount++;
					//Reset havePreamble to false if 100 letters printed
					if(letterPrintCount == LETTERS_TO_PRINT) {
						havePreamble = false;
						index = 0; //Reset index to find the preamble again
						letterPrintCount = 0; //Reset letter count to 0;
					}
				}
				//Next char or Preamble itslef found in sequence. Index keeps track of preamble found status.
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
					testFile.seek(inputIndex); //Adjust 'head' on file by 7 backspaces.
				}
			}
			
		}catch (FileNotFoundException e) {
			System.out.println("Please supply a valid file.");
		}
	}
}
