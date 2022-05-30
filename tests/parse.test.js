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

test("parse(html, 'span') to add <span> tags to first half of words", () => {
  expect(parse(html, "span")).toBe(`<p class="indent">
<span>Fra</span>nkly <a href=\"/noWhere\"><span>I</span> <span>do</span>n’t <span>th</span>ink <span>th</span>at <span>poli</span>tical <span>awar</span>eness</a> <span>i</span>s
<span>go</span>ing <span>t</span>o <span>pr</span>ove <span>t</span>he <span>be</span>st <span>medi</span>cine <span>f</span>or <span>o</span>ur <span>cur</span>rent <span>mal</span>ady.
<em><span>Mo</span>st <span>peo</span>ple</em> <span>kn</span>ow <span>th</span>at <span>fina</span>ncial <strike><span>dictat</span>orship</strike>
</p>
`);
});
