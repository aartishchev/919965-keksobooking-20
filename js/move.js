'use strict';

(function () {
  var mapBlock = document.querySelector('.map__pins');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var adressInput = document.querySelector('#address');

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

      adressInput.value = window.form.getMainPinCoordinatesByScale(1);

      if (mainPin.offsetTop - shift.y >= 0) {
        mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if (mainPin.offsetLeft < 0) {
        mainPin.style.left = 0;
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }



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
