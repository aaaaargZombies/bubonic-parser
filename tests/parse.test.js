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
