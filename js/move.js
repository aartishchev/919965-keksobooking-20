'use strict';

(function () {
  var PinMaxY = window.const.PIN.MAX_Y;
  var PinMinY = window.const.PIN.MIN_Y;
  var pinHeight = window.const.PIN.HEIGHT;
  var pinWidth = window.const.PIN.WIDTH;
  var debounce = window.util.debounce;
  var getMainPinCoordinatesByScale = window.form.getMainPinCoordinatesByScale;

  var mapBlock = document.querySelector('.map__pins');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');

  var defaultMainPinPosition = {
    top: mainPin.style.top,
    left: mainPin.style.left
  };

  var getMaxWidth = function () {
    return mapBlock.offsetWidth - Math.round(pinWidth * 0.5);
  };

  var borders = {
    minHeight: PinMinY - pinHeight,
    maxHeight: PinMaxY - pinHeight,
    minWidth: 0 - Math.round(pinWidth * 0.5),
    maxWidth: getMaxWidth()
  };

  var setBordersMaxWidth = function () {
    borders.maxWidth = getMaxWidth();
  };

  window.addEventListener('resize', debounce(setBordersMaxWidth));

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

      adressInput.value = getMainPinCoordinatesByScale(1);
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
