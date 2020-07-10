'use strict';

(function () {
  // получам тип жилья
  var getName = function (advert) {
    var typeValue = advert.offer.type;
    switch (typeValue) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом ';
      case 'palace':
        return 'Дворец ';
      default:
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
  var getFeatures = function (advert, cardTemplate) {
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
  var getPhotos = function (advert, cardTemplate) {
    var photosContainer = cardTemplate.querySelector('.popup__photos');
    var photoElement = photosContainer.querySelector('.popup__photo');
    var advertPhotos = advert.offer.photos;
    advertPhotos.forEach(function (photo) {
      var photoElementClone = photosContainer.appendChild(photoElement.cloneNode());
      photoElementClone.setAttribute('src', photo);
    });
    photosContainer.removeChild(photoElement);
  };

  // удаляем пустые блоки
  var removeEmptyBlocks = function (cardTemplate) {
    var imgBlocks = cardTemplate.querySelectorAll('img');
    imgBlocks.forEach(function (element) {
      if (element.getAttribute('src') === '') {
        element.remove();
      }
    });
    var textBlocks = cardTemplate.querySelectorAll('h3, p, h4, li');
    textBlocks.forEach(function (element) {
      if (element.textContent === '') {
        element.remove();
      }
    });
  };

  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // формируем карточку из шаблона
  var getCard = function (advert) {
    var card = similarCardTemplate.cloneNode(true);
    card.querySelector('.popup__avatar').setAttribute('src', advert.author.avatar);
    card.querySelector('.popup__title').textContent = advert.offer.title;
    card.querySelector('.popup__text--address').textContent = advert.offer.address;
    card.querySelector('.popup__text--price').textContent = advert.offer.price;
    card.querySelector('.popup__type').textContent = getName(advert);
    card.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    card.querySelector('.popup__description').textContent = advert.offer.description;
    getFeatures(advert, card);
    getPhotos(advert, card);
    removeEmptyBlocks(card);
    return card;
  };

  var mapBlock = document.querySelector('.map');
  var filtersContainer = mapBlock.querySelector('.map__filters-container');

  var renderCard = function () {
    var advert = window.pin.loadedAdverts[0];
    var card = getCard(advert);
    mapBlock.insertBefore(card, filtersContainer);
  };

  window.card = {
    renderCard: renderCard
  };

})();
