import { expect, test } from "vitest";
import { parse } from "../index";

const html = `<p class="indent">
Frankly <a href="/noWhere">I don’t think that political awareness</a> is
going to prove the best medicine for our current malady.
<em>Most people</em> know that financial <strike>dictatorship</strike>
</p>
`;

test("parse(html) to add <b> tags to first half of words", () => {
  expect(parse(html)).toBe(`<p class="indent">
<b>Fra</b>nkly <a href=\"/noWhere\"><b>I</b> <b>do</b>n’t <b>th</b>ink <b>th</b>at <b>poli</b>tical <b>awar</b>eness</a> <b>i</b>s
<b>go</b>ing <b>t</b>o <b>pr</b>ove <b>t</b>he <b>be</b>st <b>medi</b>cine <b>f</b>or <b>o</b>ur <b>cur</b>rent <b>mal</b>ady.
<em><b>Mo</b>st <b>peo</b>ple</em> <b>kn</b>ow <b>th</b>at <b>fina</b>ncial <strike><b>dictat</b>orship</strike>
</p>
`);
});

test("parse(html, { tag: 'span' }) to add <span> tags to first half of words", () => {
  expect(parse(html, { tag: "span" })).toBe(`<p class="indent">
<span>Fra</span>nkly <a href=\"/noWhere\"><span>I</span> <span>do</span>n’t <span>th</span>ink <span>th</span>at <span>poli</span>tical <span>awar</span>eness</a> <span>i</span>s
<span>go</span>ing <span>t</span>o <span>pr</span>ove <span>t</span>he <span>be</span>st <span>medi</span>cine <span>f</span>or <span>o</span>ur <span>cur</span>rent <span>mal</span>ady.
<em><span>Mo</span>st <span>peo</span>ple</em> <span>kn</span>ow <span>th</span>at <span>fina</span>ncial <strike><span>dictat</span>orship</strike>
</p>
`);
});

test("parse('1234567890') should add a tag around the first 5 characters", () => {
  expect(parse("1234567890")).toBe("<b>12345</b>67890");
});

test("parse('1234567890', {split: 0}) should add a tag around the first character", () => {
  expect(parse("1234567890", { split: 0 })).toBe("<b>1</b>234567890");
});

test("parse('12', {split: 0.1}) should add a tag around the first character", () => {
  expect(parse("12", { split: 0.1 })).toBe("<b>1</b>2");
});

test("parse('1234567890', {split: 0.2}) should add a tag around the first 2 characters", () => {
  expect(parse("1234567890", { split: 0.2 })).toBe("<b>12</b>34567890");
});

test("parse('1234567890', {split: 0.7}) should add a tag around the first 7 characters", () => {
  expect(parse("1234567890", { split: 0.7 })).toBe("<b>1234567</b>890");
});

test("parse('1234567890', {split: 1}) should add a tag around all the characters", () => {
  expect(parse("1234567890", { split: 1 })).toBe("<b>1234567890</b>");
});

test("parse(html, {classList: ['class1', 'class2']}) to add <b> tags to first half of words", () => {
  expect(parse(html, { classList: ["class1", "class2"] }))
    .toBe(`<p class="indent">
<b class="class1 class2">Fra</b>nkly <a href=\"/noWhere\"><b class="class1 class2">I</b> <b class="class1 class2">do</b>n’t <b class="class1 class2">th</b>ink <b class="class1 class2">th</b>at <b class="class1 class2">poli</b>tical <b class="class1 class2">awar</b>eness</a> <b class="class1 class2">i</b>s
<b class="class1 class2">go</b>ing <b class="class1 class2">t</b>o <b class="class1 class2">pr</b>ove <b class="class1 class2">t</b>he <b class="class1 class2">be</b>st <b class="class1 class2">medi</b>cine <b class="class1 class2">f</b>or <b class="class1 class2">o</b>ur <b class="class1 class2">cur</b>rent <b class="class1 class2">mal</b>ady.
<em><b class="class1 class2">Mo</b>st <b class="class1 class2">peo</b>ple</em> <b class="class1 class2">kn</b>ow <b class="class1 class2">th</b>at <b class="class1 class2">fina</b>ncial <strike><b class="class1 class2">dictat</b>orship</strike>
</p>
`);
});
