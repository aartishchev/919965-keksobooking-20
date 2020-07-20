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
    rooms: roomsSelect.value
  };
  console.log(selectedOptions);


  var onHousingChange = function () {
    var selectedType = housingSelect.value;
    selectedOptions.housing = selectedType;
  };


  // var updateAdverts = function (filteredAdverts) {
  //   window.card.removeCard();
  //   window.pin.removeAdverts();
  //   window.pin.renderAdverts(filteredAdverts);
  // };

  // var filterHousingType = function () {
  //   var selectedType = housingSelect.value;
  //   var filteredAdverts = window.pin.loadedAdverts.filter(function (advert) {

  //     if (selectedType === 'any') {
  //       return advert;
  //     } else {
  //       return advert.offer.type === selectedType;
  //     }

  //   });

  //   updateAdverts(filteredAdverts);
  // };

  // var filterPriceType = function () {
  //   var selectedType = priceSelect.value;
  //   var filteredAdverts = window.pin.loadedAdverts.filter(function (advert) {

  //    if (selectedType < )

  //   });

  //   updateAdverts(filteredAdverts);
  // };

  var activateFilter = function () {
    setFilterFormAvailability(true);
    // housingSelect.addEventListener('change', filterHousingType);
  };

  setFilterFormAvailability(false);

  window.filter = {
    activateFilter: activateFilter,
  };

})();
