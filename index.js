const stdin = process.stdin;

const preamble = "CAPTIVATION";
const preambleAsBitsString = stringToAsciiBits(preamble);
const MESSAGE_TARGET_LENGTH = 100 * 8;

/*
Approach:
- Read in a chunk from stdin stream (unknown size - entire stream could be large and will be broken up into manageable chunks)
- If chunk contains the preamble and has enough length for the full emssage, print next 100 characters. Then search for the preamble with the reminder of the chunk
- If chunk contains the preamble but does not have enough length for the full message, print X character (where X is message size available), then print 100-X of next chunk. Then search where we left off
- If chunk does not contain the preamble, the end of it this chunk could be paired with the beginning of the next chunk to create the full preamble. Save the last preableLength of characters and append it to the beginning of the next chunk
*/

// stdin will be a string instead of a Buffer
stdin.setEncoding("utf8");

let previousChunk = "";
let sizeMessageRemainingToPrint = 0;

stdin.on("data", processChunk);

// (chunk: string) -> void
function processChunk(chunk) {
  stdin.pause();

  const preambleStartIndex = chunk.indexOf(preambleAsBitsString);

  if (preambleStartIndex === -1) return;

  const messageStartInd = preambleStartIndex + preambleAsBitsString.length;
  const messageEndInd = messageStartInd + MESSAGE_TARGET_LENGTH;

  let messageBits = chunk.substring(messageStartInd, messageEndInd);
  // print the frist message
  process.stdout.write(asciiBitsToString(messageBits));

  //recursively check the rest of the string
  processChunk(chunk.substring(messageEndInd));
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
