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

    advertFieldsets.forEach(function (element) {
      element.disabled = !isAvailable;
    });

  };

  var getMainPinCoordinatesByScale = function (scale) {
    var mainPinWidth = window.const.PIN_WIDTH;
    var mainPinHeight = window.const.PIN_HEIGHT;
    var coordinateX = parseInt(mainPin.style.left, 10);
    var coordinateY = parseInt(mainPin.style.top, 10);
    var valueX = Math.round(coordinateX + mainPinWidth / 2);
    var valueY = coordinateY + mainPinHeight * scale;

    return valueX + ', ' + valueY;
  };

  var setMinPrice = function () {
    var priceInput = advertForm.querySelector('#price');
    var currentTypeValue = typeSelect.value;
    var currentMinPrice = window.const.MIN_PRICE_MAP[currentTypeValue];

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
    var guests = guestsSelect.children;
    var currentRoomsOption = roomsSelect.value;
    var currentGuestOptions = window.const.GUESTS_OPTIONS[currentRoomsOption];

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

  var mainBlock = document.querySelector('main');
  var similarSuccessMessage = document.querySelector('#success').content.querySelector('.success');

  // отрисовываем сообщение об успешной отправке
  var renderSuccessMessage = function () {
    mainBlock.appendChild(similarSuccessMessage);
  };

  // сохраняем ссылку на функцию для обработчика
  var onSuccessMessageEscape = function (evt) {
    window.util.onEscEvent(evt, removeSuccessMessage);
  };

  // удаляем сообщение об успешной отправке, удаляем обработчики
  var removeSuccessMessage = function () {
    var successBlock = mainBlock.querySelector('.success');
    successBlock.remove();

    document.removeEventListener('click', removeSuccessMessage);
    document.removeEventListener('keydown', onSuccessMessageEscape);
  };

  // колбэк при успешной отправке объявления, добавляем обработчики на закрытие сообщения
  var onSave = function () {
    window.main.deactivatePage();
    deactivateForm();
    renderSuccessMessage();

    document.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', onSuccessMessageEscape);
  };

  var similarErrorMessage = document.querySelector('#error').content.querySelector('.error');

  // отрисовываем сообщение об ошибке
  var renderErrorMessage = function () {
    mainBlock.appendChild(similarErrorMessage);
  };

  // сохраняем ссылку на функцию для обработчика
  var onErrorMessageEscape = function (evt) {
    window.util.onEscEvent(evt, removeErrorMessage);
  };

  // удаляем сообщение об ошибке, удаляем обработчики
  var removeErrorMessage = function () {
    var errorBlock = mainBlock.querySelector('.error');
    errorBlock.remove();

    document.removeEventListener('click', removeErrorMessage);
    document.removeEventListener('keydown', onErrorMessageEscape);
  };

  // колбэк при ошибке отправки, добавляем обработчики на закрытие сообщения
  var onError = function () {
    renderErrorMessage();

    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', onErrorMessageEscape);
  };

  var onSubmitEvent = function (evt) {
    window.backend.save(onSave, onError, new FormData(advertForm));
    evt.preventDefault();
  };

  var onResetEvent = function () {
    window.main.deactivatePage();
  };

  var activateForm = function () {
    setMainFormAvailability(true);
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
    activateForm: activateForm,
    deactivateForm: deactivateForm,
    getMainPinCoordinatesByScale: getMainPinCoordinatesByScale
  };

})();
