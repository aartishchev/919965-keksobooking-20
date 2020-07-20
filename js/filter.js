'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingSelect = filtersForm.querySelector('#housing-type');

  var setFilterFormAvailability = function (isAvailable) {
    var filterInputs = filtersForm.children;

    for (var i = 0; i < filterInputs.length; i++) {
      filterInputs[i].disabled = !isAvailable;
    }
    // filterInputs.forEach(function (element) {
    //   element.disabled = !isAvailable;
    // });
  };


  var updateAdverts = function (filteredAdverts) {
    window.card.removeCard();
    window.pin.removeAdverts();
    window.pin.renderAdverts(filteredAdverts);
  };

  var filterHousingType = function () {
    var selectedType = housingSelect.value;
    var filteredAdverts = window.pin.loadedAdverts.filter(function (advert) {

      if (selectedType === 'any') {
        return advert;
      } else {
        return advert.offer.type === selectedType;
      }

    });

    updateAdverts(filteredAdverts);
  };

  var activateFilter = function () {
    setFilterFormAvailability(true);
    housingSelect.addEventListener('change', filterHousingType);
  };

  setFilterFormAvailability(false);

  window.filter = {
    activateFilter: activateFilter,
  };

})();
