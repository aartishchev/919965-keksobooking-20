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

  var advertPinsList = document.querySelector('.map__pins');

  var removeAdvertHighlight = function () {
    var highlightAdvert = advertPinsList.querySelector('.map__pin--active');

    if (highlightAdvert) {
      highlightAdvert.classList.remove('map__pin--active');
    }
  };

  var advertClickFactory = function (adverts) {
    return function (evt) {
      var advertIndex = evt.target.dataset.index;

      if (evt.target.dataset.index) {
        window.card.removeCard();
        removeAdvertHighlight();

        window.card.renderCard(adverts[advertIndex]);

        var targetButton = evt.target.closest('button');
        targetButton.classList.add('map__pin--active');
      }

    };
  };

  var onAdvertEnter = function (evt) {
    window.util.onEnterEvent(evt, advertClickFactory);
  };

  var renderAdverts = function (adverts) {
    var fragment = getAdvertsFragment(adverts);
    advertPinsList.appendChild(fragment);

    var advertClickHandler = advertClickFactory(adverts);

    advertPinsList.addEventListener('click', advertClickHandler);
    advertPinsList.addEventListener('keydown', onAdvertEnter);
  };

  var mainPin = document.querySelector('.map__pin--main');

  var onLoad = function (adverts) {
    window.pin.loadedAdverts = adverts;
    window.filter.activateFilter();

    var shuffledAdverts = window.util.shuffleArray(adverts);
    renderAdverts(shuffledAdverts);

    mainPin.removeEventListener('mousedown', window.main.onMainPinClick);
    mainPin.removeEventListener('keydown', window.main.onMainPinEnter);
  };

  var positionAdvertPins = function () {
    window.backend.load(onLoad);
  };

  var removeAdverts = function () {
    var advertsToRemove = advertPinsList.querySelectorAll('[type="button"]');
    advertsToRemove.forEach(function (element) {
      element.remove();
    });
  };

  window.pin = {
    positionAdvertPins: positionAdvertPins,
    renderAdverts: renderAdverts,
    removeAdverts: removeAdverts,
    loadedAdverts: []
  };

})();
