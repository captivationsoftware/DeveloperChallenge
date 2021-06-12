// (s: string) -> string
exports.stringToAsciiBits = function (s) {
  const acsiiArr = s
    .split("")
    .map((letter) => letter.charCodeAt(0).toString(2).padStart(8, "0"));

  return acsiiArr.join("");
};

// (s: string) -> string
exports.asciiBitsToString = function (s) {
  let messageStr = "";
  for (let i = 0; i < s.length; i += 8) {
    messageStr += String.fromCharCode(parseInt(s.substring(i, i + 8), 2));
  }

  return messageStr;
};

// (s: string) -> void
exports.writeBits = function (s) {
  process.stdout.write(module.exports.asciiBitsToString(s));
};
