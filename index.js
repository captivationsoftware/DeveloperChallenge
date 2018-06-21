process.stdin.setEncoding('utf8');

const letters = [];
const preamble = 'CAPTIVATION';
const decodedLength = 100;
let captivated = false;

process.stdin.on('readable', onRead);

/**
 * onRead - readable event handler for process.stdin
 */
function onRead () {

  const chunk = process.stdin.read();

  if (!chunk) {
    return;
  }

  const split = chunk.split('');

  while (split.length) {
    const spliced = split.splice(0,8);
    const joined = spliced.join('');
    const parsed = parseInt(joined, 2);
    const letter = String.fromCharCode(parsed);

    // do not allow the list of letters to get longer than the known length of
    // the decoded message - though this should not happen
    if (letters.length < decodedLength) {
      letters.push(letter);
    }

    if (!captivated) {

      if (letters.length > preamble.length) {
        letters.shift();
      }

      if (letters.join('') === preamble) {

        // remove preamble, set flag
        letters.splice(0, preamble.length);
        captivated = true;
      }

    } else if (letters.length === decodedLength) {

      // message decoded!
      console.info(letters.join(''));
      process.stdin.removeListener('readable', onRead);
      break;
    }
  }
}
