'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var adressInput = advertForm.querySelector('#address');
  var typeSelect = advertForm.querySelector('#type');
  var timeInSelect = advertForm.querySelector('#timein');
  var timeOutSelect = advertForm.querySelector('#timeout');
  var roomsSelect = advertForm.querySelector('#room_number');
  var guestsSelect = advertForm.querySelector('#capacity');

  var setMainFormAvailability = function (isAvailable) {
    var advertFieldsets = advertForm.querySelectorAll('fieldset');
    for (var i = 0; i < advertFieldsets.length; i++) {
      advertFieldsets[i].disabled = !isAvailable;
    }
  };

  var getMainPinCoordinatesByScale = function (scale) {
    var mainPinWidth = mainPin.offsetWidth;
    var mainPinHeight = window.consts.PIN_HEIGHT;
    var coordinateX = parseInt(mainPin.style.left, 10);
    var coordinateY = parseInt(mainPin.style.top, 10);
    var valueX = Math.round(coordinateX + mainPinWidth / 2);
    var valueY = coordinateY + mainPinHeight * scale;
    return valueX + ', ' + valueY;
  };

  var setMinPrice = function () {
    var priceInput = advertForm.querySelector('#price');
    var currentTypeValue = typeSelect.value;
    var currentMinPrice = window.consts.MIN_PRICE_MAP[currentTypeValue];
    priceInput.setAttribute('placeholder', currentMinPrice);
    priceInput.setAttribute('min', currentMinPrice);
  };

  var setInTime = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  var setOutTime = function () {
    timeOutSelect.value = timeInSelect.value;
  };

  var addGuestsOptionsHandler = function () {
    var guests = guestsSelect.children;
    var currentRoomsOption = roomsSelect.value;
    var currentGuestOptions = window.consts.GUESTS_OPTIONS[currentRoomsOption];
    for (var k = 0; k < guests.length; k++) {
      guests[k].disabled = true;
    }
    for (var i = 0; i < currentGuestOptions.length; i++) {
      for (var j = 0; j < guests.length; j++) {
        if (currentGuestOptions[i] === guests[j].textContent) {
          guests[j].disabled = false;
        }
      }
    }
    addOptionValidation();
  };

  var addOptionValidation = function () {
    var currentSelectValue = guestsSelect.value;
    var currentOption = guestsSelect.querySelector('[value="' + currentSelectValue + '"]');
    if (currentOption.disabled) {
      guestsSelect.setCustomValidity('Эта опция не доступна. Пожалуйста, выберите другой вариант.');
    } else {
      guestsSelect.setCustomValidity('');
    }
  };

  var activateForm = function () {
    setMainFormAvailability(true);
    adressInput.value = getMainPinCoordinatesByScale(1);
    typeSelect.addEventListener('change', setMinPrice);
    timeInSelect.addEventListener('change', setOutTime);
    timeOutSelect.addEventListener('change', setInTime);
    roomsSelect.addEventListener('change', addGuestsOptionsHandler);
    guestsSelect.addEventListener('change', addOptionValidation);
  };

  var deactivateForm = function () {
    // setMainFormAvailability(false);
    adressInput.value = getMainPinCoordinatesByScale(0.5);
    typeSelect.removeEventListener('change', setMinPrice);
    timeInSelect.removeEventListener('change', setOutTime);
    timeOutSelect.removeEventListener('change', setInTime);
    roomsSelect.removeEventListener('change', addGuestsOptionsHandler);
    guestsSelect.removeEventListener('change', addOptionValidation);
  };

  adressInput.value = getMainPinCoordinatesByScale(0.5);
  setMainFormAvailability(false);
  addGuestsOptionsHandler();

  window.form = {
    activateForm: activateForm,
    deactivateForm: deactivateForm,
  };

})();
