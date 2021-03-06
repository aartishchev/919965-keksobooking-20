'use strict';

(function () {
  var minMiddleHousingPrice = window.const.HOUSING_PRICE.minMiddle;
  var maxMiddleHousingPrice = window.const.HOUSING_PRICE.maxMiddle;
  var getLoadedAdverts = window.pin.getLoadedAdverts;
  var removeCard = window.card.remove;
  var removeAdverts = window.pin.removeAdverts;
  var renderAdverts = window.pin.renderAdverts;
  var debounce = window.util.debounce;

  var filtersForm = document.querySelector('.map__filters');
  var filterInputs = filtersForm.querySelectorAll('input, select');
  var housingSelect = filtersForm.querySelector('#housing-type');
  var priceSelect = filtersForm.querySelector('#housing-price');
  var roomsSelect = filtersForm.querySelector('#housing-rooms');
  var guestsSelect = filtersForm.querySelector('#housing-guests');

  var setFilterFormAvailability = function (isAvailable) {

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

  var getAdvertOnFeatures = function (advert) {
    var advertFeatures = advert.offer.features;
    var filterFeatures = selectedOptions.features;

    for (var i = 0; i < filterFeatures.length; i++) {

      if (!advertFeatures.includes(filterFeatures[i])) {
        return false;
      }

    }

    return true;
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
    }
  };

  var filterFormHandler = function (evt) {
    var selectId = selectMap[evt.target.id];

    if (selectId) {
      onChange(selectId.select, selectId.type);
    }

    if (evt.target.type === 'checkbox') {
      onClick(evt);
    }

  };

  var debouncedFormHandler = debounce(filterFormHandler);

  var updateAdverts = function (filteredAdverts) {
    removeCard();
    removeAdverts();
    renderAdverts(filteredAdverts);
  };

  var filterAdverts = function () {
    var loadedAdverts = getLoadedAdverts();

    var filteredAdverts = loadedAdverts
    .filter(getAdvertOnType)
    .filter(getAdvertOnPrice)
    .filter(getAdvertOnRooms)
    .filter(getAdvertOnGuests)
    .filter(getAdvertOnFeatures);

    updateAdverts(filteredAdverts);
  };

  var activateFilter = function () {
    setFilterFormAvailability(true);
    filtersForm.addEventListener('change', debouncedFormHandler);
  };

  var deactivateFilter = function () {
    setFilterFormAvailability(false);
    filtersForm.removeEventListener('change', filterFormHandler);

    filtersForm.reset();
  };

  setFilterFormAvailability(false);

  window.filter = {
    activate: activateFilter,
    deactivate: deactivateFilter
  };

})();
