import assert from 'assert';
import EventEmitter from 'events';
import { decode8bitWords, encodeMessage } from './helpers';

export default class Decoder extends EventEmitter {

  constructor(preamble, decodedLength) {
    super();
    this.PREAMBLE_ENGLISH = preamble;
    this.PREAMBLE = encodeMessage(preamble);
    this.ENCODED_LENGTH = decodedLength * 8;
    this.inputChars = '';
  }

  /**
   * checkMessage - examine the current set of input characters for the secret
   * message
   */
  checkMessage() {

    while (this.inputChars.length) {

      const indexOf = this.inputChars.indexOf(this.PREAMBLE);

      if (indexOf === -1) {
        return;
      }

      // remove preceding characters
      this.inputChars = this.inputChars.substring(indexOf);

      // if the length of characters is less than that of our known
      // preamble/message sequence, hold off on decoding the message
      if (this.inputChars.length < (this.PREAMBLE.length) + (this.ENCODED_LENGTH)) {
        return;
      }

      // the preamble comes next
      const preambleSubString = this.inputChars.substring(0, this.PREAMBLE.length);
      const preambleBitWords = preambleSubString.match(/.{1,8}/g);
      const preambleEnglish = decode8bitWords(preambleBitWords);
      assert.strictEqual(this.PREAMBLE_ENGLISH, preambleEnglish);

      // remove the preamble
      this.inputChars = this.inputChars.substring(this.PREAMBLE.length);

      // decode
      const eightbitWords = this.inputChars.substring(0, this.ENCODED_LENGTH).match(/.{1,8}/g);
      const decoded = decode8bitWords(eightbitWords);

      // remove the message
      this.inputChars = this.inputChars.substring(this.ENCODED_LENGTH);
      this.emit('decoded', decoded);
    }
  }

  /**
   * feedChunk - add string to internal string of input characters
   *
   * @param  {string} chunk
   */
  feedChunk(chunk) {
    this.inputChars = this.inputChars.concat(chunk);
    this.checkMessage();
  }
}
