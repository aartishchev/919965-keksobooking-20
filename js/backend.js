'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';

  var StatusCode = {
    OK: 200
  };

  var request = function (url, params) {
    var method = params.method;
    var onLoad = params.onLoad;
    var onError = params.onError;
    var data = params.data;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);
    xhr.send(data);

    xhr.addEventListener('load', function () {

      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError();
      }

    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });
  };

  var load = function (onLoad, onError) {
    request(URL_LOAD, {
      method: 'GET',
      onLoad: onLoad,
      onError: onError
    });
  };

  var save = function (onLoad, onError, data) {
    request(URL_SAVE, {
      method: 'POST',
      onLoad: onLoad,
      onError: onError,
      data: data
    });
  };

  window.backend = {
    load: load,
    save: save
  };

})();
