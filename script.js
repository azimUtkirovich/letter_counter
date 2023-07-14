function getTextInfo(text) {

  const symbol = ['', '.', '?', ',', '!', ':', '`', ';',' ',`'`, `)`, `(`, `-`, `—`];
  const info = {
      lettersCount: 0,
      whiteSpaceCount: 0,
      wordsCount: 0,
      everyLettersCount: {}
  }

  const splitted = text.split(" ");
  const withoutEmptyStringArr = splitted.filter((e) => !symbol.includes(e));
  info.wordsCount = withoutEmptyStringArr.length;
  info.whiteSpaceCount = withoutEmptyStringArr.length - 1;

  for (let i = 0; i < text.length; i++) {

      if(!symbol.includes(text[i])) info.lettersCount++;

      const char = text[i].toLowerCase();

      if(!symbol.includes(text[i])){
          if(info.everyLettersCount[char]){
              info.everyLettersCount[char]++;  
          }
          else{
              info.everyLettersCount[char] = 1;
          }
      }
  }
  return info
}

const word = document.getElementById("text");
const count = document.getElementById("count");
const resultLetter = document.getElementById("resultLetter");
const resultSpace = document.getElementById("resultSpace");
const resultWords = document.getElementById("resultWords");
const letterFor = document.getElementById("letterFor");
const reset = document.getElementById("reset");

count.addEventListener("click", () => {
  const textInfo = getTextInfo(word.value);
  resultLetter.innerHTML = textInfo.lettersCount;
  resultSpace.innerHTML = textInfo.whiteSpaceCount;
  resultWords.innerHTML = textInfo.wordsCount;

  let everyLettersCountHTML = '';
  const sortedEntries = Object.entries(textInfo.everyLettersCount).sort(([a], [b]) => a.localeCompare(b));
  for (const [letter, count] of sortedEntries) {
    everyLettersCountHTML += `${letter}: ${count}<br>`;
  }
  letterFor.innerHTML = everyLettersCountHTML;

  console.log(textInfo.lettersCount);
  console.log(textInfo.whiteSpaceCount);
  console.log(textInfo.wordsCount);
  console.log(textInfo.everyLettersCount);
});

reset.addEventListener("click", () => {
  word.value = "";
  resultLetter.innerHTML = 0;
  resultSpace.innerHTML = 0;
  resultWords.innerHTML = 0;
  letterFor.innerHTML = '';
  console.log(word.value.split("").length);
});