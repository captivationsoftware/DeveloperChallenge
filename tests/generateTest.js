const fs = require("fs");

const preamble = "CAPTIVATION";
const preambleAsBitsString = asciiToBitsString(preamble);

function asciiToBitsString(s) {
  const acsiiArr = s
    .split("")
    .map((letter) => letter.charCodeAt(0).toString(2).padStart(8, "0"));

  return acsiiArr.join("");
}

let testData = "";

for (let i = 0; i < 10000; i++) {
  testData += asciiToBitsString("CAPTIVATION");
  for (let j = 0; j < 11; j++) {
    testData += asciiToBitsString(`^${i}/${j}`.padEnd(9, "X") + "$");
  }
  testData += asciiToBitsString("FILLER".repeat(107));
}

const fileName = "testData.txt";
fs.writeFile(fileName, testData, (err) => {
  if (err) throw err;
  console.log(`Wrote to ${fileName}`);
});
