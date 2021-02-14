
import CaptivationStreamReader from "./captivation-stream-reader";

try {
    const captivationStreamReader = new CaptivationStreamReader();

    process.stdin.resume();
    process.stdin.on(
        'data',
        (chunk) => {

            const inputStream = chunk.toString();
            const decodedString = captivationStreamReader.decode(inputStream);
            const messages = captivationStreamReader.searchForCaptivation(decodedString);

            for (const msg of messages) {
                console.log(msg);
            }
        }
    );
}
catch (err) {
    console.error('Something broke ?:' + err.toString());
}