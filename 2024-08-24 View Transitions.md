# Transforming Web Navigation with View Transitions




<style>
	.codeMaxHeight code {
		max-height: 100% !important;
	}
</style>

--

## What are view transitions

> [!quote]  View Transitions
> Transitions between different website views. 
> Includes single-page app (SPA) navigation
> Includes multi-page app (MPA) navigation. 


---
## Examples


- https://view-transitions.netlify.app/stack-navigator/mpa-prerender/<!-- element target="_blank" -->
- https://live-transitions.pages.dev/<!-- element target="_blank" -->
- https://charming-crumble-af45ba.netlify.app/<!-- element target="_blank" -->


---
## How does it work?


+ Same Document View Transitions
+ Cross Document View Transitions

---

### Cross Document View Transitions

```css data-noescape
@view-transition {
  navigation: auto;
}
```
<!-- element class="fragment" -->
[Demo](http://localhost:8080/1-0-simple-view-transition/page1.html)<!-- element class="fragment" target="_blank" -->

note: 
1.0. simple view transition

--

### Transitioning Between Elements

```css [1-3|5-7]
@view-transition {
  navigation: auto;
}

#your-image {
  view-transition-name: img-transition;
}

```
<!-- element class="fragment" -->
[Demo](http://localhost:8080/1-1-element-transition/page1.html)<!-- element class="fragment" target="_blank" -->

note:
1.1. element transitions

AFTER DEMO -> difference between view transitions and standard css transitions

--

### Transitioning Between Elements With Javascript

```js [|1|2-3|3-7||1]
window.addEventListener('pageswap', async (e) => {
  const initialImg = document.querySelector(`#your-image`)
  initialImg.style.viewTransitionName = "img-transition"
  
  await e.viewTransition.finished

  initialImg.style.viewTransitionName = ""
})
```
<!-- element class="fragment" -->

--
### Transitioning Between Elements With Javascript
```js [1|2-3|3-7]
window.addEventListener('pagereveal', async (e) => {
  const nextImg = document.querySelector(`#your-image`)
  nextImg.style.viewTransitionName = "img-transition"
  
  await e.viewTransition.finished

  nextImg.style.viewTransitionName = ""
})
```

--

```js
// Old Page
window.addEventListener('pageswap', async (e) => {
  const initialImg = document.querySelector(`#your-image`)
  initialImg.style.viewTransitionName = "img-transition"
  
  await e.viewTransition.finished

  initialImg.style.viewTransitionName = ""
})

// New Page
window.addEventListener('pagereveal', async (e) => {
  const nextImg = document.querySelector(`#your-image`)
  nextImg.style.viewTransitionName = "img-transition"
  
  await e.viewTransition.finished

  nextImg.style.viewTransitionName = ""
})
``` 
<!-- element class="codeMaxHeight" -->

[Demo](http://localhost:8080/1-2-element-transition-with-js/page1.html)<!-- element class="fragment" target="_blank" -->

note:
1.2. element transitions with JS

--
### Custom Transitions 

https://view-transitions.netlify.app/pagination/spa-types/<!-- element target="_blank" -->



--

### Custom Transitions

```css
::view-transition-old(*) {
    animation-name: CUSTOM-OUT-ANIMATION;
}

::view-transition-new(*) {
    animation-name: CUSTOM-IN-ANIMATION;
}
```

note: 
- next page -> view-transition-name example

--
### Custom Transitions

```css
::view-transition-old(content-transition) {
    animation-name: CUSTOM-OUT-ANIMATION;
}

::view-transition-new(content-transition) {
    animation-name: CUSTOM-IN-ANIMATION;
}
```

--

```css
@keyframes CUSTOM-OUT-ANIMATION {
  to {
    translate: -100vw 0;
  }
}

