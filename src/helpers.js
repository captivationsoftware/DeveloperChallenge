/**
 * padStart - pads the current string with another string (repeated, if needed)
 * so that the resulting string reaches the given length. The padding is
 * applied from the start (left) of the current string.
 *
 * @param  {string} s
 * @param  {number} targetLength
 * @param  {string} [padString]
 * @return {string}
 */
export function padStart (s, targetLength, padString) {

  let padded = s || '';
  const padStr = typeof padString === 'undefined' ? ' ' : padString;

  while (padded.length < targetLength) {
    padded = padStr + padded;
  }

  return padded;
}

/**
 * decode8bitWords - Decode an array of 8bit words representing ASCII characters
 *
 * @param  {string[]} words list of 8bit words
 * @return {string} decoded message
 */
export function decode8bitWords (words) {
  return words.reduce((msg, w) => {
    const parsed = parseInt(w, 2);
    return msg + String.fromCharCode(parsed);
  }, '');
}

export function encodeMessage (msg) {
  return msg
    .split('')
    .map((letter) => {
      const binaryString = letter.charCodeAt(0).toString(2);
      return padStart(binaryString, 8, '0');
    })
    .join('');
}
