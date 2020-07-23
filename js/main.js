'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var advertPinsList = document.querySelector('.map__pins');

  var activatePage = function () {
    mapBlock.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    window.pin.positionAdvertPins();

    window.form.activateForm();
  };

  var deactivatePage = function () {
    mapBlock.classList.add('map--faded');
    advertForm.classList.add('ad-form--disabled');
    window.pin.removeAdverts();
    window.card.removeCard();

    window.form.deactivateForm();

    window.move.checkMainPinPosition();
    window.filter.deactivateFilter();
    advertPinsList.removeEventListener('click', window.pin.onAdvertClick);
    mainPin.addEventListener('mousedown', onMainPinClick);
    mainPin.addEventListener('keydown', onMainPinEnter);
  };

  var onMainPinClick = function (evt) {
    window.util.onMousedownEvent(evt, activatePage);
  };

  // var onMainPinMove = function (evt) {
  //   window.util.onMousedownEvent(evt, window.move.onMoveEvent(evt));
  // };

  var onMainPinEnter = function (evt) {
    window.util.onEnterEvent(evt, activatePage);
  };

  mainPin.addEventListener('mousedown', window.move.onMoveEvent);
  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinEnter);

  window.main = {
    onMainPinClick: onMainPinClick,
    onMainPinEnter: onMainPinEnter,
    deactivatePage: deactivatePage
  };

})();
