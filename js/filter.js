'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingSelect = filtersForm.querySelector('#housing-type');
  var priceSelect = filtersForm.querySelector('#housing-price');
  var roomsSelect = filtersForm.querySelector('#housing-rooms');
  var guestsSelect = filtersForm.querySelector('#housing-guests');
  // var featuresSelects = Array.from(filtersForm.querySelectorAll('[type="checkbox"]'));

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
        return advert.offer.price >= window.const.housingPrice.minMiddle && advert.offer.price <= window.const.housingPrice.maxMiddle;
      case 'low':
        return advert.offer.price < window.const.housingPrice.minMiddle;
      case 'high':
        return advert.offer.price > window.const.housingPrice.maxMiddle;
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
    },
  };

  filtersForm.addEventListener('change', function (evt) {
    var handler = selectMap[evt.target.id];
    if (handler) {
      onChange(handler.select, handler.type);
    }
  });

  var updateAdverts = function (filteredAdverts) {
    window.card.removeCard();
    window.pin.removeAdverts();
    window.pin.renderAdverts(filteredAdverts);
  };

  var filterAdverts = function () {
    var loadedAdverts = window.pin.loadedAdverts;

    var filteredAdverts = loadedAdverts
    .filter(function (advert) {
      return getAdvertOnType(advert);
    })
    .filter(function (advert) {
      return getAdvertOnPrice(advert);
    })
    .filter(function (advert) {
      return getAdvertOnRooms(advert);
    })
    .filter(function (advert) {
      return getAdvertOnGuests(advert);
    });

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
