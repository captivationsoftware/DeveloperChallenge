package com.tasmot;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.util.concurrent.BlockingQueue;

import static com.tasmot.ProcessBinaryStream.BUFFER_SIZE;
import static java.lang.Thread.currentThread;

public class ReadStream
		implements Runnable {
	private static final Logger logger = LogManager.getLogger(ReadStream.class);

	private final BlockingQueue<String> blockingQueue;

	public ReadStream(BlockingQueue<String> blockingQueue) {
		this.blockingQueue = blockingQueue;
	}

	@Override
	public void run() {

		byte[] inputBuffer = new byte[BUFFER_SIZE];
		StringBuilder inBuffer = new StringBuilder(BUFFER_SIZE);
		int charCnt = 0;
		int charTotal = 0;

		while (true) {

			try {
				charCnt = System.in.read(inputBuffer);
				charTotal += charCnt;
				inBuffer.append(new String(inputBuffer));
			} catch (IOException e) {
				e.printStackTrace();
				currentThread().interrupt();
			}

			try {
				if (inBuffer.length() > 0) {
					blockingQueue.put(inBuffer.toString());
					inBuffer.setLength(0);
				}

				/*
				 * The following is for testing only       ===============================
				 */
				if (charCnt == -1) {
					logger.info("Reached end of File actually this is only for testing");
					blockingQueue.put("EOF");
					logger.info("chars read: {}", charTotal);
					return;
				}
				/*
					End Testing only                        ===============================
				 */

			} catch (InterruptedException e) {
				currentThread().interrupt();
			}
		}
	}
}

