'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var advertForm = document.querySelector('.ad-form');
  var avatarChooser = advertForm.querySelector('#avatar');
  var avatarPreview = advertForm.querySelector('.ad-form-header__preview img');
  var photoChooser = advertForm.querySelector('#images');
  var photoBlock = advertForm.querySelector('.ad-form__photo');

  var setReader = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var setAvatarFactory = function () {
    return setReader(avatarChooser, avatarPreview);
  };

  var photoPreview = document.createElement('img');
  photoPreview.width = 70;
  photoPreview.height = 70;

  photoBlock.appendChild(photoPreview);

  var setPhotoFactory = function () {
    return setReader(photoChooser, photoPreview);
  };

  var addPreview = function () {
    avatarChooser.addEventListener('change', setAvatarFactory);
    photoChooser.addEventListener('change', setPhotoFactory);
  };

  var removePreview = function () {
    avatarChooser.removeEventListener('change', setAvatarFactory);
    photoChooser.removeEventListener('change', setPhotoFactory);
  };

  window.preview = {
    addPreview: addPreview,
    removePreview: removePreview
  };

})();
