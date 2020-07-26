'use strict';

(function () {
  var mainPinWidth = window.const.PIN.WIDTH;
  var mainPinHeight = window.const.PIN.HEIGHT;
  var minPriceMap = window.const.MIN_PRICE_MAP;
  var guestsOptions = window.const.GUESTS_OPTIONS;
  var onEscEvent = window.util.onEscEvent;
  var save = window.backend.save;
  var addPreview = window.preview.add;
  var removePreview = window.preview.remove;

  var mapBlock = document.querySelector('.map');
  var mainPin = mapBlock.querySelector('.map__pin--main');

  var advertForm = document.querySelector('.ad-form');
  var advertFieldsets = advertForm.querySelectorAll('fieldset');
  var adressInput = advertForm.querySelector('#address');
  var typeSelect = advertForm.querySelector('#type');
  var priceInput = advertForm.querySelector('#price');
  var timeInSelect = advertForm.querySelector('#timein');
  var timeOutSelect = advertForm.querySelector('#timeout');
  var roomsSelect = advertForm.querySelector('#room_number');
  var guestsSelect = advertForm.querySelector('#capacity');

  var setMainFormAvailability = function (isAvailable) {

    advertFieldsets.forEach(function (element) {
      element.disabled = !isAvailable;
    });

  };

  var getMainPinCoordinatesByScale = function (scale) {
    var coordinateX = parseInt(mainPin.style.left, 10);
    var coordinateY = parseInt(mainPin.style.top, 10);
    var valueX = Math.round(coordinateX + mainPinWidth / 2);
    var valueY = coordinateY + mainPinHeight * scale;

    return valueX + ', ' + valueY;
  };

  var setMinPrice = function () {
    var currentTypeValue = typeSelect.value;
    var currentMinPrice = minPriceMap[currentTypeValue];

    priceInput.placeholder = currentMinPrice;
    priceInput.min = currentMinPrice;
  };

  var setInTime = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  var setOutTime = function () {
    timeOutSelect.value = timeInSelect.value;
  };

  var addGuestsOptionsHandler = function () {
    var guests = guestsSelect.querySelectorAll('option');
    var currentRoomsOption = roomsSelect.value;
    var currentGuestOptions = guestsOptions[currentRoomsOption];

    guests.forEach(function (option) {
      option.disabled = true;
    });

    currentGuestOptions.forEach(function (option) {

      for (var i = 0; i < guests.length; i++) {
        if (option === guests[i].textContent) {
          guests[i].disabled = false;
          break;
        }
      }

    });

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

  var mainBlock = document.querySelector('main');
  var similarSuccessMessage = document.querySelector('#success').content.querySelector('.success');

  var renderSuccessMessage = function () {
    mainBlock.appendChild(similarSuccessMessage);
  };

  var onSuccessMessageEscape = function (evt) {
    onEscEvent(evt, removeSuccessMessage);
  };

  var removeSuccessMessage = function () {
    var successBlock = mainBlock.querySelector('.success');
    successBlock.remove();

    document.removeEventListener('click', removeSuccessMessage);
    document.removeEventListener('keydown', onSuccessMessageEscape);
  };

  var onSave = function () {
    window.main.deactivatePage();
    deactivateForm();
    renderSuccessMessage();

    document.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', onSuccessMessageEscape);
  };

  var similarErrorMessage = document.querySelector('#error').content.querySelector('.error');

  var renderErrorMessage = function () {
    mainBlock.appendChild(similarErrorMessage);
  };

  var onErrorMessageEscape = function (evt) {
    onEscEvent(evt, removeErrorMessage);
  };

  var removeErrorMessage = function () {
    var errorBlock = mainBlock.querySelector('.error');
    errorBlock.remove();

    document.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', onErrorMessageEscape);
  };

  var onError = function () {
    renderErrorMessage();

    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', onErrorMessageEscape);
  };

  var onSubmitEvent = function (evt) {
    save(onSave, onError, new FormData(advertForm));
    evt.preventDefault();
  };

  var onResetEvent = function () {
    window.main.deactivatePage();

    var currentMinPrice = minPriceMap['flat'];
    priceInput.placeholder = currentMinPrice;
  };

  var activateForm = function () {
    setMainFormAvailability(true);
    addPreview();
    adressInput.value = getMainPinCoordinatesByScale(1);

    typeSelect.addEventListener('change', setMinPrice);
    timeInSelect.addEventListener('change', setOutTime);
    timeOutSelect.addEventListener('change', setInTime);
    roomsSelect.addEventListener('change', addGuestsOptionsHandler);
    guestsSelect.addEventListener('change', addOptionValidation);
    advertForm.addEventListener('reset', onResetEvent);
    advertForm.addEventListener('submit', onSubmitEvent);
  };

  var deactivateForm = function () {
    setMainFormAvailability(false);
    removePreview();
    adressInput.value = getMainPinCoordinatesByScale(0.5);

    typeSelect.removeEventListener('change', setMinPrice);
    timeInSelect.removeEventListener('change', setOutTime);
    timeOutSelect.removeEventListener('change', setInTime);
    roomsSelect.removeEventListener('change', addGuestsOptionsHandler);
    guestsSelect.removeEventListener('change', addOptionValidation);
    advertForm.removeEventListener('reset', onResetEvent);
    advertForm.removeEventListener('submit', onSubmitEvent);

    advertForm.reset();
  };

  adressInput.value = getMainPinCoordinatesByScale(0.5);
  setMainFormAvailability(false);
  addGuestsOptionsHandler();

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    getMainPinCoordinatesByScale: getMainPinCoordinatesByScale
  };

})();
