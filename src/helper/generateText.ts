import wordList from "./wordList";

function getWord() {
  return wordList.splice(Math.floor(wordList.length * Math.random()), 1);
}

export function generateText() {
  return new Array(10)
    .fill("")
    .map(() => getWord())
    .join(" ");
}
