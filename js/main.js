'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
  var advertForm = document.querySelector('.ad-form');
  var adressInput = advertForm.querySelector('#address');
  var typeSelect = advertForm.querySelector('#type');
  var timeInSelect = advertForm.querySelector('#timein');
  var timeOutSelect = advertForm.querySelector('#timeout');
  var roomsSelect = advertForm.querySelector('#room_number');
  var guestsSelect = advertForm.querySelector('#capacity');

  var activatePage = function () {
    mapBlock.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    adressInput.value = window.form.getMainPinCoordinatesByScale(1);
    mapPinsList.appendChild(window.pin.renderAdvertsFragment(window.pin.adverts));
    window.form.setFormInputsAvailability(true);
    typeSelect.addEventListener('change', window.form.setMinPrice);
    advertForm.addEventListener('submit', deactivatePage);
    timeInSelect.addEventListener('change', window.form.setOutTime);
    timeOutSelect.addEventListener('change', window.form.setInTime);
    roomsSelect.addEventListener('change', window.form.addGuestsOptionsHandler);
    guestsSelect.addEventListener('change', window.form.addOptionValidation);
  };

  var deactivatePage = function () {
    mapBlock.classList.add('map--faded');
    advertForm.classList.add('ad-form--disabled');
    adressInput.value = window.form.getMainPinCoordinatesByScale(0.5);
    window.form.setFormInputsAvailability(false);
    typeSelect.removeEventListener('change', window.form.setMinPrice);
    advertForm.removeEventListener('submit', deactivatePage);
    timeInSelect.removeEventListener('change', window.form.setOutTime);
    timeOutSelect.removeEventListener('change', window.form.setInTime);
    roomsSelect.removeEventListener('change', window.form.addGuestsOptionsHandler);
    guestsSelect.removeEventListener('change', window.form.addOptionValidation);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    window.util.onMousedownEvent(evt, activatePage);
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.onEnterEvent(evt, activatePage);
  });

})();
