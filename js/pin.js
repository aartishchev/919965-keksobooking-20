'use strict';

(function () {
  var getMapPinCoordinates = function (advert) {
    var PinCoordinateX = advert.location.x - (window.consts.PIN_WIDTH * 0.5);
    var PinCoordinateY = advert.location.y - window.consts.PIN_HEIGHT;
    return 'left: ' + PinCoordinateX + 'px; top: ' + PinCoordinateY + 'px';
  };

  var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getMapPin = function (advert) {
    var mapPin = similarMapPinTemplate.cloneNode(true);
    mapPin.style = getMapPinCoordinates(advert);
    mapPin.querySelector('img').src = advert.author.avatar;
    mapPin.querySelector('img').alt = advert.offer.title;
    return mapPin;
  };

  var getAdvertsFragment = function (adverts) {
    var currentArrayLength = window.consts.ADVERTS_TO_RENDER;
    if (currentArrayLength > adverts.length) {
      currentArrayLength = adverts.length;
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < currentArrayLength; i++) {
      var currentDomAdvert = getMapPin(adverts[i]);
      if (adverts[i].offer) {
        fragment.appendChild(currentDomAdvert);
      }
    }
    return fragment;
  };

  var renderAdverts = function (adverts) {
    var fragment = getAdvertsFragment(adverts);
    mapPinsList.appendChild(fragment);
  };

  var mapPinsList = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var onLoad = function (adverts) {
    window.pin.loadedAdverts = adverts; // сохраняем данные с сервера
    renderAdverts(adverts);
    window.filter.activateFilter();

    // var advert = {

    //   offer: {
    //     address: '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
    //     checkin: '14:00',
    //     checkout: '10:00',
    //     description: '',
    //     features: [],
    //     guests: '',
    //     photos: [],
    //     price: '',
    //     rooms: '',
    //     title: 'Уютное гнездышко для молодоженов',
    //     type: 'house',
    //   }
    // };

    window.card.renderCard(adverts[0]);

    mainPin.removeEventListener('mousedown', window.main.onMainPinClick);
    mainPin.removeEventListener('keydown', window.main.onMainPinEnter);
  };

  var positionMapPins = function () {
    window.backend.load(onLoad);
  };

  window.pin = {
    positionMapPins: positionMapPins,
    renderAdverts: renderAdverts
  };

})();
