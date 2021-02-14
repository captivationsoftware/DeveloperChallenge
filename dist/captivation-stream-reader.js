"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CaptivationStreamReader {
    constructor() { }
    /**
     * Decodes a binary string
     * @param encodedStream
     */
    decode(str) {
        var binString = '';
        str.split(' ').map(function (bin) {
            binString += String.fromCharCode(parseInt(bin, 2));
        });
        return binString;
    }
    searchForCaptivation(decodedString) {
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
    findIndexesOfSubString(substring, string) {
        var a = [], i = -1;
        while ((i = string.indexOf(substring, i + 1)) >= 0)
            a.push(i);
        return a;
    }
}
exports.default = CaptivationStreamReader;
//# sourceMappingURL=captivation-stream-reader.js.map