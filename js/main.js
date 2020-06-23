'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainPin = mapBlock.querySelector('.map__pin--main');
  var mapPinsList = document.querySelector('.map__pins');
  var advertForm = document.querySelector('.ad-form');

  var activatePage = function () {
    mapBlock.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    mapPinsList.appendChild(window.pin.renderAdvertsFragment(window.pin.adverts));
    window.form.activateForm();
    advertForm.addEventListener('submit', deactivatePage);
  };

  var deactivatePage = function () {
    mapBlock.classList.add('map--faded');
    advertForm.classList.add('ad-form--disabled');

    window.form.deactivateForm();
    advertForm.removeEventListener('submit', deactivatePage);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    window.util.onMousedownEvent(evt, activatePage);
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.util.onEnterEvent(evt, activatePage);
  });

})();
