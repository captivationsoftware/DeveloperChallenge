/**
 * Class which is used to search a stream of bits to find a message after the text "CAPTIVATION"
 */
export default class CaptivationStreamReader {

    constructor() { }

    /**
     * Decodes a binary string 
     * @param encodedStream 
     */
    decode(str: string) {
        var binString = '';

        str.split(' ').map(function (bin) {
            binString += String.fromCharCode(parseInt(bin, 2));
        });
        return binString;
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