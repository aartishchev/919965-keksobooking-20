'use strict';

(function () {
  var positionAdvertPins = function () {
    window.pin.positionAdvertPins();
  };
  var activateForm = function () {
    window.form.activateForm();
  };
  var removeAdverts = function () {
    window.pin.removeAdverts();
  };
  var removeCard = function () {
    window.card.removeCard();
  };
  var deactivateForm = function () {
    window.form.deactivateForm();
  };
  var checkMainPinPosition = function () {
    window.move.checkMainPinPosition();
  };
  var deactivateFilter = function () {
    window.filter.deactivateFilter();
  };

  var onAdvertClick = window.pin.onAdvertClick;


  var mapBlock = document.querySelector('.map');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var advertPinsList = document.querySelector('.map__pins');

  var activatePage = function () {
    mapBlock.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    positionAdvertPins();

    activateForm();
  };

  var deactivatePage = function () {
    mapBlock.classList.add('map--faded');
    advertForm.classList.add('ad-form--disabled');
    removeAdverts();
    removeCard();

    deactivateForm();

    checkMainPinPosition();
    deactivateFilter();
    advertPinsList.removeEventListener('click', onAdvertClick);
    mainPin.addEventListener('mousedown', onMainPinClick);
    mainPin.addEventListener('keydown', onMainPinEnter);
  };

  var onMainPinClick = function (evt) {
    window.util.onMousedownEvent(evt, activatePage);
  };

  var onMainPinMove = function (evt) {
    window.util.onMousedownEvent(evt, window.move.onMoveEvent(evt));
  };

  var onMainPinEnter = function (evt) {
    window.util.onEnterEvent(evt, activatePage);
  };

  mainPin.addEventListener('mousedown', onMainPinMove);
  mainPin.addEventListener('mousedown', onMainPinClick);
  mainPin.addEventListener('keydown', onMainPinEnter);

  window.main = {
    onMainPinClick: onMainPinClick,
    onMainPinEnter: onMainPinEnter,
    deactivatePage: deactivatePage
  };

})();
