# Bubonic Parser

_A reading aid for the plague times_.

## What

A simple parser that takes a HTML string and adds new tags to the first half of each word - while respecting the existing HTML tags. No dead links, no loss of other formatting.

## Why

![bionic reading](../blob/media/bionicText.jpg?raw=true)

Recently this example of text manipulation has been circulating on social media. Many people described how much it aided their reading but the process of producing it has been patented.

**Does this matter?**

The [social model of disability ↗](https://www.scope.org.uk/about-us/social-model-of-disability/) says "people are disabled by barriers in society, not by their impairment or difference." Mik Scarlet reflects this;

> I'm disabled by the world around me and if the world was more accessible, I would be less disabled and then I would just be left with my "impairment" i.e. what doesn't work.
>
> It's not that my legs don't work that disabling me. It's the fact that if I'm on a flat surface, I can wheel around fine, I'm wonderfully happy. It's only when I come up to a flight of stairs [...]

The [capability approach ↗](https://en.wikipedia.org/wiki/Capability_approach#Key_terms) is a method of evaluating human welfare. It focuses on a persons capacity to achieve their own well-being rather than their legal right to well-being.

From these two perspectives we see that Bionic Reading can increase a persons welfare in a world that is heavily mediated by text but that the patent creates a legal barrier. It will build the capacity of some while (comparatively) disabling others.

I offer you this simple alternative so you can build tools that empower rather than commodify people.

## How

```sh
**TODO**
npm i bubonic-parser
```

```js
import { parse } from "bubonic-parser";

let paragraph = document.querySelector("p");

paragraph.innerHTML = parse(paragraph.innerHTML);
```

The `parse` function takes a string as it's first argument and returns a string. You can optionally pass it a configuration object, the default looks like this.

```js
{
	// a tag name as a string
	tag: "b",
	// an array of classes as strings
	classList: [],
	// how much of the word to include inside the tag
	// 0 only the first letter
	// 0.5 half the word
	// 1 the whole word
	split: 0.5 }
```

So to use a `span` you would do this.

```js
import { parse } from "bubonic-parser";

let paragraph = document.querySelector("p");

paragraph.innerHTML = parse(paragraph.innerHTML, { tag: "span" });
```

To add a class or two to this span you could.

```js
import { parse } from "bubonic-parser";

let paragraph = document.querySelector("p");

paragraph.innerHTML = parse(paragraph.innerHTML, {
  tag: "span",
  classList: ["darken", "green"],
});
```

No copyright intended ~ Happy Hacking.
