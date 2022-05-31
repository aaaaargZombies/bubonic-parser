const wordRegEx = /[\p{L}'’0-9]/u;

const addTag = (s, config) => {
  let { tag, split, classList } = config;
  let openTag = classList.length
    ? `${tag} class="${classList.join(" ")}"`
    : tag;
  let slicePoint = Math.floor(s.length * split)
    ? Math.floor(s.length * split)
    : 1;
  return `<${openTag}>${s.slice(0, slicePoint)}</${tag}>${s.slice(slicePoint)}`;
};

const notAWordBoundary = (a, b) => wordRegEx.test(a) === wordRegEx.test(b);

const isTag = (s) =>
  (s.length === 1 && s === "<") || (/^<\w|^<\//.test(s) && !/<[0-9]/.test(s));

// CONFIG OBJ
// {
// tag: string
// classList: [string]
// split: float 0-1
// }
const defaultConfig = { tag: "b", classList: [], split: 0.5 };

const parse = (string, optionalConfig) => {
  const config = { ...defaultConfig, ...optionalConfig };
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
            ? addTag(expression, config)
            : expression);
        // clear the expression and continue.
        expression = string[pointer];
        pointer++;
      }
    }
  }
  // combine the result and remaining expression at end of while loop and return
  return (
    result +
    (wordRegEx.test(expression[0]) ? addTag(expression, config) : expression)
  );
};

export { parse, wordRegEx, addTag, notAWordBoundary, isTag };
