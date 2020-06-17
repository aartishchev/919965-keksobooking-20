'use strict';

var APPARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ADVERTS_QUANTITY = 8;
var CHECKIN_OPTIONS = ['12:00', '13:00', '14:00'];
var CHECKOUT_OPTIONS = ['12:00', '13:00', '14:00'];
var APPARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APPARTMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var PIN_WIDTH = 50;
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

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var getRandomSlicedArray = function (array) {
  return array.slice(0, getRandomInteger(0, array.length));
};

var shuffleArray = function (array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  while (currentIndex !== 0) {
    randomIndex = getRandomInteger(0, array.length - 1);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

var getAuthor = function (linkValue) {
  var author = {
    avatar: 'img/avatars/user0' + linkValue + '.png'
  };
  return author;
};

var getOffer = function () {
  var offer = {
    title: 'Заголовок предложения',
    adress: '600, 350',
    price: 5000,
    type: getRandomArrayElement(APPARTMENT_TYPES),
    rooms: 4,
    guests: 3,
    checkin: getRandomArrayElement(CHECKIN_OPTIONS),
    checkout: getRandomArrayElement(CHECKOUT_OPTIONS),
    features: getRandomSlicedArray(APPARTMENT_FEATURES),
    description: 'Строка с описанием',
    photos: getRandomSlicedArray(APPARTMENT_PHOTOS)
  };
  return offer;
};

var mapPinsList = document.querySelector('.map__pins');

var getLocation = function () {
  var location = {
    x: getRandomInteger(0, mapPinsList.clientWidth),
    y: getRandomInteger(PIN_MIN_Y, PIN_MAX_Y)
  };
  return location;
};

var getAuthors = function (quantity) {
  var authors = [];
  for (var i = 0; i < quantity; i++) {
    var currentAuthor = getAuthor(i + 1);
    authors.push(currentAuthor);
  }
  shuffleArray(authors);
  return authors;
};

var getAdverts = function (quantity) {
  var adverts = [];
  var authors = getAuthors(quantity);
  for (var i = 0; i < quantity; i++) {
    var currentAdvert = {
      author: authors[i],
      offer: getOffer(),
      location: getLocation()
    };
    adverts.push(currentAdvert);
  }
  return adverts;
};

var getMapPinCoordinates = function (advert) {
  var PinCoordinateX = advert.location.x - (PIN_WIDTH * 0.5);
  var PinCoordinateY = advert.location.y - PIN_HEIGHT;
  return 'left: ' + PinCoordinateX + 'px; top: ' + PinCoordinateY + 'px';
};

var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderAdvert = function (advert) {
  var mapPin = similarMapPinTemplate.cloneNode(true);
  mapPin.style = getMapPinCoordinates(advert);
  mapPin.querySelector('img').setAttribute('src', advert.author.avatar);
  mapPin.querySelector('img').setAttribute('alt', advert.offer.title);
  return mapPin;
};

var renderAdvertsFragment = function (adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    var currentDomAdvert = renderAdvert(adverts[i]);
    fragment.appendChild(currentDomAdvert);
  }
  return fragment;
};

var adverts = getAdverts(ADVERTS_QUANTITY);

var mapBlock = document.querySelector('.map');
var advertForm = document.querySelector('.ad-form');
var filtersForm = document.querySelector('.map__filters');
var mainPin = mapBlock.querySelector('.map__pin--main');

var adressInput = advertForm.querySelector('#address');
var typeSelect = advertForm.querySelector('#type');
var timeInSelect = advertForm.querySelector('#timein');
var timeOutSelect = advertForm.querySelector('#timeout');
var roomsSelect = advertForm.querySelector('#room_number');
var guestsSelect = advertForm.querySelector('#capacity');

var disableFormInputs = function () {
  var advertFieldsets = advertForm.querySelectorAll('fieldset');
  var filterInputs = filtersForm.children;
  for (var i = 0; i < advertFieldsets.length; i++) {
    advertFieldsets[i].setAttribute('disabled', 'disabled');
  }
  for (var j = 0; j < filterInputs.length; j++) {
    filterInputs[j].setAttribute('disabled', 'disabled');
  }
};

var enableFormInputs = function () {
  var advertFieldsets = advertForm.querySelectorAll('fieldset');
  var filterInputs = filtersForm.children;
  for (var i = 0; i < advertFieldsets.length; i++) {
    advertFieldsets[i].removeAttribute('disabled');
  }
  for (var j = 0; j < filterInputs.length; j++) {
    filterInputs[j].removeAttribute('disabled');
  }
};

var getMainPinCoordinatesByScale = function (scale) {
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = PIN_HEIGHT;
  var coordinateX = parseInt(mainPin.style.left, 10);
  var coordinateY = parseInt(mainPin.style.top, 10);
  var valueX = Math.round(coordinateX + mainPinWidth / 2);
  var valueY = coordinateY + mainPinHeight * scale;
  return valueX + ', ' + valueY;
};

var setMinPrice = function () {
  var priceInput = advertForm.querySelector('#price');
  var currentTypeValue = typeSelect.value;
  var currentMinPrice = MIN_PRICE_MAP[currentTypeValue];
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
  var currentGuestOptions = GUESTS_OPTIONS[currentRoomsOption];
  for (var k = 0; k < guests.length; k++) {
    guests[k].setAttribute('disabled', 'disabled');
  }
  for (var i = 0; i < currentGuestOptions.length; i++) {
    for (var j = 0; j < guests.length; j++) {
      if (currentGuestOptions[i] === guests[j].textContent) {
        guests[j].removeAttribute('disabled');
      }
    }
  }
};

var activatePage = function () {
  mapBlock.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
  adressInput.value = getMainPinCoordinatesByScale(1);
  mapPinsList.appendChild(renderAdvertsFragment(adverts));
  typeSelect.addEventListener('change', setMinPrice);
  advertForm.addEventListener('submit', deactivatePage);
  timeInSelect.addEventListener('change', setOutTime);
  timeOutSelect.addEventListener('change', setInTime);
  roomsSelect.addEventListener('change', addGuestsOptionsHandler);
  enableFormInputs();
};

var deactivatePage = function () {
  mapBlock.classList.add('map--faded');
  advertForm.classList.add('ad-form--disabled');
  adressInput.value = getMainPinCoordinatesByScale(0.5);
  typeSelect.removeEventListener('change', setMinPrice);
  advertForm.removeEventListener('submit', deactivatePage);
  timeInSelect.removeEventListener('change', setOutTime);
  timeOutSelect.removeEventListener('change', setInTime);
  roomsSelect.removeEventListener('change', addGuestsOptionsHandler);
  disableFormInputs();
};

adressInput.value = getMainPinCoordinatesByScale(0.5);
disableFormInputs();
mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
});
mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
});
