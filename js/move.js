'use strict';

(function () {
  var mapBlock = document.querySelector('.map__pins');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');

  var minPinY = window.consts.PIN_MIN_Y - window.consts.PIN_HEIGHT;
  var maxPinY = window.consts.PIN_MAX_Y - window.consts.PIN_HEIGHT;
  var minPinX = 0 - Math.round(window.consts.PIN_WIDTH * 0.5);
  var maxPinX = mapBlock.offsetWidth - Math.round(window.consts.PIN_WIDTH * 0.5);

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

      if (mainPin.offsetTop - shift.y >= minPinY && mainPin.offsetTop - shift.y <= maxPinY) {
        mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
      }

      if (mainPin.offsetLeft - shift.x >= minPinX && mainPin.offsetLeft - shift.x <= maxPinX) {
        mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
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

  window.move = {
    onMoveEvent: onMoveEvent
  };

})();
