'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingSelect = filtersForm.querySelector('#housing-type');
  var priceSelect = filtersForm.querySelector('#housing-price');
  var roomsSelect = filtersForm.querySelector('#housing-rooms');
  // var guestsSelect = filtersForm.querySelector('#housing-guests');

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
    features: []
  };

  var onHousingChange = function () {
    var selectedType = housingSelect.value;
    selectedOptions.housing = selectedType;
    filterAdverts();
  };

  var onPriceChange = function () {
    var selectedType = priceSelect.value;
    selectedOptions.price = selectedType;
    filterAdverts();
  };


  filtersForm.addEventListener('change', function (evt) {
    if (evt.target === housingSelect) {
      onHousingChange();
    } else if (evt.target === priceSelect) {
      onPriceChange();
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

      if (selectedOptions.housing === 'any') {
        return advert;
      } else {
        return advert.offer.type === selectedOptions.housing;
      }

    })
    .filter(function (advert) {

      if (selectedOptions.price === 'any') {
        return advert;
      } else {
        return advert.offer.price === selectedOptions.price;
      }

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
