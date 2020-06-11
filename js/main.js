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
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

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
  var PinCoordinateX = advert.location.x - (MAP_PIN_WIDTH * 0.5);
  var PinCoordinateY = advert.location.y - MAP_PIN_HEIGHT;
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
mapPinsList.appendChild(renderAdvertsFragment(adverts));

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
