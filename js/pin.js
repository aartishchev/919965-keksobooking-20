'use strict';

(function () {
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
      type: window.util.getRandomArrayElement(APPARTMENT_TYPES),
      rooms: 4,
      guests: 3,
      checkin: window.util.getRandomArrayElement(CHECKIN_OPTIONS),
      checkout: window.util.getRandomArrayElement(CHECKOUT_OPTIONS),
      features: window.util.getRandomSlicedArray(APPARTMENT_FEATURES),
      description: 'Строка с описанием',
      photos: window.util.getRandomSlicedArray(APPARTMENT_PHOTOS)
    };
    return offer;
  };

  var mapPinsList = document.querySelector('.map__pins');

  var getLocation = function () {
    var location = {
      x: window.util.getRandomInteger(0, mapPinsList.clientWidth),
      y: window.util.getRandomInteger(PIN_MIN_Y, PIN_MAX_Y)
    };
    return location;
  };

  var getAuthors = function (quantity) {
    var authors = [];
    for (var i = 0; i < quantity; i++) {
      var currentAuthor = getAuthor(i + 1);
      authors.push(currentAuthor);
    }
    window.util.shuffleArray(authors);
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

  window.pin = {
    renderAdvertsFragment: renderAdvertsFragment,
    adverts: adverts,
    PIN_HEIGHT: PIN_HEIGHT
  };

})();
