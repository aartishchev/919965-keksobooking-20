'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');

  var activatePage = function () {
    mapBlock.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    window.pin.positionMapPins();
    window.form.activateForm();
    mainPin.addEventListener('mousedown', window.move.onMoveEvent);
    advertForm.addEventListener('submit', deactivatePage);
  };

  var deactivatePage = function () {
    mapBlock.classList.add('map--faded');
    advertForm.classList.add('ad-form--disabled');

    window.form.deactivateForm();
    advertForm.removeEventListener('submit', deactivatePage);
  };

  var onMainPinClick = function (evt) {
    window.util.onMousedownEvent(evt, activatePage);
  };

  var onMainPinEnter = function (evt) {
    window.util.onEnterEvent(evt, activatePage);
  };

  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinEnter);

  window.main = {
    onMainPinClick: onMainPinClick,
    onMainPinEnter: onMainPinEnter
  };

})();
