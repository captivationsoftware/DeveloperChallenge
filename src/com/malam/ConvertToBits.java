package com.malam;

import java.math.BigInteger;
import java.util.Scanner;

public class ConvertToBits {
	public static void main(String [] args) {
		Scanner scanner = new Scanner(System.in);
		
		String input = scanner.nextLine();
		
		String binary = new BigInteger(input.getBytes()).toString(2);
		//System.out.println("10010000110010101101100011011000110111100100000010101110110111101110010011011000110010000100001");
		System.out.println(binary);
	}

}
