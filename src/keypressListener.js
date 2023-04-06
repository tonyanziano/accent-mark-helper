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

// accents the character or returns 'undefined' if it can't be accented further
function convertCharToAccentedChar(char) {
  return characterConversionMap[char];
}

function handleKeyUp(ev) {
  const { key, target } = ev;
  const { selectionStart, value } = target; // grab the cursor position of the input so we can parse around it

  console.log(`Selection start: ${selectionStart}`);

  // grab the current string and character typed
  const currentInputString = value;
  
  if (key === '/') {
    console.log('Detected a forward slash, grabbing the character to the left of the slash...')
    // look to the left of the cursor to see if we should transform the letter
    const charToTheLeft = currentInputString[selectionStart - 2] || '';
    const transformedChar = convertCharToAccentedChar(charToTheLeft);

    if (transformedChar) {
      console.log(`Converting ${charToTheLeft}/ --> ${transformedChar}`);
      const updatedInputString = `${currentInputString.substring(0, selectionStart - 2)}${transformedChar}${currentInputString.substring(selectionStart)}`;
      target.value = updatedInputString;
    }
  }
}

// keep track of the focused element
let focusedElem;

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