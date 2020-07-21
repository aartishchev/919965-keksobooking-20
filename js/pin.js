'use strict';

(function () {
  var getAdvertPinCoordinates = function (advert) {
    var PinCoordinateX = advert.location.x - (window.const.PIN_WIDTH * 0.5);
    var PinCoordinateY = advert.location.y - window.const.PIN_HEIGHT;

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
    var advertsCount = Math.min(adverts.length, window.const.ADVERTS_TO_RENDER);

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

  var advertsToRender = null;

  var advertClickFactory = function () {
    return function (evt) {
      var advertIndex = evt.target.dataset.index;

      if (advertIndex) {
        window.card.removeCard();
        removeAdvertHighlight();

        window.card.renderCard(advertsToRender[advertIndex]);

        var targetButton = evt.target.closest('button');
        targetButton.classList.add('map__pin--active');
      }

    };
  };

  var renderAdverts = function (adverts) {
    advertsToRender = adverts;
    var fragment = getAdvertsFragment(advertsToRender);
    advertPinsList.appendChild(fragment);
  };

  var removeAdverts = function () {
    var advertsToRemove = advertPinsList.querySelectorAll('[type="button"]');

    advertsToRemove.forEach(function (element) {
      element.remove();
    });

  };

  var mainPin = document.querySelector('.map__pin--main');

  var onAdvertClick = advertClickFactory();

  var onLoad = function (adverts) {
    window.pin.loadedAdverts = adverts;
    window.filter.activateFilter();

    var shuffledAdverts = window.util.shuffleArray(adverts);
    renderAdverts(shuffledAdverts);
    advertPinsList.addEventListener('click', onAdvertClick);

    mainPin.removeEventListener('mousedown', window.main.onMainPinClick);
    mainPin.removeEventListener('keydown', window.main.onMainPinEnter);
  };

  var positionAdvertPins = function () {
    window.backend.load(onLoad);
  };

  window.pin = {
    positionAdvertPins: positionAdvertPins,
    renderAdverts: renderAdverts,
    removeAdverts: removeAdverts,
    onAdvertClick: onAdvertClick,
    loadedAdverts: []
  };

})();
