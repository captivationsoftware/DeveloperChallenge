/**
 * Class which is used to search a stream of bits to find a message after the text "CAPTIVATION"
 */
export default class CaptivationStreamReader {

    constructor() { }

    /**
     * Decodes a binary string 
     * @param input Input String to be decoded from binary 
     */
    decode(input: string) {
        let bytesLeft = input;
        let result = '';

        // Check if we have some bytes left
        while (bytesLeft.length) {
            // Get the first digits
            const byte = bytesLeft.substr(0, 8);
            bytesLeft = bytesLeft.substr(8);

            result += String.fromCharCode(parseInt(byte, 2));
        }

        return result;
    }

    /**
     * Search a string for the word CAPTIVATION
     * @param decodedString Decoded String
     */
    searchForCaptivation(decodedString: string) {


        const messages = [];
        // Find an instances for CAPTIVATION
        const indexesOfCaptivation = this.findIndexesOfSubString("CAPTIVATION", decodedString);

        if (indexesOfCaptivation.length != 0) {
            for (const indexOfCaptivation of indexesOfCaptivation) {

                // Get the message
                const startOfMessage = indexOfCaptivation + 11;
                const endOfMessage = startOfMessage + 100 < decodedString.length ? startOfMessage + 100 : decodedString.length;
                const message = decodedString.substring(startOfMessage, endOfMessage);
                messages.push(message);
            }
        }

        return messages;
    }

    /**
     * Finds the Indexes of a substring from a full string
     * @param substring Subtring used to search 
     * @param string Full string that contains sub string
     */
    findIndexesOfSubString(substring: string, fullString: string) {
        var a = [], i = -1;
        while ((i = fullString.indexOf(substring, i + 1)) >= 0) a.push(i);
        return a;
    }

}