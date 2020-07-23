'use strict';

(function () {
  var debounceInterval = window.const.DEBOUNCE_INTERVAL;

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var shuffleArray = function (array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
      randomIndex = getRandomInteger(0, array.length - 1);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, debounceInterval);
    };
  };

  var onEnterEvent = function (evt, action) {
    if (evt.key === 'Enter') {
      action();
    }
  };

  var onEscEvent = function (evt, action) {
    if (evt.key === 'Escape') {
      action();
    }
  };

  var onMousedownEvent = function (evt, action) {
    if (evt.button === 0) {
      action();
    }
  };

  window.util = {
    getRandomInteger: getRandomInteger,
    shuffleArray: shuffleArray,
    debounce: debounce,
    onEnterEvent: onEnterEvent,
    onEscEvent: onEscEvent,
    onMousedownEvent: onMousedownEvent,
  };

})();
