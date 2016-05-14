import easeInOutQuad from './easing'

export default defaults = ({

  // defaults
  offset = 0,
  easing = easeInOutQuad

}) => {

  // globals
  let start         // position where scroll starts
  let stop          // position where scroll stops

  let adjust        // adjustment from the stop position
  let timing        // equation dictating how to scroll from start to stop

  let duration      // time the scroll takes
  let distance      // distance, in px, the scroll covers

  let callback      // function to run when scroll is finished

  function loop() {

  }

  function end() {

  }

  function jump(target, options = {}) {
    // cache starting position
    start = window.scrollY || window.pageYOffset

    // resolve duration, the only required option
    // if its not a number, assume its a function
    duration = typeof options.duration === 'number'
      ? options.duration
      : options.duration(distance)

    // resolve offset
    adjust = options.offset || defaults.offset

    // resolve callback
    callback = options.callback

    // resolve easing
    timing = options.easing || defaults.easing

    // resolve target
    switch(typeof target) {
      // scroll from current position
      case 'number':
        stop = start + target
      break

      // scroll to element (node)
      case 'object':
        stop = target.getBoundingClientRect().top
      break

      // scroll to element (selector)
      case 'string':
        stop = document.querySelector(target).getBoundingClientRect().top
      break
    }
  }

  return {
    jump
  }
}

// export default class Jump {
//   jump(target, options = {}) {
//     // this.start = window.pageYOffset
//
//     this.options = {
//       duration: options.duration,
//       offset: options.offset || 0,
//       callback: options.callback,
//       easing: options.easing || easeInOutQuad
//     }
//
//     this.target = typeof target === 'string'
//       ? document.querySelector(target)
//       : target;
//
//     this.distance = typeof target === 'number'
//       ? target
//       : this.options.offset + target.getBoundingClientRect().top;
//
//     this.duration = typeof this.options.duration === 'function'
//       ? this.options.duration(this.distance)
//       : this.options.duration
//
//     requestAnimationFrame(time => this._loop(time))
//   }
//
//   _loop(time) {
//     if(!this.timeStart) {
//       this.timeStart = time
//     }
//
//     this.timeElapsed = time - this.timeStart
//     this.next = this.options.easing(this.timeElapsed, this.start, this.distance, this.duration)
//
//     window.scrollTo(0, this.next)
//
//     this.timeElapsed < this.duration
//       ? requestAnimationFrame(time => this._loop(time))
//       : this._end()
//   }
//
//   _end() {
//     window.scrollTo(0, this.start + this.distance)
//
//     typeof this.options.callback === 'function' && this.options.callback()
//     this.timeStart = false
//   }
// }
