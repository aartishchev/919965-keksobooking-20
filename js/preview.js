'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var advertForm = document.querySelector('.ad-form');

  var avatarChooser = advertForm.querySelector('#avatar');
  var avatarBlock = advertForm.querySelector('.ad-form-header__preview');

  var photoChooser = advertForm.querySelector('#images');
  var photoBlock = advertForm.querySelector('.ad-form__photo');

  var checkImg = function (previewBlock) {

    if (previewBlock.querySelector('img')) {
      return;
    }

    var preview = document.createElement('img');
    preview.width = 70;
    preview.height = 70;
    preview.alt = 'Превью фотография';

    previewBlock.appendChild(preview);
  };

  var setReader = function (fileChooser, previewBlock) {

    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      checkImg(previewBlock);

      var reader = new FileReader();
      var preview = previewBlock.querySelector('img');

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var setAvatarFactory = function () {
    return setReader(avatarChooser, avatarBlock);
  };

  var setPhotoFactory = function () {
    return setReader(photoChooser, photoBlock);
  };

  var addPreview = function () {
    avatarChooser.addEventListener('change', setAvatarFactory);
    photoChooser.addEventListener('change', setPhotoFactory);
  };

  var defaultAvatarPic = avatarBlock.querySelector('img').src;

  var removePreview = function () {
    avatarChooser.removeEventListener('change', setAvatarFactory);
    photoChooser.removeEventListener('change', setPhotoFactory);

    avatarBlock.querySelector('img').src = defaultAvatarPic;
    photoBlock.querySelector('img').remove();
  };

  window.preview = {
    addPreview: addPreview,
    removePreview: removePreview
  };

})();
