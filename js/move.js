'use strict';

(function () {
  var mapBlock = document.querySelector('.map__pins');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');

  var defaultMainPinPosition = {
    top: mainPin.style.top,
    left: mainPin.style.left
  };

  var getMaxWidth = function () {
    return mapBlock.offsetWidth - Math.round(window.consts.PIN_WIDTH * 0.5);
  };

  var borders = {
    minHeight: window.consts.PIN_MIN_Y - window.consts.PIN_HEIGHT,
    maxHeight: window.consts.PIN_MAX_Y - window.consts.PIN_HEIGHT,
    minWidth: 0 - Math.round(window.consts.PIN_WIDTH * 0.5),
    maxWidth: getMaxWidth()
  };

  var setBordersMaxWidth = function () {
    borders.maxWidth = getMaxWidth();
  };

  window.addEventListener('resize', window.util.debounce(setBordersMaxWidth));

  var onMoveEvent = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoordinate = {
        y: mainPin.offsetTop - shift.y,
        x: mainPin.offsetLeft - shift.x
      };

      if (newCoordinate.y >= borders.minHeight && newCoordinate.y <= borders.maxHeight) {
        mainPin.style.top = newCoordinate.y + 'px';
      }

      if (newCoordinate.x >= borders.minWidth && newCoordinate.x <= borders.maxWidth) {
        mainPin.style.left = newCoordinate.x + 'px';
      }

      adressInput.value = window.form.getMainPinCoordinatesByScale(1);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var checkMainPinPosition = function () {
    if (defaultMainPinPosition.top === mainPin.style.top && defaultMainPinPosition.left === mainPin.style.left) {
      return;

    } else {
      mainPin.style.top = defaultMainPinPosition.top;
      mainPin.style.left = defaultMainPinPosition.left;
    }
  };

  window.move = {
    onMoveEvent: onMoveEvent,
    checkMainPinPosition: checkMainPinPosition
  };

})();
