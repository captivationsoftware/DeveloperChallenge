package com.tasmot;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sun.misc.Signal;
@SuppressWarnings("sunapi")
public class Main {
	private static final Logger logger = LogManager.getLogger(Main.class);

	public static void main(String[] args) {
		logger.info("Begin Main");

		installSignalHandler();

		ProcessBinaryStream pbs = new ProcessBinaryStream();
		pbs.run();
		logger.info("Main has ended");
	}

	@SuppressWarnings("sunapi")
	private static void installSignalHandler() {

		Signal.handle(new Signal("INT"),  // SIGINT
				signal -> logger.debug("Interrupted by Ctrl+C")
		             );
	}
}
