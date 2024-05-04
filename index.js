const fs = require("fs");
const readlineSync = require("readline-sync");
const csv = require("csv-parser");

const inputFile = readlineSync.question("Enter the path to the input file: ");
const content = fs.readFileSync(inputFile, "utf8");

const words = content.split(/\s+/);

const wordFreq = {};
words.forEach((word) => {
    word = word.toLowerCase();
    wordFreq[word] = (wordFreq[word] || 0) + 1;
});

const sortedWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .map(([word, count]) => ({ word, count }));

const outputFile = "keywords.json";
fs.writeFileSync(outputFile, JSON.stringify(sortedWords, null, 2));
console.log(`keywords stripped and saved to ${outputFile}`);

const csvOutputFile = "keywords.csv";
fs.writeFileSync(csvOutputFile, "Word,Count\n");
sortedWords.forEach((word) => {
    fs.appendFileSync(csvOutputFile, `${word.word},${word.count}\n`);
});
console.log(`Keywords stripped and saved to ${csvOutputFile}`);

const csvRawOutputFile = "keywordsraw.csv";
fs.writeFileSync(csvRawOutputFile, "Word\n");
sortedWords.forEach((word) => {
    fs.appendFileSync(csvRawOutputFile, `${word.word}\n`);
});
console.log(`Keywords stripped and saved to ${csvRawOutputFile}`);
