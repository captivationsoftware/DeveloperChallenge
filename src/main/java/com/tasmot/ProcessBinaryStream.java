package com.tasmot;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;

import static java.lang.Thread.sleep;


public class ProcessBinaryStream
		implements Runnable {
	Logger logger = LogManager.getLogger(ProcessBinaryStream.class);

	public static final int asciiCharLen = 7;
	public static final int BUFFER_SIZE = asciiCharLen * 200;


	ProcessBinaryStream() {

	}

	@Override
	public void run() {
		BlockingQueue<String> blockingQueue = new LinkedBlockingDeque<>();
		try {
			ReadStream readStdInStream = new ReadStream(blockingQueue);
			Thread readInputStreamThread = new Thread(readStdInStream, "Read Input Stream of Binary");
			readInputStreamThread.start();

			/**
			 * Allows time for the queue to fill up. before starting the queue, processor
			 */
			sleep(500);

			DecodeBinaryStream decodeBinaryStream = new DecodeBinaryStream(blockingQueue);
			Thread decodeBinaryStreamThread = new Thread(decodeBinaryStream, "Process the binary string and Search " +
					"for 'CAPTIVATION'.");
			decodeBinaryStreamThread.start();

			readInputStreamThread.join();
			logger.debug("The '{}' thread has ended", readInputStreamThread.getName());

			decodeBinaryStreamThread.join();
			logger.debug("The '{}' thread has ended", decodeBinaryStreamThread.getName());
		} catch (InterruptedException e) {
			logger.info("Interrupted Exception");
			Thread.currentThread().interrupt();
		}
	}
}








