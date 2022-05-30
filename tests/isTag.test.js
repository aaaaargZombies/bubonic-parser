import { expect, test } from "vitest";
import { isTag } from "../index";

const html = `<p class="indent">
Frankly <a href="/noWhere">I don’t think that political awareness</a> is
going to prove the best medicine for our current malady.
<em>Most people</em> know that financial <strike>dictatorship</strike>
is destroying their life; the problem is knowing what to do about it. "It
is possible" that nothing can be done, that power has become so deeply
entrenched in the automati sms regulating daily life, connecting our
interchanges, and infiltrating our
<a id="page225"><span epub:type="pagebreak" id="pg225" title="225"/></a
>words, that bio-finan cial control cannot be undone, or avoided.
https://www/somewebsite.com/
</p>
`;

test("isTag to return false if given a number", () => {
  expect(isTag(9)).toBe(false);
});

test("isTag to return false if given 'hello world'", () => {
  expect(isTag("hello world")).toBe(false);
});

test("isTag to return false if '<'", () => {
  expect(isTag("<")).toBe(true);
});

test("isTag to return false if '< a'", () => {
  expect(isTag("< a")).toBe(false);
});

test("isTag to return true if given '</'", () => {
  expect(isTag("</")).toBe(true);
});

test("isTag to return false if given '<9'", () => {
  expect(isTag("<9")).toBe(false);
});

test("isTag to return false if given '< 9'", () => {
  expect(isTag("< 9")).toBe(false);
});

test("isTag to return false if given '< '", () => {
  expect(isTag("< ")).toBe(false);
});

test("isTag to return true if given multiline html", () => {
  expect(isTag(html)).toBe(true);
});

test(`isTag to return false if given 'hello <a href="#">world</a>'`, () => {
  expect(isTag('hello <a href="#">world</a>')).toBe(false);
});
