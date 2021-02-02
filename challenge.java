
import java.io.IOException;
import java.io.File;
import java.io.FileNotFoundException;

import java.util.LinkedList;
import java.util.NoSuchElementException;
import java.util.Scanner;
import java.util.Queue;

public class challenge{

    public static void main(String[] args)throws IOException, InterruptedException{
        //Sets up terminal for raw input
        String[] cmd = {"/bin/sh", "-c", "stty raw </dev/tty"};
        Runtime.getRuntime().exec(cmd).waitFor();

        //Reverts terminal to normal with a shutdown hook
        Runtime.getRuntime().addShutdownHook(new Thread(){
            public void run(){
                String[] cmd2 = {"/bin/sh", "-c", "stty cooked </dev/tty"};
                try{
                Runtime.getRuntime().exec(cmd2).waitFor();
                }
                catch(Exception e){}
            }   
        });

        challenge t = new challenge();
        //C = 01000011
        @SuppressWarnings("unchecked")
        Queue<Character> queue = t.setup();

        while(true){
            //Checks if the letters in the queue make 'C'
            if(t.checkC(queue)){
                //'C' was found, check for APTIVATION
                if(t.checkFlag()){
                    t.printHundred();
                }
            }
            queue.remove();
            queue.add((char)System.in.read());
        }
    }

    //Setup, populates queue which will be running FIFO to check for the char 'C'
    Queue setup() throws IOException{
        Queue<Character> setup = new LinkedList<>();
        for (int i = 0; i < 8; i++) {
            setup.add((char)System.in.read());
        }
        return setup;
    }

    //Checks to see if these 8 bits are equal to C
    boolean checkC(Queue<Character> queue) throws IOException{
        Queue<Character> local = new LinkedList<>(queue);
        String binary = "";
        for (int i = 0; i < 8; i++) {
            binary += local.remove();
        }
        int decimal = Integer.parseInt(binary,2);
        char letter = (char) decimal;

        return (letter == 'C');
    }  

    //Reads in the next 8 bits, and converts to a char
    char getLetter() throws IOException{

        String binary = "";
        for (int i = 0; i < 8; i++) {
            binary += (char)System.in.read();
        }
        int decimal = Integer.parseInt(binary,2);
        char letter = (char) decimal;
        return letter;
    }

    //Checks to see if the rest of the preamble string is correct
    boolean checkFlag() throws IOException{

        char[] correct = {'A','P','T','I','V','A','T','I','O','N'};
        for (int i = 0; i < 10; i++) {
            if(getLetter() != correct[i]){
                return false;
            }
        }
        return true;
    }  

    //Prints the next 100 characters
    void printHundred() throws IOException{
        String output = "";
        for (int i = 0; i < 100; i++) {
            output += getLetter();
        }
        System.out.println(output);
    }
}