import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Decoder {

  StringBuilder preamble = new StringBuilder();
  StringBuilder response = new StringBuilder();

  public Decoder() {
    run();
  }

  public void run() {
    BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
    boolean preambleFound = false;

    int bit = 0;

  
    while (bit > -1) {
      try {
        //Read one character at a time
        bit = reader.read();
        char bitChar = (char) bit;

        // Check if bit is a 0 or 1
        if (bit == 49 || bit == 48) {

          //If the preamble has not been found we need to keep looking for it
          if (!preambleFound) {

            //if the preamble stringbuilder queue is at 88 then check if it equals CAPTIVATION
            if (preamble.length() >= 88) {

              // Does preamble = CAPTIVATION?
              String decodedPreamble = decodeBinaryString(preamble.toString());
              if (decodedPreamble.compareTo("CAPTIVATION") == 0) {
                //the preamble was found. set a flag and reset the preamble stringbuilder queue
                preambleFound = true;
                preamble = new StringBuilder();

                //Add current bit we just received to response string
                response.append(bitChar);
              } else {
                //preamble not found, dequeue character from stringbuilder
                preamble.deleteCharAt(0);
                //append new character to end of string builder.
                preamble.append(bitChar);
              }

            } else {
              //preamble stringbuilder isnt long enough to be the preamble yet, so simply append to it.
              preamble.append(bitChar);
            }

          } else {
            // Preamble was found now accumulate next 100 characters and then print to screen.
            if (response.length() < 800) {
              // keep adding to response string
              response.append(bitChar);
            } else {
              // We have 100 characters, print to screen
              System.out.println(decodeBinaryString(response.toString()));

              // reset response string holder
              response = new StringBuilder();
              // reset preambleFound Flag
              preambleFound = false;

            }
          }
        }
      } catch (IOException e) {
        e.printStackTrace();
      }

    }
  }

  //Converts a string of 1's and 0's to a character string
  public String decodeBinaryString(String binaryString) {
    int intChar;
    String stringChar;
    StringBuilder stringBuilder = new StringBuilder();
    for (int i = 0; i < binaryString.length(); i += 8) {
      intChar = Integer.parseInt(binaryString.substring(i, i + 8), 2);
      stringChar = Character.toString((char) intChar);
      stringBuilder.append(stringChar);
    }
    return stringBuilder.toString();
  }

  public static void main(String arg[]) {
    new Decoder();
  }
}