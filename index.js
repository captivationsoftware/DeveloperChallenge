/*
Approach:
- Read in a chunk from stdin stream (unknown size - entire stream could be large and will be broken up into manageable chunks)
- If chunk contains the preamble and has enough length for the full emssage, print next 100 characters. Then search for the preamble with the reminder of the chunk
- If chunk contains the preamble but does not have enough length for the full message, print X character (where X is message size available), then print 100-X of next chunk. Then search where we left off
- If chunk does not contain the preamble, the end of it this chunk could be paired with the beginning of the next chunk to create the full preamble. Save the last preableLength of characters and append it to the beginning of the next chunk
*/

const stdin = process.stdin;
const stdout = process.stdout;

const preamble = "CAPTIVATION";
const preambleAsBitsString = stringToAsciiBits(preamble);
const MESSAGE_TARGET_LENGTH = 100 * 8;

// stdin will be a string instead of a Buffer
stdin.setEncoding("utf8");

let previousChunk = "";
let sizeOfMessageRemainingToPrint = 0;

stdin.on("data", processChunk);

// (chunk: string) -> void
function processChunk(chunk) {
  stdin.pause();

  let startSearchIndex = 0;
  chunk = previousChunk + chunk;

  if (sizeOfMessageRemainingToPrint > 0) {
    const previousMessageToPrint = chunk.substring(
      0,
      sizeOfMessageRemainingToPrint
    );

    stdout.write(asciiBitsToString(previousMessageToPrint));

    // probably always 0. Chunk is probably alway bigger than a message
    sizeOfMessageRemainingToPrint = Math.max(
      0,
      MESSAGE_TARGET_LENGTH - previousMessageToPrint.length
    );

    startSearchIndex = previousMessageToPrint.length;
  }

  let preambleStartIndex = chunk.indexOf(
    preambleAsBitsString,
    startSearchIndex
  );

  while (preambleStartIndex !== -1) {
    const messageStartInd = preambleStartIndex + preambleAsBitsString.length;
    let messageEndInd = Math.min(
      messageStartInd + MESSAGE_TARGET_LENGTH,
      chunk.length
    );

    if ((messageEndInd - messageStartInd) % 8 !== 0) {
      messageEndInd = (messageEndInd - messageStartInd) % 8;
    }

    let messageBits = chunk.substring(messageStartInd, messageEndInd);
    previousChunk = chunk.substring(messageEndInd);

    sizeOfMessageRemainingToPrint = MESSAGE_TARGET_LENGTH - messageBits.length;

    stdout.write(asciiBitsToString(messageBits));

    preambleStartIndex = chunk.indexOf(preambleAsBitsString, messageEndInd);
  }

  if (sizeOfMessageRemainingToPrint === 0) {
    previousChunk = chunk.substring(chunk.length - preambleAsBitsString.length);
  }

  stdin.resume();
}

// (s: string) -> string
function stringToAsciiBits(s) {
  const acsiiArr = s
    .split("")
    .map((letter) => letter.charCodeAt(0).toString(2).padStart(8, "0"));

  return acsiiArr.join("");
}

// (s: string) -> string
function asciiBitsToString(s) {
  let messageStr = "";
  for (let i = 0; i < s.length; i += 8) {
    messageStr += String.fromCharCode(parseInt(s.substring(i, i + 8), 2));
  }

  return messageStr;
}
