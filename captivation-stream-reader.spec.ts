import CaptivationStreamReader from "./captivation-stream-reader";

const encode = (input: string) => {
    var characters = input.split('');

    return characters.map(function (char) {
        const binary = char.charCodeAt(0).toString(2)
        const pad = Math.max(8 - binary.length, 0);
        // Just to make sure it is 8 bits long.
        return '0'.repeat(pad) + binary;
    }).join('');
}


test('should decode binary string', () => {

    const intialString = "CAPTIVATIONLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet bibendum commodo. Praesent laoreet congue tortor non imperdiet. Maecenas mollis urna quis lacus molestie aliquet CAPTIVATIONut at tortor. Donec tempor urna sit amet dui tempus fringilla. Aliquam ultrices suscipit augue finibus dapibus. Curabitur laoreet ullamcorper CAPTIVATIONex,";
    const binaryString = encode(intialString);

    const captivationStreamReader = new CaptivationStreamReader();
    const decodedString = captivationStreamReader.decode(binaryString);
    expect(intialString).toBe(decodedString);

})

test('should find indexes of CAPTIVATION', () => {


    const intialString = "CAPTIVATIONLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet bibendum commodo. Praesent laoreet congue tortor non imperdiet. Maecenas mollis urna quis lacus molestie aliquet CAPTIVATIONut at tortor. Donec tempor urna sit amet dui tempus fringilla. Aliquam ultrices suscipit augue finibus dapibus. Curabitur laoreet ullamcorper CAPTIVATIONex,";

    const captivationStreamReader = new CaptivationStreamReader();
    const indexes = captivationStreamReader.findIndexesOfSubString("CAPTIVATION", intialString);
    expect(indexes).toStrictEqual([0, 196, 349])
})

test('should search for CAPTIVATION', () => {

    const intialString = "CAPTIVATIONLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet bibendum commodo. Praesent laoreet congue tortor non imperdiet. Maecenas mollis urna quis lacus molestie aliquet CAPTIVATIONut at tortor. Donec tempor urna sit amet dui tempus fringilla. Aliquam ultrices suscipit augue finibus dapibus. Curabitur laoreet ullamcorper CAPTIVATIONex,";

    const captivationStreamReader = new CaptivationStreamReader();
    const messages = captivationStreamReader.searchForCaptivation(intialString);

    expect(messages).toStrictEqual(["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris laoreet bibendum commodo. Praesent l",
        "ut at tortor. Donec tempor urna sit amet dui tempus fringilla. Aliquam ultrices suscipit augue finib",
        "ex,"]);

});

test('should have no messages when string does not have CAPTIVATION', () => {

    const intialString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt mauris tellus, sit amet eleifend metus auctor quis. Praesent consectetur augue eu arcu volutpat vulputate. Donec orci sapien, interdum quis commodo quis, scelerisque sit amet lacus. Proin consectetur, velit ut finibus imperdiet, eros metus hendrerit eros, vitae rhoncus nulla tellus a ipsum. Proin congue turpis vitae pulvinar auctor. Nunc vestibulum sapien non magna faucibus, vitae auctor lorem tempus. Phasellus eget lacus convallis, feugiat est id, aliquam diam. Duis id magna quis leo consequat venenatis vitae non metus. Morbi sed ultricies elit. Nunc lacinia ipsum tortor, quis pretium ex suscipit sit amet.";

    const captivationStreamReader = new CaptivationStreamReader();
    const messages = captivationStreamReader.searchForCaptivation(intialString);

    expect(messages).toStrictEqual([]);

});