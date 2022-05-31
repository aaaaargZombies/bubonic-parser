const wordRegEx = /[\p{L}'’0-9]/u;

const addTag = (s, tag) => {
  if (s.length === 1) return `<${tag}>${s}</${tag}>`;
  return `<${tag}>${s.slice(0, Math.floor(s.length / 2))}</${tag}>${s.slice(
    Math.floor(s.length / 2),
  )}`;
};

const notAWordBoundary = (a, b) => wordRegEx.test(a) === wordRegEx.test(b);

const isTag = (s) =>
  (s.length === 1 && s === "<") || (/^<\w|^<\//.test(s) && !/<[0-9]/.test(s));

const parse = (string, tag = "b") => {
  let pointer = 1;
  let result = "";
  let expression = string[0];
  // iterate over string pushing letters onto an expression.
  while (pointer < string.length) {
    // check if expression is part of HTML tag, don't add extra markup into this
    if (isTag(expression)) {
      // if tag is closed add the expression to the result, clear the expression, move the pointer.
      if (/>$/.test(expression)) {
        result = result + expression;
        expression = string[pointer];
        pointer++;
      } else {
        expression = expression + string[pointer];
        pointer++;
      }
    } else {
      // if not a tag compare end of expression and current point in string to detect word boundaries
      if (
        notAWordBoundary(expression[expression.length - 1], string[pointer]) &&
        // if no boundary detected continue adding to expression
        string[pointer] !== "<"
      ) {
        expression = expression + string[pointer];
        pointer++;
      } else {
        // if we hit a boundary add the acumulated expression to result via a test for letters (adding tags if its a word).
        result =
          result +
          (wordRegEx.test(expression[0])
            ? addTag(expression, tag)
            : expression);
        // clear the expression and continue.
        expression = string[pointer];
        pointer++;
      }
    }
  }
  // combine the result and remaining expression at end of while loop and return
  return (
    result + (wordRegEx.test(expression[0]) ? addTag(expression) : expression)
  );
};

export { parse, wordRegEx, addTag, notAWordBoundary, isTag };
