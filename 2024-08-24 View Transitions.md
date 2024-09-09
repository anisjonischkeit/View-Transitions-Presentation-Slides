---
theme: simple
---
# Transforming Web Navigation with View Transitions


<link rel="stylesheet" href="//unpkg.com/@catppuccin/highlightjs@0.2.2/css/catppuccin-mocha.css">

<!--<style>
	code {
		max-height: 100% !important;
	}
</style>-->

## What are view transitions

---

> [!quote]  View Transitions - MDN 
> The **View Transitions API** provides a mechanism for easily creating animated transitions between different website views. This includes animating between DOM states in a single-page app (SPA), and animating the navigation between documents in a multi-page app (MPA). 




---
## Examples

---

https://live-transitions.pages.dev/<!-- element target="_blank" -->

https://view-transitions.netlify.app/stack-navigator/mpa-prerender/<!-- element target="_blank" -->

---
## How does it work?

--

```css data-noescape
@view-transition {
  navigation: auto;
}
```

--

### Demo

note: 
1.0. simple view transition

--

--
## Transitioning Between Elements

TODO

--

### Demo

note:
1.1. element transitions

--

## Transitioning Between Elements With Javascript

TODO

--

### Demo

note:
1.2. element transitions with JS

--

```js [|1|2-3|3-7||1]
window.addEventListener('pageswap', async (e) => {
  const initialImg = document.querySelector(`#detail main h1`)
  initialImg.style.viewTransitionName = "img-transition"
  
  await e.viewTransition.finished

  initialImg.style.viewTransitionName = ""
})
```

--

```js [1|2-3|3-7] 
window.addEventListener('pagereveal', async (e) => {
  const nextImg = document.querySelector(`#detail main h1`)
  nextImg.style.viewTransitionName = "img-transition"
  
  await e.viewTransition.finished

  nextImg.style.viewTransitionName = ""
})
```

--
## Custom Transitions 

--

## Demo

note:
2. custom page transition

---

## Client Side View Transitions

--

### Demo

note:
	1. show off how client side view transitions work in a react app
	2. BONUS: show how it also works alongside page transitions



---

## Demo

---

n




























## When can I have it?

note: 

My issue with talks sometimes
- learn about something really cool
- can't use it at work

---

## Compatibility

### Single Page View Transitions
![[Screenshot 2024-09-01 at 12.10.16 PM.png]]

![[Screenshot 2024-09-01 at 12.10.35 PM.png]]
### Multipage View Transitions


---
## Can we already do this today?
---
## A simple client side transition
---
## Transitioning two Doms
---
## Running JavaScript
---
  - ordering
  - one time JavaScript
  - DomParser
---
### Extras:
Prefetching
Hijacking links
Hijacking navigation 
Optimisations ()

---
Gotchas
Cleanup/memory
Global state/JS clashes
Style clashes
- shadowdom
- prefixing
- newer React style libraries seem to just handle it...
Scroll position
Keeping React state on unmounted components
Multiple React Renders

---

## Differences to Standard Transitions
- single transitions are easy, multiple transitions much harder

---
## Progressive Enhancement

note:

The nice thing with these features is that it works really nicely with progressive enhancement. You can just enable these transitions now, and ass browsers gain support, your users will get these features.

And then you can still choose if you need these features today, to implement some of these today, and rely on progressive enhancement for anything that's too difficult with the featureset of today


---
Things to consider when writing the talk
Where can I fit in a quiz
- script loading order
- script execution order
- blocking in the head 
- styling order
- react performance difference (items in Dom vs in memory)
- multiple tabs vs same tab with multiple apps memory usage
- react dom render time
- times in terms of milliseconds as well as how many animation frames they will block
---

References and Inspiration 
Astro
HtmX
WordPress Fragments

https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
https://view-transitions.netlify.app/profiles/mpa/bramus
https://glitch.com/edit/#!/hickory-mangrove-dugong?path=mpa%2Fpage-2.html%3A1%3A0
https://www.properteasy.com.au/

---
