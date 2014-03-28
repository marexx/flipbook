flipbook
========

Flipbook animation
-----------------
Displays a set of images, one after an other, to simulate a movie. Of course wihtout sound. 
This makes it possible to Autostart it on every device, also on Ipad/Mobile
*...Autostart on every device
*...reloop
*...replace existing video

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

If "laoder = true" the "heartcode canvasloader" is displayed.

