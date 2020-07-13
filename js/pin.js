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
    advertPin.setAttribute('data-index', fragmentIndex);

    var advertPinImg = advertPin.querySelector('img');
    advertPinImg.src = advert.author.avatar;
    advertPinImg.alt = advert.offer.title;
    advertPinImg.setAttribute('data-index', fragmentIndex);

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
      var advertIndex = evt.target.getAttribute('data-index');
      if (evt.target.getAttribute('data-index')) {
        window.card.renderCard(adverts[advertIndex]);
      }
    };
  };

  var advertPinsList = document.querySelector('.map__pins');

  var renderAdverts = function (adverts) {
    // window.card.tryRemoveCard();
    var fragment = getAdvertsFragment(adverts);
    advertPinsList.appendChild(fragment);
    advertPinsList.addEventListener('mousedown', onAdvertClick(adverts));
    // mapPinsList.addEventListener('keydown', window.util.onEnterEvent(evt, onAdvertInteraction(adverts)));
  };

  // var mainPin = document.querySelector('.map__pin--main');

  var onLoad = function (adverts) {
    window.pin.loadedAdverts = adverts; // сохраняем данные с сервера
    var shuffledAdverts = window.util.shuffleArray(adverts);
    renderAdverts(shuffledAdverts);
    window.filter.activateFilter();
    // advertPin.removeEventListener('mousedown', window.main.onMainPinClick);
    // advertPin.removeEventListener('keydown', window.main.onMainPinEnter);
  };

  var positionAdvertPins = function () {
    window.backend.load(onLoad);
  };

  window.pin = {
    positionAdvertPins: positionAdvertPins,
    renderAdverts: renderAdverts
  };

})();
