export default class CaptivationStreamReader {
    constructor();
    /**
     * Decodes a binary string
     * @param encodedStream
     */
    decode(str: string): string;
    searchForCaptivation(decodedString: string): string[];
    findIndexesOfSubString(substring: string, string: string): number[];
}
