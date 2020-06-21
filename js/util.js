'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArrayElement = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };

  var getRandomSlicedArray = function (array) {
    return array.slice(0, getRandomInteger(0, array.length));
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

  var onEnterEvent = function (evt, action) {
    if (evt.key === 'Enter') {
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
    getRandomArrayElement: getRandomArrayElement,
    getRandomSlicedArray: getRandomSlicedArray,
    shuffleArray: shuffleArray,
    onEnterEvent: onEnterEvent,
    onMousedownEvent: onMousedownEvent
  };

})();
