/*
Approach:
- Read in a chunk from process.stdin stream (unknown size - entire stream could be large and will be broken up into manageable chunks)
- If chunk contains the preamble and has enough length for the full emssage, print next 100 characters. Then search for the preamble with the reminder of the chunk
- If chunk contains the preamble but does not have enough length for the full message, print X character (where X is message size available), then print 100-X of next chunk. Then search where we left off
- If chunk does not contain the preamble, the end of this chunk could be paired with the beginning of the next chunk to create the full preamble. Save the last preambleLength characters and append it to the beginning of the next chunk
*/

const { stringToAsciiBits, writeBits } = require("./utils");

const preamble = "CAPTIVATION";
const preambleAsBits = stringToAsciiBits(preamble);
const MESSAGE_BITS_TARGET_LENGTH = 100 * 8;

// process.stdin will be a string instead of a Buffer
process.stdin.setEncoding("utf8");

let previousChunk = "";
let sizeRemainingToPrint = 0;

process.stdin.on("data", function processChunk(chunk) {
  process.stdin.pause();

  let startSearchIndex = 0;
  chunk = previousChunk + chunk;

  if (sizeRemainingToPrint > 0) {
    const previousMessageToPrint = chunk.substring(0, sizeRemainingToPrint);
    writeBits(previousMessageToPrint);
    sizeRemainingToPrint = 0; // Chunk size is always bigger than a message
    startSearchIndex = previousMessageToPrint.length;
  }

  let preambleStartIndex = chunk.indexOf(preambleAsBits, startSearchIndex);
  let messageEndInd = 0;

  while (preambleStartIndex !== -1) {
    const messageStartInd = preambleStartIndex + preambleAsBits.length;
    messageEndInd = Math.min(
      messageStartInd + MESSAGE_BITS_TARGET_LENGTH,
      chunk.length
    );

    // Ensure we don't print less than 8 bits (a single UTF-8 char). In manual testing seems chunks are always multiples of 8, so probably unnecessary.
    if ((messageEndInd - messageStartInd) % 8 !== 0) {
      messageEndInd -= (messageEndInd - messageStartInd) % 8;
    }

    let messageBits = chunk.substring(messageStartInd, messageEndInd);
    writeBits(messageBits);

    sizeRemainingToPrint = MESSAGE_BITS_TARGET_LENGTH - messageBits.length;
    preambleStartIndex = chunk.indexOf(preambleAsBits, messageEndInd);
  }

  if (sizeRemainingToPrint === 0) {
    // add end of this chunk to beginning of next if searching for preamble
    previousChunk = chunk.substring(chunk.length - preambleAsBits.length);
  } else {
    // add end of this chunk to beginning of next if writing and the message was not divisble by 8
    previousChunk = chunk.substring(messageEndInd);
  }

  process.stdin.resume();
});
