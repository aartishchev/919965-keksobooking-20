'use strict';

(function () {
  var ADVERTS_QUANTITY = 5;
  var DEBOUNCE_INTERVAL = 500;

  var PIN = {
    MIN_Y: 130,
    MAX_Y: 630,
    WIDTH: 65,
    HEIGHT: 70
  };

  var MIN_PRICE_MAP = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var GUESTS_OPTIONS = {
    1: ['для 1 гостя'],
    2: ['для 2 гостей', 'для 1 гостя'],
    3: ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
    100: ['не для гостей']
  };

  var HOUSING_TYPE = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var HOUSING_PRICE = {
    'minMiddle': 10000,
    'maxMiddle': 50000
  };

  window.const = {
    ADVERTS_QUANTITY: ADVERTS_QUANTITY,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    PIN: PIN,
    MIN_PRICE_MAP: MIN_PRICE_MAP,
    GUESTS_OPTIONS: GUESTS_OPTIONS,
    HOUSING_TYPE: HOUSING_TYPE,
    HOUSING_PRICE: HOUSING_PRICE
  };

})();
