'use strict';

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
var MIN_PIN_Y = 130;
var MAX_PIN_Y = 630;

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var getRandomCutArray = function (array) {
  array.length = getRandomInteger(0, array.length);
  return array;
};

var shuffleArray = function (array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

var getAuthor = function (linkValue) {
  var author = {
    avatar: 'img/avatars/user' + 0 + linkValue + '.png'
  };
  return author;
};

var getOffer = function () {
  var offer = {
    title: 'Заголовок предложения',
    adress: Number + ', ' + Number,
    price: Number,
    type: getRandomArrayElement(APPARTMENT_TYPES),
    rooms: Number,
    guests: Number,
    checkin: getRandomArrayElement(CHECKIN_OPTIONS),
    checkout: getRandomArrayElement(CHECKOUT_OPTIONS),
    features: getRandomCutArray(APPARTMENT_FEATURES),
    description: 'Строка с описанием',
    photos: getRandomCutArray(APPARTMENT_PHOTOS)
  };
  return offer;
};

var mapPinsList = document.querySelector('.map__pins');

var getLocation = function () {
  var location = {
    x: getRandomInteger(0, mapPinsList.clientWidth),
    y: getRandomInteger(MIN_PIN_Y, MAX_PIN_Y)
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
  var absoluteCoordinate =
    'left: '
    + (advert.location.x - (50 * 0.5)) // где взять высоту и ширину?
    + 'px; top: '
    + (advert.location.y - (70 * 0.5))
    + 'px';
  return absoluteCoordinate;
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
mapPinsList.appendChild(renderAdvertsFragment(adverts));

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
