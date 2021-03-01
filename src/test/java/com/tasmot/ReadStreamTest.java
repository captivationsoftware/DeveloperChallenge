package com.tasmot;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;

import static org.junit.Assert.assertEquals;

public class ReadStreamTest {

	private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
	private final PrintStream originalOut = System.out;
	DecodeBinaryStream decodeBinaryStream;
	BlockingQueue<String> blockingQueue = new LinkedBlockingDeque<>();
	String input;

	@Before
	public void setUp() {
		decodeBinaryStream = new DecodeBinaryStream(blockingQueue);
		input =
				"10000111000001101000010101001001001101011010000011010100100100110011111001110010000010101001101000" +
						"110100111100110100000110100111100110100000111010011010001100101010000011011011100101111001" +
						"111100111100001110011111001010100000111011111010001100101111001011001010100000100100101000" +
						"001110011111010111000111100011110010111100111110011110011011101011101100110110011110010100" +
						"000110011011011111110101110111011001000100000111010011010001100101010000010000111000001101" +
						"000010101001001001101011010000011010100100100110011111001110010000011100001110010110010111" +
						"000011101101110001011011001100101010000011000011101110110010001000001001001010011111011010" +
						"100000111000011100101101001110111011101001101001110111011001110100000110100111101000100000" +
						"11011111110101111010001000010100001010000101010101010101";
		System.setOut(new PrintStream(outContent));

	}

	@After
	public void tearDown() {
		System.setOut(originalOut);
	}

	@Test
	public void run1() throws
	                   InterruptedException {

		blockingQueue.put(input);

		Thread decodeBinaryStreamThread = new Thread(decodeBinaryStream,
				"Process the binary string and Search for 'CAPTIVATION'."
		);
		decodeBinaryStreamThread.start();

		decodeBinaryStreamThread.join();

		assertEquals(" This is the message where I successfully found the CAPTIVATION preamble and I'm printing it " +
				"out!!!\r\n", outContent.toString());
	}


	@Test
	public void run8() throws
	                   InterruptedException {

		input = input + input + input + input + input + input + input + input;
		blockingQueue.put(input);

		Thread decodeBinaryStreamThread = new Thread(decodeBinaryStream,
				"Process the binary string and Search for 'CAPTIVATION'."
		);
		decodeBinaryStreamThread.start();

		decodeBinaryStreamThread.join();

		assertEquals(
			" This is the message where I successfully found the CAPTIVATION preamble and I'm printing it out!!!\r\n" +
					" This is the message where I successfully found the CAPTIVATION preamble and I'm printing it out!!!\r\n" +
					" This is the message where I successfully found the CAPTIVATION preamble and I'm printing it out!!!\r\n" +
					" This is the message where I successfully found the CAPTIVATION preamble and I'm printing it out!!!\r\n" +
					" This is the message where I successfully found the CAPTIVATION preamble and I'm printing it out!!!\r\n" +
					" This is the message where I successfully found the CAPTIVATION preamble and I'm printing it out!!!\r\n" +
					" This is the message where I successfully found the CAPTIVATION preamble and I'm printing it out!!!\r\n" +
					" This is the message where I successfully found the CAPTIVATION preamble and I'm printing it out!!!\r\n",
				outContent.toString());
	}
}
