'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var advertForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var adressInput = advertForm.querySelector('#address');
  var typeSelect = advertForm.querySelector('#type');
  var timeInSelect = advertForm.querySelector('#timein');
  var timeOutSelect = advertForm.querySelector('#timeout');
  var roomsSelect = advertForm.querySelector('#room_number');
  var guestsSelect = advertForm.querySelector('#capacity');

  var setFormInputsAvailability = function (isAvailable) {
    var advertFieldsets = advertForm.querySelectorAll('fieldset');
    var filterInputs = filtersForm.children;
    for (var i = 0; i < advertFieldsets.length; i++) {
      advertFieldsets[i].disabled = !isAvailable;
    }
    for (var j = 0; j < filterInputs.length; j++) {
      filterInputs[j].disabled = !isAvailable;
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

  adressInput.value = getMainPinCoordinatesByScale(0.5);
  setFormInputsAvailability(false);
  addGuestsOptionsHandler();

  window.form = {
    setMinPrice: setMinPrice,
    setInTime: setInTime,
    setOutTime: setOutTime,
    getMainPinCoordinatesByScale: getMainPinCoordinatesByScale,
    setFormInputsAvailability: setFormInputsAvailability,
    addGuestsOptionsHandler: addGuestsOptionsHandler,
    addOptionValidation: addOptionValidation
  };

})();
