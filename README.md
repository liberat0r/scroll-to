Scroll To
=========

JQuery plugin used to scroll (vertically) to specific elements during different events.

__Attributes__
- [data-scroll-to-this] add this attribute to the element that will be scrolled to
  - [data-scroll-to-this="onload"] scrolls to this element when the page is loaded
  - [data-scroll-to-this="onclick"] scrolls to this element when the element set with the attribute [data-scroll-to-this-target] is clicked
  - [data-scroll-to-this="onhash"] scroll to this element when a the hash set in the attribute [data-scroll-to-this-hash] is the window.location.hash
- [data-scroll-to-offset] set an offset to the scrolling in pixels

__Examples__

On page load
```
<div data-scroll-to-this="onload" data-scroll-to-offset="100">
  This div will be scrolled to when the page loads
  It also has an offset of 100px
</div>
```

When the hash #test-div is requested
```
<div data-scroll-to-this="onhash" data-scroll-to-this-hash="test-div">
  This div will be scrolled to if #test-div is the window.location.hash
</div>
```

On click of an other element
```
<div data-scroll-to-this="onclick" data-scroll-to-this-target=".test-button">
  This div will be scrolled to when .test-button is clicked
</div>

<button class="test-button" type="button">Click to scroll</button>
```