@keyframes CUSTOM-IN-ANIMATION {
  from {
    translate: 100vw 0;
  }
}
```

[Demo](http://localhost:8080/2-custom-page-transition/page1.html)<!-- element class="fragment" target="_blank" -->

note:
2. custom page transition

---

### Putting it all together

---

<video controls autoplay muted loop width="100%">
  <source src="Presentations/View Transitions/resources/airbnb-transitions.mp4" type="video/mp4" />
</video>

---

## Same Document View Transitions

```js [1,8-11|2-6|]
function spaNavigate(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow(data);
    return;
  }

  document.startViewTransition(() => {
    updateTheDOMSomehow(data)
  });
}
```
<!-- element class="fragment" -->

note: 
- startViewTransition
	- takes a snapshot of the page
	- once snapshoted, runs `updateTheDOMSomehow`
- fallback
	- same update handling
	- progressive enhancement

--

<video controls autoplay muted loop width="100%">
  <source src="Presentations/View Transitions/resources/thumbnail-to-video-transition.mp4" type="video/mp4" />
</video>

--

```js [1-2|3|4-5|7|]
  // Do some setup before snapshot
  thumbnail.style.viewTransitionName = 'full-embed';
  document.startViewTransition(() => {
    // cleanup previous page incase we go back to it
    thumbnail.style.viewTransitionName = '';
    
    updateTheDOMSomehow(data)

    // Do the transition
  });
}
```

[React Demo](http://localhost:8080/3-two-react-apps/page1.html)<!-- element class="fragment" target="_blank" -->

note:
	1. OKAY TO SHOW THE CODE!
	2. show off how client side view transitions work in a react app
	3. BONUS: show how it also works alongside page transitions

---
## Astro's View Transitions

1. Single Page View Transitions if they're supported (even in Multi Page Apps)<!-- element class="fragment" -->
2. Fallback behaviour in browsers where view transitions aren't supported (none, swap, animate) <!-- element class="fragment" -->
3. Persisting elements and state <!-- element class="fragment" -->
4. Direction (forward and backward) <!-- element class="fragment" -->
5. Support for prefers-reduced-motion <!-- element class="fragment" -->
6. Prefetching (hover, tap, viewport, load)<!-- element class="fragment" -->

notes:
- Big reason for complexity is browser support

--

### Considerations

+ persistant elements
	+ Which scripts should and shouldn't be re-run
	+ Which stylesheets should be kept and removed
	+ which visible elements should stick around between transitions
	+ styling clashes between old and new page when using fallback animation 

--
+ order of script loads
+ global state
+ scroll position
+ prefetching links
+ routing (which links do you need to intercept?)
+ Cleanup and memory leaks
+ Keeping React state on unmounted components
+ Multiple React Renders
+ ... A bunch more I've missed 

If you're still interested in learning more, check out<!-- element class="fragment" --> [Astro's Source Code](https://github.com/withastro/astro/blob/main/packages/astro/components/ViewTransitions.astro) 

--

---
### Fallback Implementation

[Demo](http://localhost:8080/4-0-using-client-side-transitions-today/page1.html)<!-- element class="fragment" target="_blank" -->

note:
- OPEN CHALKBOARD HERE
- then demo
- if time permits, slide

---
### A Real World Demo

--

Setup the page

```html
<div id="spa-root">
  <div id="header-root" />

  <div id="navigation-root" style="display: grid; ...">
  <!-- Apps dynamically loaded here 
       when we navigate to them -->
    ... <div id="dashboard-root" />
    ... <div id="usage-root" />
    ... <div id="payment-settings-root" />
  </div>

  <div id="footer-root" />
</div>
```

--

```js
navigation.addEventListener("navigate", (event) => {
  event.intercept({
    handler: () => transitionPage(event.destination.url)
  });
})
```

--

```js
const transitionPage = (url) => {
  // 1. fetch the html at the url
  // 2. Use the DOMParser Browser API to parse the new document
  
  // 3. get script tags (newDoc.querySelectorAll())
  // 4. insert <link rel="preload" ... /> tags for each script
  // 5. add each script in order

  // 6. render react component into offscreen grid area
  // 7. transition and set pointer-events
}
```

--

<video controls autoplay muted loop width="100%">
  <source src="Presentations/View Transitions/resources/origin-transitions.mov" type="video/mp4" />
</video>

---

### Lessons Learned

+ CSS Clashes even with multiple React apps running at once were barely an issue
+ Apps depending on global objects
+ Unknowns about performance and UX
+ Keeping state when unmounting React Apps
+ Cleaning up leftoverstyles?
+ The Same App on Multiple Pages, or in app Client Side Routing 
+ View Transitions make all of this SO easy and give us so much more!

---






notes:

### References and Inspiration 

- Astro
- HtmX
- WordPress Fragments

- https://developer.chrome.com/docs/web-platform/view-transitions
- https://developer.chrome.com/blog/new-in-web-ui-io-2024
- https://view-transitions.netlify.app/profiles/mpa/bramus
- https://glitch.com/edit/#!/hickory-mangrove-dugong?path=mpa%2Fpage-2.html%3A1%3A0
- https://www.properteasy.com.au/
- https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate_event
- https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
- https://drafts.csswg.org/css-view-transitions/
- https://html.spec.whatwg.org/multipage/indices.html#events-2

---
