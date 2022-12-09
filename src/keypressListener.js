// characters that we care about accenting
const accentedChars = {
  'A': true,
  'a': true,
  'E': true,
  'e': true,
  'I': true,
  'i': true,
  'O': true,
  'o': true,
  'U': true,
  'u': true,
};

// TODO: We probably don't need to duplicate keys here with 'accentedChars'
//
// represents how one character is converted to its next "accented form"
//
// (one character can have one or two accented forms -- ex. e -> é -> è, a -> à)
const characterConversionMap = {
  'A': 'À',
  'a': 'à',
  'E': 'É',
  'É': 'È',
  'e': 'é',
  'é': 'è',
  'I': 'Ì',
  'i': 'ì',
  'O': 'Ó',
  'Ó': 'Ò',
  'o': 'ò',
  'U': 'Ù',
  'u': 'ù',
}

// keep track of the last character typed
let lastCharTyped;

// keep track of the focused element
let focusedElem;

// accents the character or returns 'undefined' if it can't be accented further
function convertCharToAccentedChar(char) {
  return characterConversionMap[char];
}

// track keys pressed
function handleKeyUp(ev) {
  const { key } = ev;
  
  if (lastCharTyped === undefined && accentedChars[key]) {
    // if the user typed one of the desired keys, start tracking it
    lastCharTyped = key;
    console.log('Detected accented char: ', key);
  } else if (lastCharTyped && key === '/') {
    // we received a slash, try to convert the last typed character to its next accented form
    const accentedChar = convertCharToAccentedChar(lastCharTyped);

    if (accentedChar) {
      // we want to keep tracking the key in case it can be accented further with another '/' character
      lastCharTyped = accentedChar;

      // swap the new character into the input
      const currentInputString = focusedElem.value;
      const newInputString = `${currentInputString.substring(0, currentInputString.length - 2)}${accentedChar}`;
      focusedElem.value = newInputString;
    } else {
      // the character cannot be accented further, so stop tracking and reset
      lastCharTyped = undefined;
    }
  } else {
    // got a key that we don't care about, so stop tracking and reset
    lastCharTyped = undefined
  }
}

// start listening to the focused element
document.addEventListener('focus', ev => {
  focusedElem = ev.target;
  focusedElem.addEventListener('keyup', handleKeyUp);
}, { capture: true });

// stop listening to the blurred element
document.addEventListener('blur', ev => {
  focusedElem.removeEventListener(handleKeyUp)
  focusedElem = undefined;
})