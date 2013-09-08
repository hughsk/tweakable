# tweakable [![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Streamable UI elements for adjusting metrics when debugging
interactives/visualisations/etc. A very light, malleable alternative to
[dat.gui](http://workshop.chromeexperiments.com/examples/gui), which is pretty
great but a little tricky when handling some setups.

Not much to see here yet though!

[![tweakable](https://nodei.co/npm/tweakable.png?mini=true)](https://nodei.co/npm/tweakable)

## Usage ##

Each "metric" is wrapped up in a node.js
[through stream](http://github.com/dominictarr/through), in that it can both be
written to and read from. They each take a parent element, and any remaining
arguments are up to you.

### `createStream = require('tweakable')(params...)` ###

Returns a tweakable stream constructor. Takes the following arguments, listed
in order:

* `init(parent)` should create the element, attach it to the DOM and listen to
  any required events. It should also return the newly created element.
* `update(value)` should update the tweakable's DOM representation to reflect a
  new value. This is called whenever the stream is written to, so that you can update metrics either through the UI or programatically.
* `remove()` should handle removing the element from the DOM.
* `equal(a, b)` should return whether two incoming values are equal. This is
  used to handle the `changed` event.

All are called from the context of the stream, and all are optional - the
default values for these functions will create a text input element.

### `stream = createStream(parent)` ###

Creates a tweakable stream that should be a child of the `parent` element.

### `stream.queue(value)` ###

Updates the stream's current value. Any events triggered through the UI should
use this to update data.

### `stream.on('data', handler(value))` ###

Emitted every time the value is updated, regardless of its value.

### `stream.on('change', handler(value))` ###

Emitted every time the value is changed.

### `stream.value` ###

The most recently set value passed to the tweakable stream or element.
