const fs = require("fs");

const preamble = "CAPTIVATION";
const preambleAsBitsString = asciiToBitsString(preamble);

function asciiToBitsString(s) {
  const acsiiArr = s
    .split("")
    .map((letter) => letter.charCodeAt(0).toString(2).padStart(8, "0"));

  return acsiiArr.join("");
}

const testData = asciiToBitsString(
  "CAPTIVATION" +
    "TESTING890".repeat(10) +
    "SHOULD_NOT_APPEAR" +
    "CAPTIVATION" +
    "PARTIAL_MESSAGE"
);

fs.writeFile("testFullMessage.txt", testData, (err) => {
  if (err) throw err;
  console.log("Wrote to file");
});
