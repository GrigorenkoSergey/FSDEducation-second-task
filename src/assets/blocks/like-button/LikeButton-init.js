import LikeButton from './LikeButton';

[...document.querySelectorAll('.js-like-button')]
  .forEach((item) => new LikeButton(item));
