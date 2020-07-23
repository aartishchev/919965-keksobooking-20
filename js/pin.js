'use strict';

(function () {
  var pinWidth = window.const.PIN.WIDTH;
  var pinHeight = window.const.PIN.HEIGHT;
  var advertsQuantity = window.const.ADVERTS_QUANTITY;
  var removeCard = window.card.removeCard;
  var renderCard = window.card.renderCard;
  var shuffleArray = window.util.shuffleArray;
  var load = window.backend.load;

  var getAdvertPinCoordinates = function (advert) {

    var PinCoordinateX = advert.location.x - (pinWidth * 0.5);
    var PinCoordinateY = advert.location.y - pinHeight;

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
    var advertsCount = Math.min(adverts.length, advertsQuantity);

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

  var advertClickFactory = function () {
    return function (evt) {
      var advertIndex = evt.target.dataset.index;

      if (advertIndex) {
        removeCard();
        removeAdvertHighlight();
        renderCard(advertsToRender[advertIndex]);

        var targetButton = evt.target.closest('button');
        targetButton.classList.add('map__pin--active');
      }

    };
  };

  var onAdvertClick = advertClickFactory();
  var mainPin = document.querySelector('.map__pin--main');

  var loadedAdverts = null;

  var onLoad = function (adverts) {
    loadedAdverts = adverts;

    window.filter.activateFilter();

    var shuffledAdverts = shuffleArray(adverts);
    renderAdverts(shuffledAdverts);
    advertPinsList.addEventListener('click', onAdvertClick);

    mainPin.removeEventListener('mousedown', window.main.onMainPinClick);
    mainPin.removeEventListener('keydown', window.main.onMainPinEnter);
  };

  var getLoadedAdverts = function () {
    return loadedAdverts;
  };

  var positionAdvertPins = function () {
    load(onLoad);
  };

  window.pin = {
    positionAdvertPins: positionAdvertPins,
    renderAdverts: renderAdverts,
    removeAdverts: removeAdverts,
    onAdvertClick: onAdvertClick,
    getLoadedAdverts: getLoadedAdverts
  };

})();
