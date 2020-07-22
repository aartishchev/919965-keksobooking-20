'use strict';

(function () {
  var minMiddleHousingPrice = window.const.HOUSING_PRICE.minMiddle;
  var maxMiddleHousingPrice = window.const.HOUSING_PRICE.maxMiddle;

  var removeCard = function () {
    window.card.removeCard();
  };
  var removeAdverts = function () {
    window.pin.removeAdverts();
  };
  var renderAdverts = function (adverts) {
    window.pin.renderAdverts(adverts);
  };

  var filtersForm = document.querySelector('.map__filters');
  var housingSelect = filtersForm.querySelector('#housing-type');
  var priceSelect = filtersForm.querySelector('#housing-price');
  var roomsSelect = filtersForm.querySelector('#housing-rooms');
  var guestsSelect = filtersForm.querySelector('#housing-guests');

  var setFilterFormAvailability = function (isAvailable) {
    var filterInputs = filtersForm.querySelectorAll('option');

    filterInputs.forEach(function (element) {
      element.disabled = !isAvailable;
    });

  };

  var selectedOptions = {
    housing: housingSelect.value,
    price: priceSelect.value,
    rooms: roomsSelect.value,
    guests: guestsSelect.value,
    features: []
  };

  var onChange = function (select, offer) {
    var selectedType = select.value;
    selectedOptions[offer] = selectedType;
    filterAdverts();
  };

  var onClick = function (evt) {
    var checkedFeature = evt.target.value;

    if (selectedOptions.features.includes(checkedFeature)) {
      var featureIndex = selectedOptions.features.indexOf(checkedFeature);
      selectedOptions.features.splice(featureIndex, 1);
    } else {
      selectedOptions.features.push(checkedFeature);
    }

  };

  var getAdvertOnType = function (advert) {
    if (selectedOptions.housing === 'any') {
      return advert;
    } else {
      return advert.offer.type === selectedOptions.housing;
    }
  };

  var getAdvertOnPrice = function (advert) {
    switch (selectedOptions.price) {
      case 'any':
        return advert;
      case 'middle':
        return advert.offer.price >= minMiddleHousingPrice && advert.offer.price <= maxMiddleHousingPrice;
      case 'low':
        return advert.offer.price < minMiddleHousingPrice;
      case 'high':
        return advert.offer.price > maxMiddleHousingPrice;
      default:
        return advert;
    }
  };

  var getAdvertOnRooms = function (advert) {
    if (selectedOptions.rooms === 'any') {
      return advert;
    } else {
      return advert.offer.rooms.toString() === selectedOptions.rooms;
    }
  };

  var getAdvertOnGuests = function (advert) {
    if (selectedOptions.guests === 'any') {
      return advert;
    } else {
      return advert.offer.guests.toString() === selectedOptions.guests;
    }
  };

  // var getAdvertOnFeatures = function (advert) {

  // }

  var selectMap = {
    'housing-type': {
      select: housingSelect,
      type: 'housing'
    },
    'housing-price': {
      select: priceSelect,
      type: 'price'
    },
    'housing-rooms': {
      select: roomsSelect,
      type: 'rooms'
    },
    'housing-guests': {
      select: guestsSelect,
      type: 'guests'
    }
  };

  filtersForm.addEventListener('change', function (evt) {
    var selectId = selectMap[evt.target.id];

    if (selectId) {
      onChange(selectId.select, selectId.type);
    }

    if (evt.target.type === 'checkbox') {
      onClick(evt);
    }

  });

  var updateAdverts = function (filteredAdverts) {
    removeCard();
    removeAdverts();
    renderAdverts(filteredAdverts);
  };

  var filterAdverts = function () {

    var loadedAdverts = window.pin.loadedAdverts;

    var filteredAdverts = loadedAdverts
    .filter(getAdvertOnType)
    .filter(getAdvertOnPrice)
    .filter(getAdvertOnRooms)
    .filter(getAdvertOnGuests);

    updateAdverts(filteredAdverts);
  };

  var activateFilter = function () {
    setFilterFormAvailability(true);
    // housingSelect.addEventListener('change', filterHousingType);
  };

  setFilterFormAvailability(false);

  window.filter = {
    activateFilter: activateFilter,
  };

})();
