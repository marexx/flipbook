flipbook
========

Flipbook animation
-----------------
Displays a set of images, one after an other, to simulate a movie. Of course wihtout sound. 
This makes it possible to Autostart it on every device, also on Ipad/Mobile


Possible Settings:
-----------------
  images: 20,  					        /* Number of Images available, they have to be continuously numbered, starting with 0 */
  loader: false,					      /* Should there be a loader */
  width: this.attr('width'),		/* Width of the container, if different than the .flipbook container */
  height: this.attr('height'),	/* Height of the container, if different than the .flipbook container */
  replaceVideoID: ''				    /* If ID of an Element is set, this Element will be hidden, when flipbook is loaded */
