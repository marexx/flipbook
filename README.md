flipbook
========

Flipbook animation
-----------------
Displays a set of images, one after an other, to simulate a movie. Of course wihtout sound. 

Checkout [the demo page](http://kunden.marexx.net/flipbook/),

* Autostart on every device, also on Ipad/Mobile
* reloop
* replace existing video
* 25 Frames/sec

Usage:
------
```javascript
$('.flipbook').flipbook({
  images: 20,  					        /* Number of Images available, they have to be continuously numbered, starting with 0 */
  loader: false,					      /* Should there be a loader */
  width: this.attr('width'),		/* Width of the container, if different than the .flipbook container */
  height: this.attr('height'),	/* Height of the container, if different than the .flipbook container */
  replaceVideoID: ''				    /* If ID of an Element is set, this Element will be hidden, when flipbook is loaded */
});
````

Element with the class "flipbook" must have the attribute "data-source" with the value like: "yourFirstImage_0.jpg" the "0." is mandatory
```html
<div class="flipbook" data-source="image_0.jpg" width="680" height="720"></div>
```

If "loader = true" the "heartcode canvasloader" is displayed.

Problems:
--------
Slows down the browser if used more than one time on one page, but for short animation it's possible.
Tested succesfully with up do 300 images
