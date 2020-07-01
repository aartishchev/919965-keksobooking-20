'use strict';

(function () {
  // var getAuthor = function (linkValue) {
  //   var author = {
  //     avatar: 'img/avatars/user0' + linkValue + '.png'
  //   };
  //   return author;
  // };

  // var getOffer = function (loadedOffer) {
  //   var offer = {
  //     title: loadedOffer.title,
  //     adress: '600, 350',
  //     price: 5000,
  //     type: window.util.getRandomArrayElement(window.consts.APPARTMENT_TYPES),
  //     rooms: 4,
  //     guests: 3,
  //     checkin: window.util.getRandomArrayElement(window.consts.CHECKIN_OPTIONS),
  //     checkout: window.util.getRandomArrayElement(window.consts.CHECKOUT_OPTIONS),
  //     features: window.util.getRandomSlicedArray(window.consts.APPARTMENT_FEATURES),
  //     description: 'Строка с описанием',
  //     photos: window.util.getRandomSlicedArray(window.consts.APPARTMENT_PHOTOS)
  //   };
  //   return offer;
  // };

  // var mapPinsList = document.querySelector('.map__pins');

  // var getLocation = function () {
  //   var location = {
  //     x: window.util.getRandomInteger(0, mapPinsList.clientWidth),
  //     y: window.util.getRandomInteger(window.consts.PIN_MIN_Y, window.consts.PIN_MAX_Y)
  //   };
  //   return location;
  // };

  // var getAuthors = function (quantity) {
  //   var authors = [];
  //   for (var i = 0; i < quantity; i++) {
  //     var currentAuthor = getAuthor(i + 1);
  //     authors.push(currentAuthor);
  //   }
  //   window.util.shuffleArray(authors);
  //   return authors;
  // };

  // var getAdverts = function (quantity) {
  //   var adverts = [];
  //   var authors = getAuthors(quantity);
  //   for (var i = 0; i < quantity; i++) {
  //     var currentAdvert = {
  //       author: authors[i],
  //       offer: getOffer(),
  //       location: getLocation()
  //     };
  //     adverts.push(currentAdvert);
  //   }
  //   return adverts;
  // };

  // var adverts = getAdverts(window.consts.ADVERTS_QUANTITY);

  // window.pin = {
  //   renderAdvertsFragment: renderAdvertsFragment,
  //   adverts: adverts,
  // };

  var getMapPinCoordinates = function (advert) {
    var PinCoordinateX = advert.location.x - (window.consts.PIN_WIDTH * 0.5);
    var PinCoordinateY = advert.location.y - window.consts.PIN_HEIGHT;
    return 'left: ' + PinCoordinateX + 'px; top: ' + PinCoordinateY + 'px';
  };

  var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderMapPin = function (advert) {
    var mapPin = similarMapPinTemplate.cloneNode(true);
    mapPin.style = getMapPinCoordinates(advert);
    mapPin.querySelector('img').setAttribute('src', advert.author.avatar);
    mapPin.querySelector('img').setAttribute('alt', advert.offer.title);
    return mapPin;
  };

  var renderAdvertsFragment = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      var currentDomAdvert = renderMapPin(adverts[i]);
      if (adverts[i].offer) {
        fragment.appendChild(currentDomAdvert);
      }
    }
    return fragment;
  };

  var mapPinsList = document.querySelector('.map__pins');

  var onLoad = function (adverts) {
    var advertsFragment = renderAdvertsFragment(adverts);
    mapPinsList.appendChild(advertsFragment);
  };

  var positionMapPins = function () {
    window.backend.load(onLoad);
  };

  window.pin = {
    positionMapPins: positionMapPins
  };

})();
