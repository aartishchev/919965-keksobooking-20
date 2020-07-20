'use strict';

(function () {
  var getAdvertPinCoordinates = function (advert) {
    var PinCoordinateX = advert.location.x - (window.consts.PIN_WIDTH * 0.5);
    var PinCoordinateY = advert.location.y - window.consts.PIN_HEIGHT;

    return 'left: ' + PinCoordinateX + 'px; top: ' + PinCoordinateY + 'px';
  };

  var similarAdvertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getAdvertPin = function (advert) {
    var advertPin = similarAdvertPinTemplate.cloneNode(true);

    advertPin.style = getAdvertPinCoordinates(advert);
    advertPin.querySelector('img').src = advert.author.avatar;
    advertPin.querySelector('img').alt = advert.offer.title;

    return advertPin;
  };

  var getAdvertsFragment = function (adverts) {
    var currentArrayLength = window.consts.ADVERTS_TO_RENDER;

    if (currentArrayLength > adverts.length) {
      currentArrayLength = adverts.length;
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < currentArrayLength; i++) {
      var currentDomAdvert = getAdvertPin(adverts[i]);

      if (adverts[i].offer && adverts[i].author && adverts[i].location) {
        fragment.appendChild(currentDomAdvert);
      }

    }

    return fragment;
  };

  var renderAdverts = function (adverts) {
    var fragment = getAdvertsFragment(adverts);
    advertPinsList.appendChild(fragment);
  };

  var advertPinsList = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var onLoad = function (adverts) {
    window.pin.loadedAdverts = adverts; // сохраняем данные с сервера
    renderAdverts(adverts);
    window.filter.activateFilter();
    window.card.renderCard(adverts[0]);

    mainPin.removeEventListener('mousedown', window.main.onMainPinClick);
    mainPin.removeEventListener('keydown', window.main.onMainPinEnter);
  };

  var positionAdvertPins = function () {
    window.backend.load(onLoad);
  };

  window.pin = {
    positionAdvertPins: positionAdvertPins,
    renderAdverts: renderAdverts
  };

})();
