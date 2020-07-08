'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingSelect = filtersForm.querySelector('#housing-type');

  var setFilterFormAvailability = function (isAvailable) {
    var filterInputs = filtersForm.children;
    for (var j = 0; j < filterInputs.length; j++) {
      filterInputs[j].disabled = !isAvailable;
    }
  };

  var mapPinsList = document.querySelector('.map__pins');

  var removeAdverts = function () {
    var advertsToRemove = mapPinsList.querySelectorAll('[type="button"]');
    advertsToRemove.forEach(function (element) {
      element.remove();
    });
  };

  var updateAdverts = function (filteredAdverts) {
    removeAdverts();
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
