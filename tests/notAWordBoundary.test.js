import { expect, test } from "vitest";
import { notAWordBoundary } from "../index";

test("notAWordBoundary('a', ' ') to return false", () => {
  expect(notAWordBoundary("a", " ")).toBe(false);
});

test("notAWordBoundary(' ', 'a') to return false", () => {
  expect(notAWordBoundary(" ", "a")).toBe(false);
});

test("notAWordBoundary('a', 'b') to return true", () => {
  expect(notAWordBoundary("a", "b")).toBe(true);
});

test("notAWordBoundary('a', `'`) to return false if given a number", () => {
  expect(notAWordBoundary("a", `'`)).toBe(true);
});

test("notAWordBoundary('a', '9') to return true if given a number", () => {
  expect(notAWordBoundary("a", "9")).toBe(true);
});

test("notAWordBoundary('1', '2') to return true if given a number", () => {
  expect(notAWordBoundary("1", "2")).toBe(true);
});

// greek
test("notAWordBoundary('β', 'η') to return true if given a number", () => {
  expect(notAWordBoundary("β", "η")).toBe(true);
});

// russion
test("notAWordBoundary('и', 'ю') to return true if given a number", () => {
  expect(notAWordBoundary("и", "ю")).toBe(true);
});

// Hebrew
test("notAWordBoundary('א', 'ה') to return true if given a number", () => {
  expect(notAWordBoundary("א", "ה")).toBe(true);
});

// Hebrew
test("notAWordBoundary('א', ' ') to return false if given a number", () => {
  expect(notAWordBoundary("א", " ")).toBe(false);
});

// Kanji
test("notAWordBoundary('日', '本') to return true if given a number", () => {
  expect(notAWordBoundary("日", "本")).toBe(true);
});

// Kanji
test("notAWordBoundary('日', ' ') to return false if given a number", () => {
  expect(notAWordBoundary("日", " ")).toBe(false);
});

// Arabic
test("notAWordBoundary('ص', 'ي') to return true if given a number", () => {
  expect(notAWordBoundary("ص", "ي")).toBe(true);
});

// Arabic
test("notAWordBoundary('ص', ' ') to return false if given a number", () => {
  expect(notAWordBoundary("ص", " ")).toBe(false);
});
