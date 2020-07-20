'use strict';

(function () {
  var getAdvertPinCoordinates = function (advert) {
    var PinCoordinateX = advert.location.x - (window.consts.PIN_WIDTH * 0.5);
    var PinCoordinateY = advert.location.y - window.consts.PIN_HEIGHT;

    return 'left: ' + PinCoordinateX + 'px; top: ' + PinCoordinateY + 'px';
  };

  var similarAdvertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getAdvertPin = function (advert, fragmentIndex) {
    var advertPin = similarAdvertPinTemplate.cloneNode(true);

    advertPin.style = getAdvertPinCoordinates(advert);
    advertPin.dataset.index = fragmentIndex;

    var advertPinImg = advertPin.querySelector('img');
    advertPinImg.src = advert.author.avatar;
    advertPinImg.alt = advert.offer.title;
    advertPinImg.dataset.index = fragmentIndex;

    return advertPin;
  };

  var getAdvertsFragment = function (adverts) {
    var fragment = document.createDocumentFragment();
    var advertsCount = Math.min(adverts.length, window.consts.ADVERTS_TO_RENDER);

    for (var i = 0; i < advertsCount; i++) {
      var currentDomAdvert = getAdvertPin(adverts[i], i);

      if (adverts[i].offer && adverts[i].author && adverts[i].location) {
        fragment.appendChild(currentDomAdvert);
      }

    }

    return fragment;
  };

  var onAdvertClick = function (adverts) {
    return function (evt) {
      var advertIndex = evt.target.dataset.index;

      if (evt.target.dataset.index) {
        window.card.removeCard();
        window.card.renderCard(adverts[advertIndex]);
      }

    };
  };

  // var onAdvertEnter = function (evt) {
  //   window.util.onEnterEvent(evt, onAdvertClick(adverts));
  // };

  var advertPinsList = document.querySelector('.map__pins');

  var renderAdverts = function (adverts) {
    var fragment = getAdvertsFragment(adverts);
    advertPinsList.appendChild(fragment);

    var advertClickHandler = onAdvertClick(adverts);
    advertPinsList.addEventListener('mousedown', advertClickHandler);
    // advertPinsList.addEventListener('keydown', onAdvertEnter);
  };

  var mainPin = document.querySelector('.map__pin--main');

  var onLoad = function (adverts) {
    window.pin.loadedAdverts = adverts; // сохраняем данные с сервера
    window.filter.activateFilter();

    var shuffledAdverts = window.util.shuffleArray(adverts);
    renderAdverts(shuffledAdverts);

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
