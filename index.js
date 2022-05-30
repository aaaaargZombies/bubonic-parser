const wordRegEx = /[\p{L}'’0-9]/u;

const addTagsIfWord = (s, tag) => {
  if (wordRegEx.test(s[0])) {
    if (s.length === 1) return `<${tag}>${s}</${tag}>`;
    return `<${tag}>${s.slice(0, Math.floor(s.length / 2))}</${tag}>${s.slice(
      Math.floor(s.length / 2),
    )}`;
  }
  return s;
};

const notAWordBoundary = (a, b) => wordRegEx.test(a) === wordRegEx.test(b);

const isTag = (s) =>
  (s.length === 1 && s === "<") || (/^<\w|^<\//.test(s) && !/<[0-9]/.test(s));

const parse = (string, tag = "b") => {
  // iterate over string pushing letters onto an expression.
  // check if expression is part of HTML tag, don't add extra markup into this
  // if not compare end of expression and current point in string to detect word boundaries
  // if no boundary detected continue adding to expression
  // if we hit a boundary add the new expression to result via a test for letters (adding tags if its a word).
  // clear the expression and continue.
  // combine the result and remaining expression at end of while loop and return
  let pointer = 1;
  let result = "";
  let expression = string[0];
  while (pointer < string.length) {
    if (isTag(expression)) {
      if (/>$/.test(expression)) {
        result = result + expression;
        expression = string[pointer];
        pointer++;
      } else {
        expression = expression + string[pointer];
        pointer++;
      }
    } else {
      if (
        notAWordBoundary(expression[expression.length - 1], string[pointer]) &&
        string[pointer] !== "<"
      ) {
        expression = expression + string[pointer];
        pointer++;
      } else {
        result = result + addTagsIfWord(expression, tag);
        expression = string[pointer];
        pointer++;
      }
    }
  }
  return result + addTagsIfWord(expression);
};

document
  .querySelectorAll("p")
  .forEach((p) => (p.innerHTML = processInput(p.innerHTML)));
