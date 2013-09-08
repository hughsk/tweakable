var through = require('through')

module.exports = tweakable

function tweakable(create, update, remove, equal) {
  create = create || _create
  update = update || _update
  remove = remove || _remove
  equal = equal || _equal

  return function createStream(parent) {
    var stream = through(write, end)
    var el = create.call(stream, parent)
    var value = null

    stream.el = el
    stream.value = value
    stream.on('data', function(d) {
      var eq = equal(d, value)
      stream.value = value = d
      if (!eq) stream.emit('changed', d)
    })

    return stream

    function write(d) {
      update.call(stream, d)
      stream.queue(d)
    }

    function end() {
      remove.call(stream)
      stream.queue(null)
    }
  }
}

function _equal(a, b) {
  return a === b
}

function _create(parent) {
  var input = document.createElement('input')
  var stream = this
  parent.appendChild(input)

  ;['change'
  , 'keyup'
  ].map(function(name) {
    input.addEventListener(name, function(e) {
      stream.queue(input.value)
    })
  })

  return input
}

function _update(data) {
  this.el.value = data
}

function _remove() {
  var el = this.el
  if (el.parentNode) el.parentNode.removeChild(el)
}
