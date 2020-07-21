'use strict';

(function () {
  var APPARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ADVERTS_QUANTITY = 8;
  var CHECKIN_OPTIONS = ['12:00', '13:00', '14:00'];
  var CHECKOUT_OPTIONS = ['12:00', '13:00', '14:00'];
  var APPARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var APPARTMENT_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 70;

  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var MIN_PRICE_MAP = {
    'bungalo': MIN_PRICE_BUNGALO,
    'flat': MIN_PRICE_FLAT,
    'house': MIN_PRICE_HOUSE,
    'palace': MIN_PRICE_PALACE
  };

  var GUESTS_OPTIONS = {
    1: ['для 1 гостя'],
    2: ['для 2 гостей', 'для 1 гостя'],
    3: ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
    100: ['не для гостей']
  };

  var housingType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var housingPrice = {
    'minMiddle': 10000,
    'maxMiddle': 50000
  };

  var ADVERTS_TO_RENDER = 5;
  var DEBOUNCE_INTERVAL = 500; // ms

  window.const = {
    APPARTMENT_TYPES: APPARTMENT_TYPES,
    ADVERTS_QUANTITY: ADVERTS_QUANTITY,
    CHECKIN_OPTIONS: CHECKIN_OPTIONS,
    CHECKOUT_OPTIONS: CHECKOUT_OPTIONS,
    APPARTMENT_FEATURES: APPARTMENT_FEATURES,
    APPARTMENT_PHOTOS: APPARTMENT_PHOTOS,
    PIN_MIN_Y: PIN_MIN_Y,
    PIN_MAX_Y: PIN_MAX_Y,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MIN_PRICE_MAP: MIN_PRICE_MAP,
    GUESTS_OPTIONS: GUESTS_OPTIONS,
    ADVERTS_TO_RENDER: ADVERTS_TO_RENDER,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    housingType: housingType,
    housingPrice: housingPrice
  };

})();
