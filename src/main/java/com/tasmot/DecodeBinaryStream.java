package com.tasmot;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.concurrent.BlockingQueue;

import static com.tasmot.ProcessBinaryStream.BUFFER_SIZE;
import static com.tasmot.ProcessBinaryStream.asciiCharLen;
import static java.lang.Integer.parseInt;

public class DecodeBinaryStream
		implements Runnable {
	private final Logger logger;

	private static final int INTERESTING_CHARS_AFTER_CAPTIVATION = 100;
	private final BlockingQueue<String> blockingQueue;

	private static final String CAPTIVATION = "CAPTIVATION";
	private static final int CAPTIVATION_LENGTH = CAPTIVATION.length();
	private static final int minLength = (CAPTIVATION.length() + INTERESTING_CHARS_AFTER_CAPTIVATION);


	public DecodeBinaryStream(BlockingQueue<String> blockingQueue) {
		logger = LogManager.getLogger(this.getClass().getName());
		this.blockingQueue = blockingQueue;
	}

	@Override
	public void run() {
		StringBuilder fromQueueBuffer = new StringBuilder(BUFFER_SIZE * 2);
		StringBuilder inputAsString = new StringBuilder(BUFFER_SIZE * 2);
		boolean eofMarker = false;

		while (!blockingQueue.isEmpty() && !eofMarker) {
			try {
				fromQueueBuffer.setLength(0);
				fromQueueBuffer.append(blockingQueue.take());
				if (fromQueueBuffer.toString().startsWith("EOF")) {
					eofMarker = true;
				}
			} catch (InterruptedException e) {
				logger.info("Interrupted Exception was received, stopping now");
				Thread.currentThread().interrupt();
			}
			inputAsString.append(binaryToText(fromQueueBuffer));
//			logger.debug("this is the Input String: '{}'", inputAsString);

			while (inputAsString.length() > minLength) {
				if (inputAsString.substring(0, CAPTIVATION_LENGTH).equals(CAPTIVATION)) {
					logger.debug("found a CAPTIVATION");
					System.out.println(inputAsString.substring(CAPTIVATION_LENGTH,
							CAPTIVATION_LENGTH + INTERESTING_CHARS_AFTER_CAPTIVATION - 1
					                                          )
					                  );
					inputAsString.delete(0, CAPTIVATION_LENGTH + INTERESTING_CHARS_AFTER_CAPTIVATION);
				} else {
					inputAsString.deleteCharAt(0);
				}
			}
		}
		return;
	}

	public static String binaryToText(StringBuilder binary) {
		final Logger logger = LogManager.getLogger("binaryToText");

		char theChar;
		StringBuilder theString = new StringBuilder(2048);
		int i = 0;
		while (i + asciiCharLen <= binary.length()) {

			String oneBinaryChar = "0" + binary.substring(i, i + asciiCharLen);
//			System.out.println("the binary char length is: " + ("0" + binary.substring(i, i + asciiCharLen)).length() );
			theChar = (char) parseInt(oneBinaryChar, 2);
			theString.append(theChar);
			i = i + asciiCharLen;
		}
		logger.trace("The binaryToText String: '{}'", theString);

		return theString.toString();
	}
}
