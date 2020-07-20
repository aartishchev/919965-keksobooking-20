'use strict';

(function () {
  // получам тип жилья
  var getType = function (advert) {
    var typeValue = advert.offer.type;

    if (typeValue) {
      return window.consts.housingType[typeValue];
    } else {
      return '';
    }

  };

  // получаем название feature из класса элемента шаблона
  var getFeature = function (feature) {
    var parsedClassName = feature.className.split('--');
    var elementFeature = parsedClassName[parsedClassName.length - 1];
    return elementFeature;
  };

  // проверяем наличие feature у переданного объявления
  var setFeatures = function (advert, cardTemplate) {
    var featureItems = cardTemplate.querySelectorAll('.popup__feature');

    featureItems.forEach(function (featureElement) {
      var currentFeature = getFeature(featureElement);
      var advertFeatures = advert.offer.features;

      for (var i = 0; i < advertFeatures.length; i++) {
        if (currentFeature === advertFeatures[i]) {
          featureElement.textContent = currentFeature;
          break;
        }
      }

    });
  };

  // добавляем фотографии, удаляем первый пустой img
  var setPhotos = function (advert, cardTemplate) {
    var photosContainer = cardTemplate.querySelector('.popup__photos');
    var photoElement = photosContainer.querySelector('.popup__photo');
    var advertPhotos = advert.offer.photos;

    advertPhotos.forEach(function (photo) {
      var photoElementClone = photosContainer.appendChild(photoElement.cloneNode());
      photoElementClone.src = photo;
    });

    photosContainer.removeChild(photoElement);
  };

  // удаляем пустые блоки
  var removeEmptyBlocks = function (cardTemplate) {
    var imgBlocks = cardTemplate.querySelectorAll('img');

    imgBlocks.forEach(function (element) {
      if (element.src === '') {
        element.remove();
      }
    });

    var textBlocks = cardTemplate.querySelectorAll('h3:empty, p:empty, h4:empty, li:empty');

    textBlocks.forEach(function (element) {
      element.remove();
    });

  };

  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // формируем карточку из шаблона
  var getCard = function (advert) {
    var card = similarCardTemplate.cloneNode(true);

    card.querySelector('.popup__avatar').src = advert.author.avatar;
    card.querySelector('.popup__title').textContent = advert.offer.title;
    card.querySelector('.popup__text--address').textContent = advert.offer.address;
    card.querySelector('.popup__text--price').textContent = advert.offer.price;
    card.querySelector('.popup__description').textContent = advert.offer.description;
    card.querySelector('.popup__type').textContent = getType(advert);

    var advertCapacityText = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--capacity').textContent = advertCapacityText;

    var advertTimeText = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__text--time').textContent = advertTimeText;

    setFeatures(advert, card);
    setPhotos(advert, card);
    removeEmptyBlocks(card);

    return card;
  };

  var mapBlock = document.querySelector('.map');
  var filtersContainer = mapBlock.querySelector('.map__filters-container');

  var onCardEscape = function (evt) {
    window.util.onEscEvent(evt, removeCard);
  };

  // отрисовываем карточку
  var renderCard = function (advert) {
    var card = getCard(advert);
    mapBlock.insertBefore(card, filtersContainer);

    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', removeCard);
    window.addEventListener('keydown', onCardEscape);
  };

  // удаляем карточку, если отрисована
  var removeCard = function () {
    var card = mapBlock.querySelector('.map__card');

    if (card) {
      card.remove();

      var closeButton = card.querySelector('.popup__close');
      closeButton.removeEventListener('click', removeCard);
      window.removeEventListener('keydown', onCardEscape);
    }

  };

  window.card = {
    renderCard: renderCard,
    removeCard: removeCard
  };

})();
