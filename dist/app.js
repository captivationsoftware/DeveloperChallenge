"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const captivation_stream_reader_1 = __importDefault(require("./captivation-stream-reader"));
try {
    const captivationStreamReader = new captivation_stream_reader_1.default();
    process.stdin.resume();
    process.stdin.on('data', (chunk) => {
        const inputStream = chunk.toString();
        const decodedString = captivationStreamReader.decode(inputStream);
        const messages = captivationStreamReader.searchForCaptivation(decodedString);
        for (const msg of messages) {
            console.log(msg);
        }
    });
}
catch (err) {
    console.error('Something broke ?:' + err.toString());
}
//# sourceMappingURL=app.js.map