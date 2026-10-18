(function () {
  'use strict';
  var wall = document.querySelector('.makers-album .gallery-wall');
  if (!wall) return;
  var pieces = Array.from(wall.children);
  var course;

  // Natural aspect ratios make every photo in a course the same height,
  // with no cropping, resize calculations, or empty masonry slots.
  pieces.forEach(function (piece, index) {
    if (index % 4 === 0) {
      course = document.createElement('div');
      course.className = 'gallery-course';
      wall.appendChild(course);
    }
    var image = piece.querySelector('img');
    var ratio = Number(image.getAttribute('width')) / Number(image.getAttribute('height'));
    piece.style.setProperty('--photo-ratio', ratio);
    course.appendChild(piece);
  });
  wall.classList.add('is-brickwork');
})();
