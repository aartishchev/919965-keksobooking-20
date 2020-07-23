'use strict';

(function () {
  var positionAdvertPins = window.pin.positionAdvertPins;
  var activateForm = window.form.activateForm;
  var removeAdverts = window.pin.removeAdverts;
  var removeCard = window.card.removeCard;
  var deactivateForm = window.form.deactivateForm;
  var checkMainPinPosition = window.move.checkMainPinPosition;
  var deactivateFilter = window.filter.deactivateFilter;
  var onAdvertClick = window.pin.onAdvertClick;
  var onMousedownEvent = window.util.onMousedownEvent;
  var onMoveEvent = window.move.onMoveEvent;
  var onEnterEvent = window.util.onEnterEvent;

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
    onMousedownEvent(evt, activatePage);
  };

  var onMainPinMove = function (evt) {
    onMousedownEvent(evt, function () {
      onMoveEvent(evt);
    });
  };

  var onMainPinEnter = function (evt) {
    onEnterEvent(evt, activatePage);
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
